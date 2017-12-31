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
    http = require('http');

vows.describe('ping-webmention test').addBatch({
	'When we require the module': {
		topic: function() {
			return require('./index');
		},
		'it works': function(err) {
			assert.ifError(err);
		},
		'it\'s a function': function(err, mod) {
			assert.isFunction(mod);
		}
	}
}).export(module);
