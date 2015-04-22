/**
 * rStart - Health Checker
 */
var exec = require('child_process').exec;
var child;
var util = require('util');
var request = require('request');
var CronJob = require('cron').CronJob;
var w = require('winston');
// Logger config
w.remove(w.transports.Console);
w.add(w.transports.Console, { colorize: true, timestamp: true });

var EventEmitter = require('events').EventEmitter;

var rstart = function(url, command, timeVar) {
  var self = this;
  this.url = url;
  this.command = command;
  this.timeVar = timeVar;

  this.cron = new CronJob(timeVar, function() {
    w.info('Checking...');
    self.check();
  }, null, true, "America/Los_Angeles");

}

util.inherits(rstart, EventEmitter);

/**
 * Stop the cronjob
 */
rstart.prototype.stop = function() {
  this.cron.stop();
  w.info('Stopped!');
}

/**
 * Execute the check
 */
rstart.prototype.check = function(callback) {
  var self = this;
  w.info('Requesting > '+self.url);

  var response = function(error, response, body) {

    if (!error && (response.statusCode >= 200 && response.statusCode <= 300)) {
      w.info('Response OK > '+self.url);
      self.emit('response', 'OK');
    }else {
      w.warn('Response FAILED > '+self.url);
      w.warn('Executing "'+self.command+'"');
      child = exec(self.command, function (error, stdout, stderr) {
        w.info('Out: ' + stdout);
        self.emit('response', 'FAIL', stdout);
        if (error !== null) {
          w.warn('Exec error: ' + error);
        }
      });
    }
  }

  request(self.url, response);
}


module.exports = rstart;
