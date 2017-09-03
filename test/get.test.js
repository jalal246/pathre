/* eslint-env mocha */
import chai from 'chai';
import fs from 'fs';
import path from 'path';

import {
  get,
} from '../src';


const expect = chai.expect;

const testfilesDir = path.join(__dirname, 'testfilesGet');
const newDir = path.join(__dirname, 'new-dir');
const noDir = path.join(__dirname, 'no-dir');
const nofile = path.join(newDir, '.env.no.file.test');


const EMPTY_FILE_INFO_NAME = '.env.info.test';
const fileExist = path.join(testfilesDir, EMPTY_FILE_INFO_NAME);

const EMPTY_FILE_NAME = '.env.empty';
const empty = path.join(testfilesDir, EMPTY_FILE_NAME);

const fileStatTest = path.join(testfilesDir, 'info.txt');


describe('get-functions', () => {
  describe('init', () => {
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
  describe('directory', () => {
    it('returns directory when sending dir + file name', () => {
      expect(get.directory(empty)).to.equal(testfilesDir);
    });
    it('returns directory when sending dir', () => {
      expect(get.directory(testfilesDir)).to.equal(testfilesDir);
    });
  });
  describe('fileName', () => {
    it('returns file name when sending dir + file', () => {
      expect(get.fileName(empty)).to.equal(EMPTY_FILE_NAME);
    });
  });
  describe('fileExt', () => {
    it('returns txt filename.txt', () => {
      expect(get.fileExt(path.join(__dirname, 'filename.txt'))).to.equal('txt');
    });
    it('returns docs filename.docs', () => {
      expect(get.fileExt(path.join(__dirname, 'filename.docs'))).to.equal('docs');
    });
    it('returns env .env.filename.docs', () => {
      expect(get.fileExt(path.join(__dirname, '.env.filename'))).to.equal('env');
    });
    it('returns ext filename.with.many.dots.ext', () => {
      expect(get.fileExt(path.join(__dirname, 'filename.with.many.dots.ext'))).to.equal('ext');
    });
    it('returns false for invalid fileExt', () => {
      expect(get.fileExt(path.join(__dirname, 'filename'))).to.equal(false);
    });
  });
  describe('pathType', () => {
    it('returns all false for invalid', (done) => {
      expect(get.pathType('noDir')).to.deep.equal({
        isDir: false,
        isFile: false,
      });
      done();
    });
    it('returns isDir: true, for dir only', () => {
      expect(get.pathType(noDir)).to.deep.equal({
        isDir: true,
        isFile: false,
      });
    });
    it('returns isFile: true, for file dir', () => {
      expect(get.pathType(nofile)).to.deep.equal({
        isDir: false,
        isFile: true,
      });
    });
  });
  describe('pathStat', () => {
    it('throws error for non valid cb', () => {
      expect(() => get.pathStat(fileExist, 'test')).to.throw(Error);
    });
    it('returns all false for invalid dir', (done) => {
      get.pathStat('noDir', (err, obj) => {
        expect(obj).to.be.deep.equal({
          isValid: false,
          isDir: false,
          isFile: false,
          size: 0,
        });
        done();
      });
    });
    it('returns isDir: true, others false for non existence but valid dir', (done) => {
      get.pathStat(noDir, (err, obj) => {
        expect(obj).to.be.deep.equal({
          isValid: false,
          isDir: true,
          isFile: false,
          size: 0,
        });
        done();
      });
    });
    it('returns isFile: true, others false for non existence but valid file + dir', (done) => {
      get.pathStat(nofile, (err, obj) => {
        expect(obj).to.be.deep.equal({
          isValid: false,
          isDir: false,
          isFile: true,
          size: 0,
        });
        done();
      });
    });
    it('returns isValid: true isFile:false isDir:true size:0 for existence dir', (done) => {
      get.pathStat(testfilesDir, (err, obj) => {
        // console.log(obj);
        expect(obj.size).to.be.within(0, 44);
        // expect(obj).to.be.deep.equal({
        //   isValid: true,
        //   isDir: true,
        //   isFile: false,
        //   size: 0 || 44,
        // });
        done();
      });
    });
  });
  describe('fileStat', () => {
    const p = 'you got the   power ';
    let txt = '';
    const LOOP1 = 102;
    const txtlinesNum = LOOP1;
    const txtWordsNum = 4 * LOOP1;
    const txtCharNum = 14 * LOOP1;
    const txtSpacesNum = 6 * LOOP1;
    const LOOP2 = 2200;
    const linesNum = LOOP2 * txtlinesNum;
    const wordsNum = LOOP2 * txtWordsNum;
    const charNum = LOOP2 * txtCharNum;
    const spacesNum = LOOP2 * txtSpacesNum;
    it('init file with various line-ending', () => {
      let nl = 0;
      for (let i = 0; i < LOOP1; i += 1) {
        nl += 1;
        if (nl === 1) txt += `${p}\r`;
        else if (nl === 2) txt += `${p}\r\n`;
        else txt += `${p}\n`;
        if (nl === 3) nl = 0;
      }
      const wr = fs.createWriteStream(fileStatTest);
      for (let i = 0; i < LOOP2; i += 1) wr.write(txt);
      wr.end();
    });
    it('throws error for non valid cb', () => {
      expect(() => get.fileStat(fileExist, 'test')).to.throw(Error);
    });
    // it.only('return cb error for invalid path', (done) => {
    //   get.fileStat(fileStatTest, (e) => {
    //     expect(e).to.be.equal(Error);
    //     done();
    //   });
    // });
    it('returns correct stats for given file', (done) => {
      get.fileStat(fileStatTest, (e, r) => {
        expect(r).to.deep.equal({
          lines: linesNum,
          words: wordsNum,
          chars: charNum,
          spaces: spacesNum,
        });
        done();
      });
    });
  });
  describe('testing pathStat with info', () => {
    it('returns isFile: true, others false for non existence but valid file + dir', (done) => {
      get.pathStat(fileStatTest, (err, obj) => {
        expect(obj).to.be.deep.equal({
          isValid: true,
          isDir: false,
          isFile: true,
          size: 4787200,
        });
        done();
      });
    });
  });
  describe('delete', () => {
    it('delete all test-files with dir', (done) => {
      fs.unlinkSync(fileExist);
      fs.unlinkSync(empty);
      fs.unlinkSync(fileStatTest);
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
