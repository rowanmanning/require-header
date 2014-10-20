
Require-Header
=============

Express middleware to handle errors where an expected header is missing.

**Current Version:** *1.0.0*  
**Node Support:** *0.10.x, 0.11.x*  
**License:** [MIT][mit]  
**Build Status:** [![Build Status][travis-img]][travis]


Install
-------

Install Require-Header with [npm][npm]:

```sh
npm install require-header
```


Usage
-----

```js
var requireHeader = require('require-header');
```

`requireHeader` will return a middleware function that will error if the request does not set the given header. The error will have `message` and `status` properties which you can use.

It accepts two arguments. Firstly, the name of a header which is required:

```js
requireHeader('User-Agent');
```

Secondly (optionally) a message which will be used in the error if the request message does not match:

```js
requireHeader('User-Agent', 'User-Agent header is required');
```

### Route-level

```js
var express = require('express');
var app = express();

// Only requests with a User-Agent header will continue
app.get(requireHeader('User-Agent'), function () { ... });
```

If you want to do something useful with the error, for example output a sensible JSON response, you will need to define an error handler for your application (*after* the route definition):

```js
app.use(function (err, req, res, next) {
    res.status(err.status || 500).send({
        message: err.message
    });
});
```

### Application-level

```js
var express = require('express');
var app = express();

// Require a User-Agent header across the entire application
app.use(requireHeader('User-Agent'));
```


Contributing
------------

To contribute to Require-Header, clone this repo locally and commit your code on a separate branch.

Please write unit tests for your code, and check that everything works by running the following before opening a pull-request:

```sh
make lint test
```


License
-------

Require-Header is licensed under the [MIT][mit] license.  
Copyright &copy; 2014, Rowan Manning



[mit]: LICENSE
[npm]: https://npmjs.org/
[travis]: https://travis-ci.org/rowanmanning/require-header
[travis-img]: https://travis-ci.org/rowanmanning/require-header.svg?branch=master
