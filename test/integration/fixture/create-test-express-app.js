'use strict';

const requireHeader = require('../../..');

module.exports = async function createTestExpressApp(expressModule) {
	const express = require(expressModule);

	// Create an Express app
	const app = express();

	// Add a route which requires a header
	app.all('/', requireHeader('mock-header'), (_request, response) => {
		response.status(200);
		response.send('OK');
	});

	app.use((error, _request, response, _next) => {
		response.status(error.status || 500);
		response.send(error.message);
	});

	// Start the server and get the application address
	const server = await start(app);
	const address = `http://localhost:${server.address().port}`;

	/**
	 * Stop the application.
	 */
	function stop() {
		server.close();
	}

	/**
	 * Method to make a GET request to the test application.
	 *
	 * @param {string} requestPath
	 *     The path to make a request to.
	 * @param {object} headers
	 *     HTTP headers to send with the request.
	 * @returns {Response}
	 *     Returns an HTTP response object.
	 */
	function get(requestPath, headers = {}) {
		const url = new URL(requestPath, address);
		return fetch(url, { headers });
	}

	// Return the methods that we need
	return {
		get,
		stop
	};
};

/**
 * Start the application.
 *
 * @param {import('express').Application} app
 *     The Express application to start.
 * @returns {Promise<import('http').Server>}
 *     Returns the started HTTP server.
 */
function start(app) {
	return new Promise((resolve, reject) => {
		const server = app.listen(undefined, (error) => {
			if (error) {
				return reject(error);
			}
			resolve(server);
		});
	});
}
