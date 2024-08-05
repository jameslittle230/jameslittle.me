const sass = require("sass");
const { join } = require("path");
const cssesc = require("cssesc");

module.exports = class {
  data() {
    return {
      permalink: "/styles/style.css",
      eleventyExcludeFromCollections: true,
      layout: false,
    };
  }

  renderError(error) {
    return `
    body:before { 
        content: ''; 
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: hsla(0, 0%, 0%, 0.45);
    }

    body:after { 
        content: '${cssesc(error)}'; 
        padding: 0 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        min-height: 4rem;
        max-height: 70vh;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 4px solid #FF4136;
        background-color: #DDDDDD;
        font-family: monospace;
    }`;
  }

  async render() {
    try {
      const result = sass.compile(
        join(__dirname, "../../../src/site/styles/style.scss")
      );
      return result.css;
    } catch (error) {
      console.error(error);
      return this.renderError(
        error.sassMessage + " | " + error.span.context + " | " + error.span.url
      );
    }
  }
};
