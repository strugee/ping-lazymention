/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

var http = require('http'),
    https = require('https'),
    url = require('url'),
    log = require('fancy-log');

module.exports = function makePingTask(server, job_url) {
	return function pingLazymention(cb) {
		var obj = url.parse(server);
		obj.method = 'POST';

		var req = http.request(obj);
		req.setHeader('Content-Type', 'application/json');
		req.write(JSON.stringify({ url: job_url }));
		req.end();

		req.on('error', function(err) {
			log.error('Encountered an error pinging lazymention:', err.toString());
			cb(err);
		});

		req.on('response', function(res) {
			if (res.statusCode >= 200 && res.statusCode <= 300) {
				log('Received', res.statusCode, res.statusMessage, 'from lazymention.');
				cb();
			} else {
				// XXX attach the body
				var err = new Error('Got an unexpected status code ' + res.statusCode + ' ' + res.statusMessage + ' from lazymention.');
				log.error(err.toString());
				cb(err);
			}
		});
	};
};
