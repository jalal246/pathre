import {
  path,
  fs,
} from '../deps';

import {
  errize,
  isCB,
} from '../shared';

// is
const isPathValid = dir => !!dir && path.parse(dir).root.length > 0;
const isPathDir = dir => isPathValid(dir) && path.parse(dir).ext.length === 0;
const isPathFile = dir => isPathValid(dir) && path.parse(dir).ext.length > 0;

// async

const isExist = (dir, cb) => {
  if (!isCB(cb)) throw errize(0);
  return fs.stat(dir, err => cb(!(err && (err.code === 'ENOENT'))));
};

const isFileZeroSize = (dir, type, cb) => {
  let callback;
  if (isCB(type)) callback = type;
  else if (isCB(cb)) callback = cb;
  else throw errize(0);
  fs.stat(dir, (err, stat) => callback(
    !err && type === 'unix'
      ? stat.size === 4096
      : stat.size === 0,
  ));
};

module.exports = {
  isPathValid,
  isPathDir,
  isPathFile,
  // async
  isExist,
  isFileZeroSize,
};
