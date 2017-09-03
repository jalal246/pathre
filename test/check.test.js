/* eslint-env mocha */
import chai from 'chai';
import fs from 'fs';
import path from 'path';

import {
  check,
} from '../src';

const expect = chai.expect;

const testfilesDir = path.join(__dirname, 'testfilesCheck');
const noDir = path.join(__dirname, 'no-dir');

const EMPTY_FILE_INFO_NAME = '.env.info.test';
const fileExist = path.join(testfilesDir, EMPTY_FILE_INFO_NAME);
const fileNonExist = path.join(testfilesDir, '.env.not.test');

const EMPTY_FILE_NAME = '.env.empty';
const empty = path.join(testfilesDir, EMPTY_FILE_NAME);


describe('check functions', () => {
  describe('isPath', () => {
    describe('isPathValid', () => {
      it('returns false for undefined path', () => {
        expect(check.isPathValid(undefined)).to.equal(false);
      });
      it('returns false for null path', () => {
        expect(check.isPathValid(undefined)).to.equal(false);
      });
      it('returns false for empty path', () => {
        expect(check.isPathValid('')).to.equal(false);
      });
      it('returns true for valid directory', () => {
        expect(check.isPathValid(testfilesDir)).to.equal(true);
      });
      it('returns true for valid file path', () => {
        expect(check.isPathValid(fileExist)).to.equal(true);
      });
    });
    describe('isPathDir', () => {
      it('returns false for file path', () => {
        expect(check.isPathDir(fileExist)).to.equal(false);
      });
      it('returns true for directory', () => {
        expect(check.isPathDir(testfilesDir)).to.equal(true);
      });
    });
    describe('isPathFile', () => {
      it('returns false for file path', () => {
        expect(check.isPathFile(fileExist)).to.equal(true);
      });
      it('returns true for directory', () => {
        expect(check.isPathFile(testfilesDir)).to.equal(false);
      });
    });
  });
  describe('create dir and files to be tested', () => {
    it('init dir', (done) => {
      try {
        fs.mkdirSync(testfilesDir);
      } catch (e) {
        if (e.code !== 'EEXIST') throw e;
      }
      done();
    });
    it('init files', (done) => {
      fs.writeFileSync(fileExist, 'some info');
      fs.closeSync(fs.openSync(empty, 'w'));
      done();
    });
  });
  describe('isExist', () => {
    it('throws error for non valid cb', () => {
      expect(() => check.isExist(fileExist, 'test')).to.throw(Error);
    });
    it('returns false for non-existent dir', (done) => {
      check.isExist(noDir, (res) => {
        expect(res).to.equal(false);
        done();
      });
    });
    it('returns false for non-existent file', (done) => {
      check.isExist(fileNonExist, (res) => {
        expect(res).to.equal(false);
        done();
      });
    });
    it('returns true for existent file', (done) => {
      check.isExist(fileExist, (res) => {
        expect(res).to.equal(true);
        done();
      });
    });
    it('returns true for existent dir', (done) => {
      check.isExist(testfilesDir, (res) => {
        expect(res).to.equal(true);
        done();
      });
    });
  });
  describe('isFileZeroSize', () => {
    it('throws error for invalid cb', () => {
      expect(() => check.isFileZeroSize(fileExist, 'test')).to.throw(Error);
    });
    it('returns false for non-empty dir', (done) => {
      check.isFileZeroSize(fileExist, (res) => {
        expect(res).to.equal(false);
        done();
      });
    });
    it('returns true for empty dir', (done) => {
      check.isFileZeroSize(empty, (res) => {
        expect(res).to.equal(true);
        done();
      });
    });
    it('returns false for unix testing dir', (done) => {
      check.isFileZeroSize(empty, 'unix', (res) => {
        expect(res).to.equal(false);
        done();
      });
    });
  });
  describe('delete', () => {
    it('delete all test-files with dir', (done) => {
      fs.unlinkSync(fileExist);
      fs.unlinkSync(empty);
      done();
    });
    it('delete all test-dirs', (done) => {
      try {
        fs.rmdirSync(testfilesDir);
      } catch (e) {
        if (e.code !== 'ENOTEMPTY') throw e;
      }
      done();
    });
  });
});
