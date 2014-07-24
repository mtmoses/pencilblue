/*
    Copyright (C) 2014  PencilBlue, LLC

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

//dependencies
var JobRunner = require('./job_runner.js');

/**
 *
 * @class AsyncJobRunner
 * @constructor
 */
function AsyncJobRunner() {}

//ineritance
util.inherits(AsyncJobRunner, JobRunner);

AsyncJobRunner.prototype.parallelLimit = 1;

AsyncJobRunner.prototype.setParallelLimit = function(max) {
   this.parallelLimit = max;
};

AsyncJobRunner.prototype.run = function(cb) {
    var self = this;

    var d = domain.create();
    d.on('error', function(err) {console.log('here in error handler');
        self.processResults(err, null, cb);
    });
    d.run(function() {

        self.getTasks(function(err, tasks){
            if (util.isError(err)) {
                throw err;
            }

            self.onBeforeFirstTask(function(err) {
                if (util.isError(err)) {
                    throw err;
                }

                if (self.parallelLimit <= 1) {
                    async.series(tasks, function(err, results) {
                        self.processResults(err, results, cb);
                    });
                }
                else {
                    async.parallelLimit(tasks, self.parallelLimit, function(err, results) {
                        self.processResults(err, results, cb);
                    });
                }
            });
        });
    });
};

AsyncJobRunner.prototype.getTasks = function() {
    throw new Error('The getTasks function must be overriden by an extending prototype');
};

AsyncJobRunner.prototype.processResults = function(err, results, cb) {
    cb(err, results);
};

AsyncJobRunner.prototype.onBeforeFirstTask = function(cb) {
    cb(null);
};

//exports
module.exports = AsyncJobRunner;
