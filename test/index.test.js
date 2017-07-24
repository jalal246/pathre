/* eslint-env mocha */
import chai from 'chai';
import assert from 'assert';
import fs from 'fs';
import path from 'path';

import {
  get,
  check,
} from '../src';


const expect = chai.expect;


const testfiles = path.join(__dirname, 'testfiles');
const newDir = path.join(__dirname, 'new-dir');
const noDir = path.join(__dirname, 'no-dir');
const nofile = path.join(newDir, '.env.no.file.test');


const EMPTY_FILE_INFO_NAME = '.env.info.test';
const fileExist = path.join(testfiles, EMPTY_FILE_INFO_NAME);

const EMPTY_FILE_NAME = '.env.empty';
const empty = path.join(testfiles, EMPTY_FILE_NAME);


describe('path-resolver: Pathre', () => {
  describe('init', () => {
    it('init dir', (done) => {
      try {
        fs.mkdirSync(testfiles);
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
  describe('- CHECK FUNCTIONS::', () => {
    describe('isExistent- returns cb', () => {
      it('returns true for existent dir', (done) => {
        assert.doesNotThrow(() => {
          check.isExistent(testfiles, (res) => {
            expect(res).to.equal(true);
            done();
          });
        });
      });
      it('returns false for non-existent dir', (done) => {
        assert.doesNotThrow(() => {
          check.isExistent(noDir, (res) => {
            expect(res).to.equal(false);
            done();
          });
        });
      });
    });
    describe('isZeroSize- returns cb', () => {
      it('returns true for zero size file', (done) => {
        assert.doesNotThrow(() => {
          check.isZeroSize(empty, (res) => {
            expect(res).to.equal(true);
            done();
          });
        });
      });
      it('returns false for file with info', (done) => {
        assert.doesNotThrow(() => {
          check.isZeroSize(fileExist, (res) => {
            expect(res).to.equal(false);
            done();
          });
        });
      });
    });
    describe('isDir- returns boolean', () => {
      it('returns true for dir', () => {
        expect(check.isDir(testfiles)).to.equal(true);
      });
      it('returns false for file', () => {
        expect(check.isDir(empty)).to.equal(false);
      });
      it('returns false for invalid dir', () => {
        expect(check.isDir('empty')).to.equal(false);
      });
    });
    describe('isFile- returns boolean', () => {
      it('returns true for dir', () => {
        expect(check.isFile(empty)).to.equal(true);
      });
      it('returns false for file', () => {
        expect(check.isFile(testfiles)).to.equal(false);
      });
      it('returns false for non-existent', () => {
        expect(check.isFile('testfiles')).to.equal(false);
      });
    });
  });
  describe('get-functions', () => {
    describe('returns false when wrong entry', () => {
      it('fileName returns false, when sending directory without file', () => {
        expect(get.fileName(testfiles)).to.equal(false);
      });
      // it('filePath returns false, when sending directory without file', () => {
      //   expect(get.filePath(testfiles)).to.equal(false);
      // });
    });
    it('returns directory when sending dir + f', () => {
      expect(get.directory(empty)).to.equal(testfiles);
    });
    it('returns directory when sending dir', () => {
      expect(get.directory(testfiles)).to.equal(testfiles);
    });
    // it('returns filePath, for dir including file name, ', () => {
    //   expect(get.filePath(empty)).to.equal(empty);
    // });
    it('returns file name, for dir including file name', () => {
      expect(get.fileName(empty)).to.equal(EMPTY_FILE_NAME);
    });
    describe('get-functions:dirStat, returns cb', () => {
      describe('invalidtion', () => {
        describe('isValid: false', () => {
          it('returns isValid: false isFile:false isDir:false for invalid dir', (done) => {
            assert.doesNotThrow(() => {
              get.dirStat('noDir', (err, obj) => {
                expect(obj).to.be.deep.equal({
                  isValid: false,
                  isDir: false,
                  isFile: false,
                  size: 0,
                });
                done();
              });
            });
          });
          it('returns isValid: false isFile:true isDir:false for non existence dir', (done) => {
            assert.doesNotThrow(() => {
              get.dirStat(noDir, (err, obj) => {
                expect(obj).to.be.deep.equal({
                  isValid: false,
                  isDir: true,
                  isFile: false,
                  size: 0,
                });
                done();
              });
            });
          });
          it('returns isValid: false isFile:false isDir:true for non existence file', (done) => {
            assert.doesNotThrow(() => {
              get.dirStat(nofile, (err, obj) => {
                expect(obj).to.be.deep.equal({
                  isValid: false,
                  isDir: false,
                  isFile: true,
                  size: 0,
                });
                done();
              });
            });
          });
        });
      });
      describe('validtion', () => {
        it('returns isValid: true isFile:false isDir:true size:0 for existence dir', (done) => {
          assert.doesNotThrow(() => {
            get.dirStat(testfiles, (err, obj) => {
              expect(obj).to.be.deep.equal({
                isValid: true,
                isDir: true,
                isFile: false,
                size: 0,
              });
              done();
            });
          });
        });
        it('returns isValid: false isFile:false isDir:true for existence file', (done) => {
          assert.doesNotThrow(() => {
            get.dirStat(empty, (err, obj) => {
              expect(obj).to.be.deep.equal({
                isValid: true,
                isDir: false,
                isFile: true,
                size: 0,
              });
              done();
            });
          });
        });
        it('returns size:9 for info file', (done) => {
          assert.doesNotThrow(() => {
            get.dirStat(fileExist, (err, obj) => {
              expect(obj).to.be.deep.equal({
                isValid: true,
                isDir: false,
                isFile: true,
                size: 9,
              });
              done();
            });
          });
        });
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
        fs.rmdirSync(testfiles);
      } catch (e) {
        if (e.code !== 'ENOTEMPTY') throw e;
      }
      done();
    });
  });
});
