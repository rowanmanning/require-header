'use strict';

const assert = require('node:assert');
const { beforeEach, describe, it } = require('node:test');

describe('lib/require-header', () => {
	let requireHeader;

	beforeEach(() => {
		requireHeader = require('../../../lib/require-header');
	});

	it('is a function', () => {
		assert.strictEqual(typeof requireHeader, 'function');
	});

	describe('requireHeader(header)', () => {
		it('returns a function', () => {
			assert.strictEqual(typeof requireHeader(), 'function');
		});

		describe('middleware(request, response, next)', () => {
			let request;
			let response;

			beforeEach(() => {
				request = {
					headers: {}
				};
				response = {};
			});

			describe('when header is present', () => {
				it('does not callback with an error', (_, done) => {
					request.headers.foo = 'bar';
					requireHeader('foo')(request, response, (error) => {
						assert.strictEqual(error, undefined);
						done();
					});
				});

				it('ignores case in the required header', (_, done) => {
					request.headers.foo = 'bar';
					requireHeader('FOO')(request, response, (error) => {
						assert.strictEqual(error, undefined);
						done();
					});
				});
			});

			describe('when header is not present', () => {
				it('calls back with a 400 error', (_, done) => {
					requireHeader('foo')(request, response, (error) => {
						assert.ok(error instanceof Error);
						assert.strictEqual(error.status, 400);
						assert.strictEqual(error.statusCode, 400);
						assert.strictEqual(error.message, 'foo header is required');
						done();
					});
				});

				it('calls back with a 400 error with a custom message if specified', (_, done) => {
					requireHeader('foo', 'bar')(request, response, (error) => {
						assert.ok(error instanceof Error);
						assert.strictEqual(error.status, 400);
						assert.strictEqual(error.statusCode, 400);
						assert.strictEqual(error.message, 'bar');
						done();
					});
				});
			});

			describe('when header is present but empty', () => {
				it('calls back with a 400 error', (_, done) => {
					request.headers.foo = '';
					requireHeader('foo')(request, response, (error) => {
						assert.ok(error instanceof Error);
						assert.strictEqual(error.status, 400);
						assert.strictEqual(error.statusCode, 400);
						assert.strictEqual(error.message, 'foo header is required');
						done();
					});
				});
			});
		});
	});

	describe('.default', () => {
		it('aliases the module exports', () => {
			assert.strictEqual(requireHeader, requireHeader.default);
		});
	});
});
