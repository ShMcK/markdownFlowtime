#Flowtime.js Markdown Editor

Write [Flowtime.js](http://flowtime-js.marcolago.com/#/section-2/page-2) presentations in markdown.

### How
 
In your slides add `---` for a slide break, or `***` for a section break.
Don't start or end with any breaks.

### Setup

1.`git clone git@github.com:marcolago/flowtime.js.git` 
2. Write markdown in a file called `slides.md`
3. run `node mdFlowtime.js` to compile templates into `slides.html`
4. Copy the contents of `slides.html` into `index.html` located `<div class="flowtime"> HERE </div>`

### Todo

* Load HTML into index.html automatically.
* Load slide templates from markdown more easily (@@@className, perhaps)