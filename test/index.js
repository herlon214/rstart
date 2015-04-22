var vows = require('vows');
var assert = require('assert');
var suite = vows.describe('Health Checker');
var rstart = require('../index');

suite.addBatch({
  'Fail url': {
    topic: function() {
      var self = this;
      var r = new rstart("http://127.0.0.1:31000/", "ls", "* * * * * 60");
      r.check();
      r.on('response', function(response) {
        r.stop();
        self.callback(null, response);
      });
    },
    'Failed': function(error, response) {
      assert.equal(response, 'FAIL');
    }
  }
}).run();
