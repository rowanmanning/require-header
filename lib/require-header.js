/**
 * @module require-header
 */
'use strict';

const httpError = require('http-errors');

/**
 * Create an Express middleware function which errors if an HTTP header is not present.
 *
 * @access public
 * @param {string} header
 *     The HTTP header to check for.
 * @param {string} [message]
 *     The error message text to use if the header is not present.
 * @returns {import('express').Handler}
 *     Returns a middleware function.
 */
module.exports = function requireHeader(header, message = `${header} header is required`) {
	return (request, response, next) => {
		if (!request.headers[header.toLowerCase()]) {
			return next(httpError(400, message));
		}
		next();
	};
};
