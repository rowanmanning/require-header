'use strict';

const {assert} = require('chai');
const createTestApp = require('./fixture/create-test-express-app');

describe('Express 5', () => {
	let app;

	before(async () => {
		app = await createTestApp('express5');
	});

	after(() => {
		app.stop();
	});

	describe('GET / with required header', () => {
		let response;

		beforeEach(async () => {
			response = await app.get('/', {
				'mock-header': 'valid'
			});
		});

		it('responds with a 200 status', () => {
			assert.strictEqual(response.status, 200);
		});

	});

	describe('GET / without required header', () => {
		let response;

		beforeEach(async () => {
			response = await app.get('/');
		});

		it('responds with a 400 status', () => {
			assert.strictEqual(response.status, 400);
		});

		it('outputs the error message', () => {
			assert.strictEqual(response.data, 'mock-header header is required');
		});

	});

	describe('GET / without empty required header', () => {
		let response;

		beforeEach(async () => {
			response = await app.get('/', {
				'mock-header': ''
			});
		});

		it('responds with a 400 status', () => {
			assert.strictEqual(response.status, 400);
		});

		it('outputs the error message', () => {
			assert.strictEqual(response.data, 'mock-header header is required');
		});

	});

});
