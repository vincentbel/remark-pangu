const defaults = require('./defaults')

module.exports = (options) => {
    let mixed = Object.assign({}, defaults)
    for (key in options) {
        if (typeof options[key] === 'boolean')
            mixed[key] = options[key]
    }

    return mixed
}