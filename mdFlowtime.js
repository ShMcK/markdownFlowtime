var fs = require('fs'),
  marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true, // Github Flavored Markdown
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

var content = [], output = [];


// Default filename = slides.md
// Pass a custom filename in `node mdFlowtime.js filename.md`
// Pass a custom output filename: `node mdFlowtime.js filename.md filename.html`
var inputFile = process.argv[2] || 'slides.md';
var outputFile = process.argv[3] || 'slides.html';
if (inputFile.slice(-3) !== '.md') {
  throw 'File must be .md (markdown).';
}
// Read
var input = fs.createReadStream(inputFile);
// Load content, run slidify(content)
readLines(input, func);



function slidify(content) {
  var count = {
      section: 1,
      page: 1,
      total: 1
    },
    found = {
      section: '***',
      slide: '---'
    },
    current = [],
    currentEnd = [];


  output.push(_init());
  content.map(function (line) {
    _scan(line);
  });
  _marked(current);
  output.push(_end());

  /**
   * Write
   */
  fs.writeFile(outputFile, output.join(''), function (err) {
    if (err) console.log(err);
    console.log('Saved to slides.html');
  });

  // write to index.html

  fs.readFile('index.html', 'utf8', function(err, data) {
    if (err) return console.log(err);
    var start = data.match(/<!--@flowtime-start-->/).index;
    var end = data.match(/<!--@flowtime-end-->/).index;
    var result = data.substring(0, start) + output.join('') + data.substring(end + 20);
    console.log(result);
    fs.writeFile('index.html', result, 'utf8', function (err) {
      if (err) return console.log(err);
      console.log('Wrote slides into index.html');
    });
  });

  /**
   * Functions
   */
  function _init() {
    output.push('<!--@flowtime-start--><div class="ft-section" data-id="section-' + count.section + '">' +
      '<div id="/section-' + count.section + '/page-' + count.page + '" class="ft-page" data-id="page-' + count.total + '">');
  }
  function _end() {
    output.push('</div></div><!--@flowtime-end-->');
  }

  function _addPage() {
    count.page++;
    count.total++;
    output.push('</div><div id="/section-' + count.section + '/page-' + count.page + '" class="ft-page" data-id="page-' + count.total + '">');
  }

  function _addSection() {
    count.section++;
    count.page = 1;
    count.total++;
    output.push('</div></div><div class="ft-section" data-id="section-' + count.section + '">' +
      '<div id="/section-' + count.section + '/page-' + count.page + '" class="ft-page" data-id="page-' + count.total + '">');
  }

  function _marked(array) {
    var markdownString = array.join('\n').toString();
    marked(markdownString, function (err, content) {
      if (err) throw err;
      output.push(content);
      output.push(currentEnd);
    });
  }

  //function _addStyles(style) {
  //  console.log('-----------------------');
  //  current.unshift(styles[style].start);
  //  currentEnd.push(styles[style].end);
  //}

  function _reset() {
    current = [];
    //currentEnd = [];
  }

  function _scan(line) {
    if (line === found.slide) {
      _marked(current);
      _reset();
      _addPage();
    } else if (line === found.section) {
      _marked(current);
      _reset();
      _addSection();
    } else {
      current.push(line);
    }
  }
}

function func(data) {
  content.push(data);
}

function done() {
  slidify(content);
}

function readLines(input, func) {
  var remaining = '';

  input.on('data', function (data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function () {
    if (remaining.length) {
      func(remaining);
      done();
    }
  });
}