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

  it('creates a key using year-month-day', function() {
    var today = dateKey(new Date(2015, 1, 5));
    expect(today).to.eq('2015-2-5');
  });

  it('creates the same key for the same day', function() {
    var today = dateKey(new Date());
    var todayAlso = dateKey(new Date());
    expect(today).to.eq(todayAlso);
  });

  it('creates different keys for different days', function() {
    var today = dateKey(new Date());
    var notToday = dateKey(new Date(2000, 1, 1));
    expect(today).not.to.eq(notToday);
  });

});
