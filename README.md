
# Require-Header

Express middleware to handle errors where an expected header is missing.

* [Requirements](#requirements)
* [Usage](#usage)
  * [Route-level](#route-level)
  * [Application-level](#application-level)
* [Migration](#migration)
* [Contributing](#contributing)
* [License](#license)


## Requirements

This library requires the following to run:

  * [Node.js](https://nodejs.org/) 22+


## Usage

Install with [npm](https://www.npmjs.com/):

```sh
npm install require-header
```

Load the library into your code with a `require` call:

```js
const { requireHeader } = require('require-header');
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
const express = require('express');
const app = express();

// Only requests with a User-Agent header will continue
app.get(requireHeader('User-Agent'), () => { ... });
```

If you want to do something useful with the error, for example output a sensible JSON response, you will need to define an error handler for your application (*after* the route definition):

```js
app.use((error, request, response, next) => {
    response.status(error.status || 500).send({
        message: error.message
    });
});
```

### Application-level

```js
const express = require('express');
const app = express();

// Require a User-Agent header across the entire application
app.use(requireHeader('User-Agent'));
```


## Migration

A new major version of this project is released if breaking changes are introduced. We maintain a [migration guide](docs/migration.md) to help users migrate between these versions.


## Contributing

[The contributing guide is available here](docs/contributing.md). All contributors must follow [this library's code of conduct](docs/code_of_conduct.md).


## License

Licensed under the [MIT](LICENSE) license.<br/>
Copyright &copy; 2015, Rowan Manning
