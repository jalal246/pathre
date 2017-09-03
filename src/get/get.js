import {
  path,
  fs,
  TS,
} from '../deps';

import check from '../check';

import {
  errize,
  isCB,
} from '../shared';

// get only the directory without file name.
const directory = dir => (
  check.isPathDir(dir) ?
    dir :
    path.parse(dir).dir
);

// get the file name form directory.
const fileName = dir => !check.isPathDir(dir) && path.parse(dir).base;

/*
  following functions use to get file extension.
*/

// check if fileName starts with dot.
const isStartWithDot = (str, cb) => cb(str.slice(0, 1) === '.');

// split the name by dot.
const splitByDot = str => str.split('.');

// gets the first array elem from split; like .env
const splitDotFrmStart = str => splitByDot(str)[1];

// gets the last array elem from split; like .txt
const splitDotFrmEnd = (str) => {
  const snm = splitByDot(str);
  return snm[snm.length - 1];
};


// get the file extension form directory.
const fileExt = (dir) => {
  const fn = fileName(dir);
  if (fn) {
    // if fn invalid, fileName will returns false.
    return isStartWithDot(fn, withDot => (withDot ? splitDotFrmStart(fn) : splitDotFrmEnd(fn)));
  }
  // return false when we have invalid fn
  return fn;
};

const fileStat = (dir, cb) => {
  if (!isCB(cb)) throw errize(0);
  const ts = new TS();
  const rStream = fs.createReadStream(dir);
  rStream.pipe(ts);
  return ts.textics.once('getAll', stat => cb(null, stat));
};

const pathType = (dir) => {
  let isDir;
  let isFile;
  if (check.isPathDir(dir)) {
    isDir = true;
    isFile = false;
  } else if (check.isPathFile(dir)) {
    isDir = false;
    isFile = true;
  } else {
    isDir = false;
    isFile = false;
  }
  return {
    isDir,
    isFile,
  };
};

/**
 * returns path statistics as object
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
const pathStat = (dir, cb) => {
  if (!isCB(cb)) throw errize(0);
  return fs.stat(dir, (err, stats) => {
    let isValid;
    let isDir;
    let isFile;
    let size;
    if (err) {
      // file or dir is not exist.
      if (err.code === 'ENOENT') {
        isValid = false;
        size = 0;
        ({
          isDir,
          isFile,
        } = pathType(dir));
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
};


module.exports = {
  // dir
  directory,
  // file
  fileName,
  fileExt,
  fileStat,
  // pathe
  pathType,
  pathStat,
};
