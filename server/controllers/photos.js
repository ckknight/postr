'use strict';

var route = require('koa-route'),
  parse = require('co-busboy'),
  fs = require('co-fs'),
  saveTo = require('save-to'),
  Random = require('random-js'),
  random = new Random(Random.engines.nativeMath),
  path = require('path'),
  os = require('os'),
  nodecr = require('../config/co-nodecr');

exports.init = function (app) {
  app.use(route.post('/api/upload-photo', uploadPhoto));
};

function * uploadPhoto(next) {
  var parts = parse(this, {
    autoFields: true
  });

  var tmpDir = path.join(os.tmpdir(), "postr");
  try {
    yield fs.mkdir(tmpDir);
  } catch (e) {
    if (e.code !== "EEXIST") {
      throw e;
    }
  }
  var count;
  var part;
  var filepath = null;
  for (count = 0; part = yield parts; ++count) {
    if (count > 1) {
      throw new Error("Only expected one file uploaded");
    }
    filepath = path.join(tmpDir, random.uuid4() + path.extname(part.filename));
    yield saveTo(part, filepath);
  }
  if (!filepath) {
    throw new Error("Expected at least one file to be uploaded");
  }

  this.body = {
    text: yield nodecr.process(filepath, 'eng', 1)
  };
}