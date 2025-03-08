'use strict';

/**
 * @import { requireHeader } from '.'
 */

class BadRequestError extends Error {
	/** @override */
	name = 'BadRequestError';
	status = 400;
	statusCode = 400;
}

/** @type {requireHeader} */
exports.requireHeader = function requireHeader(header, message = `${header} header is required`) {
	return (request, _response, next) => {
		if (!request.headers[header.toLowerCase()]) {
			return next(new BadRequestError(message));
		}
		next();
	};
};
