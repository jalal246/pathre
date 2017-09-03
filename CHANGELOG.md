# Changelog

## 1.0.0

* Change names for check functions:
    * from `isValid` to `isPathValid`
    * from `isDir` to `isPathDir`
    * from `isFile` to `isPathFile`
    * from `isExistent` to `isExist`
    * from `isZeroSize` to `isFileZeroSize`
* Add Unix minimum allocation size for `isFileZeroSize`
* Add new functions to get.
    * `pathType`
    * `fileStat`


## 0.0.3

* Change name from `get.dirStat` to `get.dirStat`.
* Check the path if undefined before checking for length in `check.isValid`.
* Update README with more clear explanation.
* Add test before building.
* Move from prepublish to prepublishOnly.
