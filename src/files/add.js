'use strict'

const isStream = require('is-stream')
const promisify = require('promisify-es6')
const converter = require('../utils/converter')

module.exports = (send) => {
  return promisify((files, opts, callback) => {
    if (typeof opts === 'function') {
      callback = opts
      opts = {}
    }

    opts = opts || {}

    const ok = Buffer.isBuffer(files) ||
               isStream.readable(files) ||
               Array.isArray(files)

    if (!ok) {
      return callback(new Error('"files" must be a buffer, readable stream, or array of objects'))
    }

    const request = { path: 'add', files: files, qs: opts }

    send.andTransform(request, converter, callback)
  })
}
