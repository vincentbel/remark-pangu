# remark-pangu

[![travis build](https://img.shields.io/travis/VincentBel/remark-pangu.svg?style=flat-square)](https://travis-ci.org/VincentBel/remark-pangu)
[![version](https://img.shields.io/npm/v/remark-pangu.svg?style=flat-square)](http://npm.im/remark-pangu)
[![MIT License](https://img.shields.io/npm/l/remark-pangu.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

给 Markdown 中英文自动插入空格的 [remark](https://github.com/wooorm/remark) 插件（使用 [pangu.js](https://github.com/vinta/pangu.js)）。

## Install

```bash
npm install remark-pangu
```

## Usage

```js
remark().use(pangu)
```

```js
const remark = require('remark')
const pangu = require('remark-pangu')

const doc = '中文abc中文';
remark().use(pangu).process(doc, (err, file) => {
  console.log(String(file));
});
// => 中文 abc 中文
```

### Options

可以通过指定部分选项为 `false` 以跳过部分节点的排版处理

e.g. 不处理 `inline code`, 跳过 `link` 中 `text` 的内容

```js
remark().use(pangu, {
  type: {
    inlineCode: false
  },
  parent: {
    link: {
      text: false
    }
  }
})
```

#### Default Options

查阅 [default.js](src/defaults.js)

- `type`: 选择的节点类型
- `parents`: 跳过`父节点`-`子节点` 对
  默认不跳过

## LICENSE

[MIT](./LICENSE)
