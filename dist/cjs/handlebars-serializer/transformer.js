var $__Object$defineProperty = Object.defineProperty;
var $__Object$create = Object.create;
var $__Object$getPrototypeOf = Object.getPrototypeOf;
"use strict";
var Visitor = require("./visitor")["default"];

var Transformer = function($__super) {
  "use strict";

  function Transformer() {
    var $__0 = $__Object$getPrototypeOf(Transformer.prototype);

    if ($__0 !== null)
      $__0.constructor.apply(this, arguments);
  }

  Transformer.__proto__ = ($__super !== null ? $__super : Function.prototype);
  Transformer.prototype = $__Object$create(($__super !== null ? $__super.prototype : null));

  $__Object$defineProperty(Transformer.prototype, "constructor", {
    value: Transformer
  });

  $__Object$defineProperty(Transformer.prototype, "program", {
    value: function(programNode) {
      var self = this;

      programNode.statements = programNode.statements.map(function(statement) {
        return self.accept(statement);
      });

      return programNode;
    },

    enumerable: false,
    writable: true
  });

  $__Object$defineProperty(Transformer.prototype, "block", {
    value: function(blockNode) {
      if (blockNode.program) { blockNode.program = this.accept(blockNode.program); }
      if (blockNode.inverse) { blockNode.inverse = this.accept(blockNode.inverse); }

      return blockNode;
    },

    enumerable: false,
    writable: true
  });

  return Transformer;
}(Visitor);

exports["default"] = Transformer;