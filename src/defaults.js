"use strict";

module.exports = {
  type: {
    text: true,
    inlineCode: true,
    link: true,
    image: true,
    imageReference: true,
    definition: true,
    html: false,
  },
  parent: {
    /**
     * Skip parent-children pairs
     * E.g 
     * link: {
     *  text: true
     * }
     * means skip all text children under link
     */
  }
};
