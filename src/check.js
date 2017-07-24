import {
  path,
  fs,
} from './deps';


// is
const isValid = dir => path.parse(dir).root.length > 0;
const isDir = dir => isValid(dir) && path.parse(dir).ext.length === 0;
const isFile = dir => isValid(dir) && path.parse(dir).ext.length > 0;
const isExistent = (dir, cb) => fs.stat(dir, err => cb(!(err && (err.code === 'ENOENT'))));
const isZeroSize = (dir, cb) => fs.stat(dir, (err, stat) => cb(!err && stat.size === 0));

module.exports = {
  isValid,
  isDir,
  isFile,
  isExistent,
  isZeroSize,
};
