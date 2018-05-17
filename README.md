# `ping-lazymention`

[![Build Status](https://travis-ci.org/strugee/ping-lazymention.svg?branch=master)](https://travis-ci.org/strugee/ping-lazymention)
[![Coverage Status](https://coveralls.io/repos/github/strugee/ping-lazymention/badge.svg?branch=master)](https://coveralls.io/github/strugee/ping-lazymention?branch=master)
[![npm](https://img.shields.io/npm/v/ping-lazymention.svg)](https://npmjs.com/package/ping-lazymention)
[![Greenkeeper badge](https://badges.greenkeeper.io/strugee/ping-lazymention.svg)](https://greenkeeper.io/)

Ping a [lazymention](https://github.com/strugee/lazymention) server

Originally designed as a [gulp](https://gulpjs.com/) task, but is useful otherwise too.

## Installation

    npm install ping-lazymention

## Usage

The function exported by the module takes two arguments. The first is the full URL to a lazymention API endpoint. The second is the URL you want to submit for processing.

When you call the module, it will return a new function configured with the two URLs. This second function takes one parameter, a callback function that will be invoked when the lazymention server has been (un)successfully pinged. This second function is designed to be a gulp task but it's not really tied to gulp.

The module logs stuff to the console. This is nice if you're using gulp and probably annoying otherwise. I would take PRs to improve this situation, for example by adding an options object argument with a `quiet` option.

## Example

Example inside a `gulpfile.js`:

```js
var gulp = require('gulp');
var ping = require('ping-lazymention');

gulp.task('ping', ping('http://example.com:21507/jobs/submit', 'https://example.com/blog/'));
```

This example assumes that you have lazymention running on `example.com:21507`, and your blog that you want it to crawl is at `https://example.com/blog/`. Note that we've specified the full path to the API (i.e. `/jobs/submit`) in the first URL.

## License

LGPL 3.0+

## Author

AJ Jordan <alex@strugee.net>
