"use strict";

const fs = require("fs");
const { extname } = require("path");
const unified = require("unified");
const parse = require("remark-parse");
const stringify = require("remark-stringify");
const frontmatter = require("remark-frontmatter");
const footnotes = require("remark-footnotes");
const pangu = require("../src/index");

const createProcessor = function (options) {
  return unified()
    .use(parse, { footnotes: true })
    .use(stringify)
    .use(frontmatter)
    .use(footnotes, { inlineNotes: true })
    .use(pangu, options)
    .freeze();
};

function raw(string) {
  if (typeof string !== "string") {
    throw new Error("Raw snapshots have to be strings.");
  }
  return { [Symbol.for("raw")]: string };
}

function runSpec(dirname, options) {
  fs.readdirSync(dirname).forEach((filename) => {
    const path = dirname + "/" + filename;
    if (
      extname(filename) !== ".snap" &&
      fs.lstatSync(path).isFile() &&
      filename !== "run.spec.js"
    ) {
      const source = fs.readFileSync(path);
      test(`${filename} with options: ${JSON.stringify(options)}`, () => {
        return createProcessor(options)
          .process(source)
          .then((vfile) => {
            const output = String(vfile);
            return expect(
              raw(source + "~".repeat(80) + "\n" + output)
            ).toMatchSnapshot(filename);
          });
      });
    }
  });
}

global.runSpec = runSpec;
