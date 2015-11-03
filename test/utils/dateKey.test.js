var expect = require('chai').expect;
var sinon = require('sinon');

var dateKey = require('../../src/utils/dateKey');

describe('dateKey', function() {

  beforeEach(function() {
    this.sinon = sinon.sandbox.create();
  });

  beforeEach(function() {
    this.sinon.restore();
  });

  it('should create the same key for the same day', function() {
    var today = dateKey(new Date());
    var todayAlso = dateKey(new Date());
    expect(today).to.eq(todayAlso);
  });

  it('should create different keys for different days', function() {
    var today = dateKey(new Date());
    var notToday = dateKey(new Date(2000, 1, 1));
    expect(today).not.to.eq(notToday);
  });

});
