var expect = require('chai').expect;
var sinon = require('sinon');

var texts = require('../../src/utils/texts');

describe('texts', function() {

  beforeEach(function() {
    this.sinon = sinon.sandbox.create();
  });

  beforeEach(function() {
    this.sinon.restore();
  });

  describe('dateLabel', function() {

    // it('creates different keys for different days', function() {
    //   var today = dateKey(new Date());
    //   var notToday = dateKey(new Date(2000, 1, 1));
    //   expect(today).not.to.eq(notToday);
    // });

  });

});
