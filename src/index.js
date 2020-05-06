"use strict";

const visit = require("unist-util-visit");
const is = require("unist-util-is");
const pangu = require("pangu");
const setOptions = require("./set-options");

// List of Markdown AST: <https://github.com/syntax-tree/mdast>
// AST Explorer: <https://astexplorer.net/#/gist/7a794a8fc43b2e75e27024c85fb77aad/0934495eb735dffdf739dc7943f7848940070f8e>
//
// AST we should format:
// 1. text node:
//    * paragraph children
//    * blockquote children
//    * heading children
//    * emphasis children
//    * strong children
//    * listItems children
//    * tableCell children
//    * delete children
//    * link children
//    * image children
//    * footnote children
// 2. inlineCode value
// 3. link title
// 4. image title/alt
// 5. imageReference alt
// 6. definition title
//
//
// AST we ignored:
// 1. YAML
// 2. html (it can contain link: <a> <img>)
// 3. 临接情况
//     1. 粗体：我的a**粗体**
//     2. 强调：我的a*强调*
//     3. ...

function format(value) {
  if (!value) return value;
  return pangu.spacing(value);
}

const trueSet = (obj) => Object.keys(obj).filter((e) => obj[e]);
const falseSet = (obj) => Object.keys(obj).filter((e) => !obj[e]);

const parentIdentifier = (parent, rules) => {
  if (rules) {
    const subset = falseSet(rules);
    if (parent && subset.includes(parent.type)) return false;
  }

  return true;
};

const typeIdentifier = (node, subset) => is(node, subset)

const handler = (node) => {
  if (is(node, "text") || is(node, "inlineCode") || is(node, "html")) {
    node.value = format(node.value);
  }

  if (is(node, "link") || is(node, "image") || is(node, "definition")) {
    node.title = format(node.title);
  }

  if (is(node, "image") || is(node, "imageReference")) {
    node.alt = format(node.alt);
  }
};

module.exports = function attacher(options) {
  const settings = setOptions(options || {});
  const subset = trueSet(settings.type);

  return function transformer(tree, file) {
    visit(tree, (node, index, parent) => {
      if (typeIdentifier(node, subset)) 
        if (parentIdentifier(parent, settings.parents[node.type]))
          handler(node);
    });
  };
};
