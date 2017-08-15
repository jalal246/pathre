[![NPM](https://nodei.co/npm/pathre.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/pathre/)

[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)](https://travis-ci.org/Jimmy02020/pathre)
[![Codecov](https://img.shields.io/codecov/c/github/codecov/example-python.svg)](https://codecov.io/gh/Jimmy02020/pathre)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Jimmy02020/pathre/blob/master/LICENSE)

Overview
--------
`Pathre` is path-resolver utility functions for [node](https://nodejs.org/en/).

`Pathre` consists of __validation-functions__ and __get-functions__ which makes dealing with path super simple and easy.


Usage
-----------

### Validation functions
* [isValid](#isValid)
* [isDir](#isDir)
* [isFile](#isFile)
* [isExistent](#isExistent)
* [isZeroSize](#isZeroSize)

### Get functions
* [directory](#directory)
* [fileName](#fileName)
* [fileExt](#fileExt)
* [pathStat](#pathStat)

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

Validate given path. If path is valid returns true, otherwise returns false.

__Examples__

```javascript
check.isValid('whatever') // false
check.isValid(path.join(__dirname)) // true
```
<a name="isDir" />

### isDir(path)

If path is for directory (not file) returns true, otherwise returns false.

__Examples__

```javascript
check.isDir('/path/here/') // true
check.isDir('/path/here/test.txt') // false
```
<a name="isFile" />

### isFile(path)

If path is for file (not directory) returns true, otherwise returns false.

__Examples__

```javascript
check.isFile('/path/here/test.txt') // true
```
<a name="isExistent" />

### isExistent(path, callback)

If path is valid/existent returns true, otherwise returns false.

_NOTE_: Path can be valid path but not for existence path. If you check for existence use `isExistent` if you validate the path before create it use `isValid`.

__Examples__

```javascript
isExistent('/here/dir', (isExsist) => {
  if(isExsist){
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

If file is valid and zero size then true, otherwise returns false.

__Examples__

```javascript
isZeroSize('/here/dir/empty.txt', (isZero) => {
  if(isZero){
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

Returns string has directory name, whether the path is with file name or without it.


__Examples__

```javascript
get.directory('/path/here/.env.test') // '/path/here
```
<a name="fileName" />

### fileName(path)

Returns string has file name.


__Examples__

```javascript
get.fileName('/path/here/.env.test') // .env.test
```

<a name="fileExt" />

### fileExt(path)

Returns string has file extension.


__Examples__

```javascript
get.fileExt('/path/here/.env.test') // env
get.fileExt('/path/here/filename.txt') // txt
```

<a name="dirStat" />

### pathStat(path, callback)

Gets the main properties from path.

The callback returns one argument object  `(stat)`:

`stat` has:

* `isValid`
* `isDir`
* `isFile`
* `size`

__Examples__

```javascript
get.pathStat('dir/here/emptyfile.txt', (err, obj) => {
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
