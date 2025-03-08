'use strict';

class BadRequestError extends Error {
	/**
	 * @override
	 * @type {string}
	 */
	name = 'BadRequestError';

	/** @type {number} */
	status = 400;

	/** @type {number} */
	statusCode = 400;
}

/**
 * Create an Express middleware function which errors if an HTTP header is not present.
 *
 * @public
 * @param {string} header
 *     The HTTP header to check for.
 * @param {string} [message]
 *     The error message text to use if the header is not present.
 * @returns {import('express').Handler}
 *     Returns a middleware function.
 */
exports.requireHeader = function requireHeader(header, message = `${header} header is required`) {
	return (request, _response, next) => {
		if (!request.headers[header.toLowerCase()]) {
			return next(new BadRequestError(message));
		}
		next();
	};
};
