'use strict';

const { after, before, beforeEach, describe, it } = require('node:test');
const assert = require('node:assert');
const createTestApp = require('./fixture/create-test-express-app');

describe('Express 4', () => {
	let app;

	before(async () => {
		app = await createTestApp('express4');
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
		let body;
		let response;

		beforeEach(async () => {
			response = await app.get('/');
			body = await response.text();
		});

		it('responds with a 400 status', () => {
			assert.strictEqual(response.status, 400);
		});

		it('outputs the error message', () => {
			assert.strictEqual(body, 'mock-header header is required');
		});
	});

	describe('GET / without empty required header', () => {
		let body;
		let response;

		beforeEach(async () => {
			response = await app.get('/', {
				'mock-header': ''
			});
			body = await response.text();
		});

		it('responds with a 400 status', () => {
			assert.strictEqual(response.status, 400);
		});

		it('outputs the error message', () => {
			assert.strictEqual(body, 'mock-header header is required');
		});
	});
});
