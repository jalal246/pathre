[![NPM](https://nodei.co/npm/pathre.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/pathre/)

[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)](https://travis-ci.org/Jimmy02020/pathre)
[![Codecov](https://img.shields.io/codecov/c/github/codecov/example-python.svg)](https://codecov.io/gh/Jimmy02020/pathre)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Jimmy02020/pathre/blob/master/LICENSE)

Overview
--------
Pathre is path-resolver utility functions for [node](https://nodejs.org/en/).

Pathre consists of validation-functions and get-functions which makes dealing with path super simple and easy.


Usage
-------------

### Validation functions
* [isValid](#isValid)
* [isDir](#isDir)
* [isFile](#isFile)
* [isExistent](#isExistent)
* [isZeroSize](#isZeroSize)

### Get functions
* [directory](#directory)
* [fileName](#fileName)
* [dirStat](#dirStat)

### Other
* [Tests](#Tests)
* [License](#License)


Getting Started
---------------

clone the repo:
```sh
git clone git@github.com:jimmy02020/pathre.git
cd pathre
```

Using npm:
```sh
$ npm install pathre
```

Validation:
--------------
```javascript
const { check } = require('pathre')
```
<a name="isValid" />

### isValid(path)

If path is valid returns true, otherwise returns false.

__Examples__

```javascript
check.isValid('whatever') // false
check.isValid(path.join(__dirname)) // true
```
<a name="isDir" />

### isDir(path)

If path is directory not file returns true, otherwise returns false.

__Examples__

```javascript
check.isDir('/path/here/') // true
check.isDir('/path/here/test.txt') // false
```
<a name="isFile" />

### isFile(path)

If undefined returns true, otherwise returns false.

__Examples__

```javascript
check.isFile('/path/here/test.txt') // true
```
<a name="isExistent" />

### isExistent(path, callback)

returns callback function, if path is valid/existent returns true, otherwise returns false.

__Examples__

```javascript
isExistent('/here/dir', callback => {
  if(callback){
    // do something
    console.log("valid");
  } else {
    // do something else
    console.log("invalid");
  }
})
```
<a name="isZeroSize" />

### isZeroSize(path, callback)

returns callback function, if file is valid and zero size then true, otherwise returns false.

__Examples__

```javascript
isZeroSize('/here/dir/empty.txt', callback => {
  if(callback){
    // do something
    console.log("file is empty");
  } else {
    // do something else
    console.log("file has info in it empty");
  }
})
```

Get functions:
--------------
```javascript
const { get } = require('pathre')
```

<a name="directory" />

### directory(path)

returns string has directory name whether it has file name with it or not.


__Examples__

```javascript
get.directory('/path/here/.env.test') // '/path/here
```
<a name="fileName" />

### fileName(path)

returns string has file name.


__Examples__

```javascript
get.fileName('/path/here/.env.test') // .env.test
```

<a name="dirStat" />

### dirStat(path, callback)

gets the main properties from path and returns object has:
``{isValid, isDir, isFile, size}``

__Examples__

```javascript
get.dirStat('dir/here/emptyfile.txt', (err, obj) => {
  console.log(obj);
  //
  {
    isValid: true,
    isDir: false,
    isFile: true,
    size: 0,
  }
  //
});
```

Tests
-----

```sh
$ npm test
```

License
-------

This project is licensed under the [MIT License](https://github.com/Jimmy02020/pathre/blob/master/LICENSE)
