var fs = require('fs'),
  marked = require('marked');

var content = [];

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
      slidify(content);
    }
  });
}

function func(data) {
  content.push(data);
}

var input = fs.createReadStream('slides.md');
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
    output = [],
    current = [];

  output.push(_init());
  content.map(function(line) {
    _scan(line);
  });
  output.push(_end());
  console.log(output.join(''));


  // FUNCTIONS
  function _init() {
    output.push('<div class="ft-section" data-id="section-' + count.section + '">' +
      '<div id="/section-' + count.section + '/page-' + count.page + '" class="ft-page" data-id="page-' + count.total + '">');
  }

  function _end() {
    output.push('</div></div>');
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
    marked(markdownString, function(err, content) {
      if (err) throw err;
      output.push(content);
    });
  }

  function _scan(line) {
    if (line === found.slide) {
      _marked(current);
      current = [];
       _addPage();
    } else if (line === found.section) {
       _marked(current);
      current = [];
      _addSection()
    } else {
      current.push(line);
    }
  }
}