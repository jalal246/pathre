[![NPM](https://nodei.co/npm/pathre.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/pathre/)

[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)](https://travis-ci.org/Jimmy02020/pathre)
[![Codecov](https://img.shields.io/codecov/c/github/codecov/example-python.svg)](https://codecov.io/gh/Jimmy02020/pathre)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/Jimmy02020/pathre/pulls)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/Jimmy02020/pathre/blob/master/LICENSE)

>  path-resolver utility functions for [node](https://nodejs.org/en/)

`Pathre` consists of __validation__ and __get__  functions which make dealing with path super simple and easy :ok_hand:

Usage
-----------

### Validation functions
* [isPathValid](#isPathValid)
* [isPathDir](#isPathDir)
* [isPathFile](#isPathFile)
* [isExist](#isExist)
* [isFileZeroSize](#isFileZeroSize)

### Get functions
* [directory](#directory)
* [fileName](#fileName)
* [fileExt](#fileExt)
* [fileStat](#fileStat)
* [pathType](#pathType)
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
<a name="isPathValid" />

### isPathValid(path)

Validate given path. If path is valid returns true, otherwise returns false.

__Example__

```javascript
check.isPathValid('whatever') // false
check.isPathValid(path.join(__dirname)) // true
```
<a name="isPathDir" />

### isPathDir(path)

If path is for directory (not file) returns true, otherwise returns false.

__Example__

```javascript
check.isPathDir('/path/here/') // true
check.isPathDir('/path/here/test.txt') // false
```
<a name="isPathFile" />

### isPathFile(path)

If path is for file (not directory) returns true, otherwise returns false.

__Example__

```javascript
check.isPathFile('/path/here/test.txt') // true
```
<a name="isExist" />

### isExist(path, callback)

If path is valid/existent returns true, otherwise returns false.

_NOTE_: Path can be valid path but not for existence path. If you check for existence use `isExist` if you validate the path before create it use `isValid`.

__Example__

```javascript
isExist('/here/dir', (isExsist) => {
  if(isExsist){
    // do something
    console.log("valid");
  } else {
    // do something else
    console.log("invalid");
  }
})
```
<a name="isFileZeroSize" />

### isFileZeroSize(path, callback)

If file is valid and zero size then true, otherwise returns false.

__Example__

```javascript
isFileZeroSize('/here/dir/empty.txt', (isZero) => {
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


__Example__

```javascript
get.directory('/path/here/.env.test') // '/path/here
```
<a name="fileName" />

### fileName(path)

Returns string has file name.


__Example__

```javascript
get.fileName('/path/here/.env.test') // .env.test
```

<a name="fileExt" />

### fileExt(path)

Returns string has file extension.


__Example__

```javascript
get.fileExt('/path/here/.env.test') // env
get.fileExt('/path/here/filename.txt') // txt
```

<a name="fileStat" />

### fileStat(path, callback)

Gets text statistics from file. The function is implementation of [textics-stream](https://github.com/Jimmy02020/textics-stream)

The callback gets two arguments `(err, stat)`.

`stat` object consists of:

* `lines`
* `words`
* `chars`
* `spaces`

__Example__

```javascript
get.fileStat('dir/dir2/file.txt', (err, stat) => {
  console.log(stat);
  //
  {
    lines: 1830,
    words: 4483,
    chars: 12584,
    spaces: 3004,
  }
  //
});
```

<a name="pathType" />

### pathType(path)

Gets path type, file or directory.

returns `{isDir, isFile}`.


__Example__

```javascript
const type = get.pathType('dir/here/emptyfile.txt')
console.log(type);
//
{
  isDir: false,
  isFile: true,
}
//
```

<a name="pathStat" />

### pathStat(path, callback)

Gets the main properties from path.

The callback gets two arguments `(err, stat)`.

`stat` object consists of:

* `isValid`
* `isDir`
* `isFile`
* `size`

__Example__

```javascript
get.pathStat('dir/here/emptyfile.txt', (err, stat) => {
  console.log(stat);
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
