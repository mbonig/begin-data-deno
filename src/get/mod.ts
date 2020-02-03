/**
 * @module get
 */
import * as one from './one.js'
import * as batch from './batch.js'
import * as page from './page.js'

/**
 * Read documents
 * @param {array|object} params - Either {table}, {table, key} or [{table, key}] of documents to read
 * @param {callback} errback - optional Node style error first callback
 * @returns {promise} promise - if no callback is supplied a promise is returned
 */
function get(params, callback) {

    // offload actual impl to each function
    if (Array.isArray(params)) {
        return batch(params, callback)
    }
    else if (params.hasOwnProperty('table') && params.hasOwnProperty('key')) {
        return one(params, callback)
    }
    else if (params.hasOwnProperty('table')) {
        return page(params, callback)
    }
    else {
        throw ReferenceError('Invalid args; expected [{table, key}], {table, key} or {table}')
    }
}

export default get;