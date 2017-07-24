import {
  path,
  fs,
} from './deps';

import check from './check';


// get only the directory without file name.
const directory = dir => (
  check.isDir(dir) ?
    dir :
    path.parse(dir).dir
);


// get the file name form directory.
const fileName = dir => !check.isDir(dir) && path.parse(dir).base;


/**
 * returns directory stats, as object
 *
 * @param {string} dir  - directory.
 * @callback {Requester~requestCallback}
 *
 * @returns
 * @typedef {Object} dirStat
 * @property {Boolean} - isValid, exists or not.
 * @property {Boolean} - isDir, if any.
 * @property {Boolean} - isFile, if any.
 * @property {number} - size of file if avaliable.
 */
const dirStat = (dir, cb) => fs.stat(dir, (err, stats) => {
  let isValid;
  let isDir;
  let isFile;
  let size;
  if (err) {
    // file or dir is not exist.
    if (err.code === 'ENOENT') {
      isValid = false;
      size = 0;
      if (check.isDir(dir)) {
        isDir = true;
        isFile = false;
      } else if (check.isFile(dir)) {
        isDir = false;
        isFile = true;
      } else {
        isDir = false;
        isFile = false;
      }
      return cb(null, {
        isValid,
        isDir,
        isFile,
        size,
      });
    }
    return cb(err);
  }
  isValid = true;
  size = stats.size;
  if (stats.isDirectory()) {
    isDir = true;
    isFile = false;
  } else {
    isDir = false;
    isFile = true;
  }
  // all valid
  return cb(null, {
    isValid,
    isDir,
    isFile,
    size,
  });
});

module.exports = {
  // get
  directory,
  fileName,
  dirStat,
};
