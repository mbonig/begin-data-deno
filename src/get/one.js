/**
 * @private
 * @module get/one
 */
import getTableName from "../_get-table-name.js";

import waterfall from "../run-waterfall.ts";

import getKey from "../_get-key.js";

import unfmt from "../_unfmt.js";

import doc from "../_get-doc.js";

/**
 * Read a document
 * @param {object} params - The {table, key} of documents to read
 * @param {callback} errback - Node style error first callback
 */
function one(params, callback) {
  // boilerplague
  let promise
  if (!callback) {
    promise = new Promise(function(res, rej) {
      callback = function _errback(err, result) {
        err ? rej(err) : res(result)
      }
    })
  }
  waterfall([
    getTableName,
    function gets(TableName, callback) {
      let Key = getKey(params)
      doc.get({
        TableName,
        Key
      }, callback)
    }
  ],
  function gots(err, result) {
    if (err) callback(err)
    else callback(null, unfmt(result.Item))
  })
  // more fun
  return promise
}

export default one