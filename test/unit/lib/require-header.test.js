'use strict';

const {assert} = require('chai');
const td = require('testdouble');

describe('lib/require-header', () => {
	let error400;
	let httpError;
	let requireHeader;

	beforeEach(() => {
		httpError = td.replace('http-errors', td.func());
		error400 = {status: 400};
		td.when(httpError(), {ignoreExtraArgs: true}).thenReturn(error400);
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
						assert.strictEqual(error, error400);
						td.verify(httpError(400, 'foo header is required'), {times: 1});
						done();
					});
				});

				it('calls back with a 400 error with a custom message if specified', done => {
					requireHeader('foo', 'bar')(request, response, error => {
						assert.strictEqual(error, error400);
						td.verify(httpError(400, 'bar'), {times: 1});
						done();
					});
				});

			});

			describe('when header is present but empty', () => {

				it('calls back with a 400 error', done => {
					request.headers.foo = '';
					requireHeader('foo')(request, response, error => {
						assert.strictEqual(error, error400);
						td.verify(httpError(400, 'foo header is required'), {times: 1});
						done();
					});
				});

			});

		});

	});

});
