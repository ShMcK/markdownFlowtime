#Flowtime.js Markdown Editor

Write [Flowtime.js](https://marcolago.github.io/flowtime.js/) presentations in markdown.
Special thanks to @marcolago for doing all the hard work creating the fantastic HTML presentation framework.

### How
 
In `slides.md`: 

* add `---` for a slide break
* add `***` for a section break.
* Don't start or end with any breaks.

### Setup

1. `git clone git@github.com:marcolago/flowtime.js.git`, copy in `mdFlowtime.js` to the main directory
2. Delete the content between `<div class="flowtime">` and its closing div.
       Add two tags: `<!--@flowtime-start--><!--@flowtime-end-->`
3. Write markdown in a file called `slides.md`
4. Install the dependencies `npm i -D fs marked`
4. Run `node mdFlowtime.js` to compile templates into `slides.html` & `index.html`
