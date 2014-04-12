'use strict';

var route = require('koa-route'),
  parseBody = require('co-body'),
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

function dataUrlToBuffer(url) {
  if (typeof url !== "string") {
    throw new TypeError("Expected url to be a string, got " + typeof url);
  }
  var regex = /^data:(.*?\/.*?);base64,(.*)$/;

  var matches = url.match(regex);
  if (!matches) {
    throw new Error("Unexpected data in url: " + url.substring(0, 1000));
  }
  var contentType = matches[1];
  var data = matches[2];
  return {
    type: contentType,
    buffer: new Buffer(data, 'base64')
  };
}

function contentTypeToExtension(type) {
  switch (type) {
  case "image/jpeg":
    return '.jpg';
  case "image/png":
    return '.png';
  default:
    return '.' + (/^.*?\/(.*)/.match(type)[1]);
  }
}

function * uploadPhoto(next) {
  var body = yield parseBody(this.request, {
    limit: '1000kb'
  });
  var image = body.image;
  var tmpDir = path.join(os.tmpdir(), "postr");
  var filepath = null;
  if (image) {
    var data = dataUrlToBuffer(image);
    filepath = path.join(tmpDir, random.uuid4() + contentTypeToExtension(data.type));
    yield fs.writeFile(filepath, data.buffer);
  } else {
    var parts = parse(this, {
      autoFields: true
    });

    try {
      yield fs.mkdir(tmpDir);
    } catch (e) {
      if (e.code !== "EEXIST") {
        throw e;
      }
    }
    var count;
    var part;
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
  }

  this.body = yield parseOcrData(filepath);
}

function cleanupText(text) {
  return text.replace(/[^\w\d'"!\.,:\?#\$%&\-]+/g, " ").trim();
}

function * parseOcrData(filepath) {
  return {
    text: cleanupText(yield nodecr.process(filepath, 'eng', 1, null, nodecr.preprocessors.convert, [{
      '-resize': '1000%'
    }]))
  }
}