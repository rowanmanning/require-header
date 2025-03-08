
# Migration Guide

This document outlines how to migrate to new major breaking versions of this library. We cover each major version in a separate section.

* [Migrating from v5 to v6](#migrating-from-v5-to-v6)
  * [Dropped Node.js v18 support](#dropped-nodejs-v18-support)
  * [Switch to named exports](#switch-to-named-exports)
* [Migrating from v4 to v5](#migrating-from-v4-to-v5)
  * [Dropped Node.js v16 support](#dropped-nodejs-v16-support)
* [Migrating from v3 to v4](#migrating-from-v3-to-v4)
  * [Dropped Node.js v14 support](#dropped-nodejs-v14-support)
* [Migrating from v2 to v3](#migrating-from-v2-to-v3)
  * [Dropped Node.js v12 support](#dropped-nodejs-v12-support)
* [Migrating from v1 to v2](#migrating-from-v1-to-v2)
  * [Dropped Node.js v0.10-10 support](#dropped-nodejs-v010-10-support)

## Migrating from v5 to v6

### Dropped Node.js v18 support

The library now only supports Node.js v20 and above.

### Switch to named exports

We've moved away from using a default export for the `requireHeader` function. It's now a named export. You'll need to update your imports:

```diff
- const requireHeader = require('require-header');
+ const { requireHeader } = require('require-header');
```

or

```diff
- import requireHeader from 'require-header';
+ import { requireHeader } from 'require-header';
```

## Migrating from v4 to v5

### Dropped Node.js v16 support

The library now only supports Node.js v18 and above.

## Migrating from v3 to v4

### Dropped Node.js v14 support

The library now only supports Node.js v16 and above.

## Migrating from v2 to v3

### Dropped Node.js v12 support

The library now only supports Node.js v14 and above.

## Migrating from v1 to v2

### Dropped Node.js v0.10-10 support

The library now only supports Node.js v12 and above.
