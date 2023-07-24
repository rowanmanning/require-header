'use strict';

const {assert} = require('chai');

describe('lib/require-header', () => {
	let requireHeader;

	beforeEach(() => {
		requireHeader = require('../../../lib/require-header');
	});

	it('is a function', () => {
		assert.isFunction(requireHeader);
	});

	describe('requireHeader(header)', () => {

		it('returns a function', () => {
			assert.isFunction(requireHeader());
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

				it('does not callback with an error', done => {
					request.headers.foo = 'bar';
					requireHeader('foo')(request, response, error => {
						assert.isUndefined(error);
						done();
					});
				});

				it('ignores case in the required header', done => {
					request.headers.foo = 'bar';
					requireHeader('FOO')(request, response, error => {
						assert.isUndefined(error);
						done();
					});
				});

			});

			describe('when header is not present', () => {

				it('calls back with a 400 error', done => {
					requireHeader('foo')(request, response, error => {
						assert.ok(error instanceof Error);
						assert.strictEqual(error.status, 400);
						assert.strictEqual(error.statusCode, 400);
						assert.strictEqual(error.message, 'foo header is required');
						done();
					});
				});

				it('calls back with a 400 error with a custom message if specified', done => {
					requireHeader('foo', 'bar')(request, response, error => {
						assert.ok(error instanceof Error);
						assert.strictEqual(error.status, 400);
						assert.strictEqual(error.statusCode, 400);
						assert.strictEqual(error.message, 'bar');
						done();
					});
				});

			});

			describe('when header is present but empty', () => {

				it('calls back with a 400 error', done => {
					request.headers.foo = '';
					requireHeader('foo')(request, response, error => {
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
