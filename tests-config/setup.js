'use strict'

const fs = require('fs')
const { extname } = require('path')
const unified = require('unified')
const parse = require('remark-parse')
const stringify = require('remark-stringify')
const frontmatter = require('remark-frontmatter')
const pangu = require('../index')

const processor = unified()
  .use(parse, { footnotes: true })
  .use(stringify)
  .use(frontmatter)
  .use(pangu)
  .freeze()

function formatAsync(source) {
  return processor.process(source)
}

function raw(string) {
  if (typeof string !== 'string') {
    throw new Error('Raw snapshots have to be strings.')
  }
  return { [Symbol.for('raw')]: string }
}

function runSpec(dirname) {
  fs.readdirSync(dirname).forEach(filename => {
    const path = dirname + '/' + filename
    if (
      extname(filename) !== '.snap' &&
      fs.lstatSync(path).isFile() &&
      filename !== 'run.spec.js'
    ) {
      const source = fs.readFileSync(path)
      test(`${filename}`, () => {
        return formatAsync(source).then(vfile => {
          const output = String(vfile)
          return expect(
            raw(source + '~'.repeat(80) + '\n' + output),
          ).toMatchSnapshot(filename)
        })
      })
    }
  })
}

global.runSpec = runSpec
