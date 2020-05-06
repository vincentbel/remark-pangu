"use strict";

const defaults = require("./defaults");

const mergeOptions = (d, n) => {
  const mixed = Object.assign({}, d);
  for (const key in n) {
    if (typeof n[key] === "boolean") mixed[key] = n[key];
  }

  return mixed;
};

module.exports = (options) => {
  let mixed = Object.assign({}, defaults);
  if (typeof options === "object") {
    if (typeof options.type === "object") {
      mixed.type = mergeOptions(defaults.type, options.type);
    }
    if (typeof options.parent === "object") {
      for (const key in options.parent) {
        mixed.parent[key] = mergeOptions(
          defaults.parent[key],
          options.parent[key]
        );
      }
    }
  }

  return mixed;
};
