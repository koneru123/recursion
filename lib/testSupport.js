var mocha;
var chai;
var sinon;
var clock;

(function() {
  'use strict';

  if (typeof window === 'object') {
    mocha.setup('bdd');
    window.expect = chai.expect;

    window.onload = function() {
      window.mochaPhantomJS ? mochaPhantomJS.run() : mocha.run();
    };
  }

  if (typeof window !== 'object') {
    mocha = require('mocha');
    chai = require('chai');
    sinon = require('sinon');
    chai.use(require('sinon-chai'));
    global.expect = chai.expect;
    global.sinon = sinon;
  }

  var globalContext = typeof window === 'object' ? window : global;

  // Disabling native methods is dangerous, we should spy on them instead
  before(function() {
    sinon.spy(Array.prototype,'map');
    sinon.spy(Array.prototype,'sort');
    sinon.spy(Array.prototype,'reverse');
    sinon.spy(Object,'assign');
    sinon.spy(JSON,'stringify');
    sinon.spy(JSON,'parse');
    globalContext.analyze = o => {
      let c = 0;
      for (let k in o) {
        typeof o[k] === 'object' && (c += analyze(o[k]));
        c++;
      }
      return c;
    };
  });

  afterEach(function() {
    if (typeof window !== 'object') {
      Array.prototype.map.resetHistory();
      Array.prototype.sort.resetHistory();
      Array.prototype.reverse.resetHistory();
      Object.assign.resetHistory();
      JSON.stringify.resetHistory();
      JSON.parse.resetHistory();
    }
    else  {
      Array.prototype.map.reset();
      Array.prototype.sort.reset();
      Array.prototype.reverse.reset();
      Object.assign.reset();
      JSON.stringify.reset();
      JSON.parse.reset();
    }
  });

  after(function() {
    Array.prototype.map.restore();
    Array.prototype.sort.restore();
    Array.prototype.reverse.restore();
    Object.assign.restore();
    JSON.stringify.restore();
    JSON.parse.restore();
    delete globalContext.analyze;
  });

}());
