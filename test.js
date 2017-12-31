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

var vows = require('perjury'),
    assert = vows.assert,
    http = require('http'),
    qs = require('querystring');

vows.describe('ping-webmention test').addBatch({
	'When we set up a test server': {
		topic: function() {
			var cb = this.callback,
			    server = http.createServer(function(req, res) {
				    var components = req.url.split('?'),
				        query = qs.parse(components[1]);

				    switch (components[0]) {
				    case '/generate_status':
					    res.statusCode = query.code;
					    res.end();
					    break;
				    default:
					    res.statusCode = 404;
					    res.end();
				    }
			    });

			server.listen(6471, function(err) {
				cb(err, server);
			});
		},
		teardown: function(server) {
			server.close(this.callback);
		},
		'it works': function(err, server) {
			assert.ifError(err);
			assert.isObject(server);
		},
		'and we require the module': {
			topic: function() {
				return require('./index');
			},
			'it works': function(err) {
				assert.ifError(err);
			},
			'it\'s a function': function(err, makePing) {
				assert.isFunction(makePing);
			},
			'and we instantiate a task': {
				topic: function(makePing) {
					return makePing('http://localhost:6471/generate_status?code=202', 'http://example.net/blog/');
				},
				'it works': function(err) {
					assert.ifError(err);
				},
				'we get back a function': function(err, makePing) {
					assert.isFunction(makePing);
				},
				'and we call the task': {
					topic: function(ping) {
						ping(this.callback);
					},
					'it works': function(err) {
						assert.ifError(err);
					}
					// XXX assert on log messages here
				}
			},
			'and we instantiate a task doomed to ECONNREFUSED': {
				topic: function(makePing) {
					return makePing('http://localhost:10/', 'http://example.net/blog/');
				},
				'it works': function(err) {
					assert.ifError(err);
				},
				'we get back a function': function(err, makePing) {
					assert.isFunction(makePing);
				},
				'and we call the task': {
					topic: function(ping) {
						var cb = this.callback;
						ping(function(err) {
							err ? cb(undefined, err) : cb(new Error('unexpected success'));
						});
					},
					'it works': function(err) {
						assert.ifError(err);
					},
					'the error message is what we expected': function(err, expected) {
						assert.isTrue(expected.message.includes('ECONNREFUSED'));
					}
					// XXX assert on log messages here
				}
			},
			'and we instantiate a task which will get rejected as 403 Forbidden': {
				topic: function(makePing) {
					return makePing('http://localhost:6471/generate_status?code=403', 'http://example.net/blog/');
				},
				'it works': function(err) {
					assert.ifError(err);
				},
				'we get back a function': function(err, makePing) {
					assert.isFunction(makePing);
				},
				'and we call the task': {
					topic: function(ping) {
						var cb = this.callback;
						ping(function(err) {
							err ? cb(undefined, err) : cb(new Error('unexpected success'));
						});
					},
					'it works': function(err) {
						assert.ifError(err);
					},
					'the error message is what we expected': function(err, expected) {
						assert.isTrue(expected.message.includes('403 Forbidden'));
					}
					// XXX assert on log messages here
				}
			}
		}
	}
}).export(module);
