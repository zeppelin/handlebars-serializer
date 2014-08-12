"use strict";
var Visitor = require("./handlebars-serializer/visitor")["default"];
var Serializer = require("./handlebars-serializer/serializer")["default"];
var Transformer = require("./handlebars-serializer/transformer")["default"];

function serialize(ast) {
  var serializer = new Serializer();
  var result = serializer.accept(ast);

  return result;
}

exports.serialize = serialize;exports.Visitor = Visitor;
exports.Serializer = Serializer;
exports.Transformer = Transformer;