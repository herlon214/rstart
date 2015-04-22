# rstart
A NodeJS health-checker


What does it do?
----------------
rStart check if a url is available in a period that you define. If the http response code isn't 200 it exec a bash command, something like restart the nodejs server, whatever.


Example
-------
    var rstart = require('rstart');
    var checker = new rstart("http://127.0.0.1:31000/", "ls", "* * * * * *");
    // \/ if you don't want wait to check use \/
    // checker.check();

    // receive the response
    checker.on('response', function(response, stdout) {
      // do anything with the response and stdout
      // response -> it could be 'OK' or 'FAIL'
      // stdout -> string with the response of the command executed
    });


### Constructor explained
    var checker = new rstart("http://127.0.0.1:31000/", "ls", "* * * * * *");
    

Arguments in order:
* Url to be checked (ex: http://127.0.0.1:31000/)
* Command to be executed (ex: ls)
* Cronjob time command (see also [cron](https://www.npmjs.com/package/cron))
