define("handlebars-serializer",
  ["./handlebars-serializer/visitor","./handlebars-serializer/serializer","./handlebars-serializer/transformer","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    "use strict";
    var Visitor = __dependency1__["default"];
    var Serializer = __dependency2__["default"];
    var Transformer = __dependency3__["default"];

    function serialize(ast) {
      var serializer = new Serializer();
      var result = serializer.accept(ast);

      return result;
    }

    __exports__.serialize = serialize;__exports__.Visitor = Visitor;
    __exports__.Serializer = Serializer;
    __exports__.Transformer = Transformer;
  });
var $__Object$defineProperty = Object.defineProperty;
var $__Object$create = Object.create;
var $__Object$getPrototypeOf = Object.getPrototypeOf;

define("handlebars-serializer/serializer",
  ["./visitor","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Visitor = __dependency1__["default"];

    __exports__["default"] = function($__super) {
      "use strict";

      function Serializer() {
        var $__0 = $__Object$getPrototypeOf(Serializer.prototype);

        if ($__0 !== null)
          $__0.constructor.apply(this, arguments);
      }

      Serializer.__proto__ = ($__super !== null ? $__super : Function.prototype);
      Serializer.prototype = $__Object$create(($__super !== null ? $__super.prototype : null));

      $__Object$defineProperty(Serializer.prototype, "constructor", {
        value: Serializer
      });

      $__Object$defineProperty(Serializer.prototype, "program", {
        value: function(programNode) {
          var out = '';
          var self = this;

          (programNode.statements || []).forEach(function(statement) {
            out += self.accept(statement);
          });

          return out;
        },

        enumerable: false,
        writable: true
      });

      $__Object$defineProperty(Serializer.prototype, "block", {
        value: function(blockNode) {
          var out = this.accept(blockNode.mustache, {
            openingTag: true
          });

          if (blockNode.program) {
            out += this.accept(blockNode.program);
          }

          if (blockNode.inverse) {
            var inverse = this.accept(blockNode.inverse);
            out += "{{^}}" + inverse + "";
          }

          return "" + out + "{{/" + this.accept(blockNode.mustache.id) + "}}";
        },

        enumerable: false,
        writable: true
      });

      $__Object$defineProperty(Serializer.prototype, "mustache", {
        value: function(mustacheNode, options) {
          var paramStrings = '';
          var self = this;

          (mustacheNode.params || []).forEach(function(param) {
            paramStrings += " " + self.accept(param) + "";
          });

          var hash = mustacheNode.hash ? this.accept(mustacheNode.hash) : '';
          var hashmarkOrEmptyString = options.openingTag ? '#' : '';
          var out = "{{" + hashmarkOrEmptyString + "";

          out += this.accept(mustacheNode.id) + paramStrings + hash;
          out += '}}';

          if (mustacheNode.escaped) {
            return out;
          }

          return "{" + out + "}";
        },

        enumerable: false,
        writable: true
      });

      $__Object$defineProperty(Serializer.prototype, "partial", {
        value: function(partialNode) {
          var content = this.accept(partialNode.partialName);

          if (partialNode.context) {
            var context = partialNode.context;
            var acceptedContext = this.accept(context);

            content += " " + acceptedContext + "";
          }

          return "{{>" + content + "}}";
        },

        enumerable: false,
        writable: true
      });

      $__Object$defineProperty(Serializer.prototype, "hash", {
        value: function(hashNode) {
          var out = '';

          var self = this;
          (hashNode.pairs || []).forEach(function(pair) {
            out += ' ' + pair[0] + '=' + self.accept(pair[1]);
          });

          return out;
        },

        enumerable: false,
        writable: true
      });

      $__Object$defineProperty(Serializer.prototype, "STRING", {
        value: function(string) {
          return "\"" + string.string + "\"";
        },

        enumerable: false,
        writable: true
      });

      $__Object$defineProperty(Serializer.prototype, "INTEGER", {
        value: function(integer) {
          return integer.integer;
        },

        enumerable: false,
        writable: true
      });

      $__Object$defineProperty(Serializer.prototype, "BOOLEAN", {
        value: function(boolean) {
          return boolean.bool;
        },

        enumerable: false,
        writable: true
      });

      $__Object$defineProperty(Serializer.prototype, "PARTIAL_NAME", {
        value: function(partialName) {
          return partialName.name;
        },

        enumerable: false,
        writable: true
      });

      $__Object$defineProperty(Serializer.prototype, "ID", {
        value: function(id) {
          return id.string;
        },

        enumerable: false,
        writable: true
      });

      $__Object$defineProperty(Serializer.prototype, "DATA", {
        value: function(data) {
          var id = this.accept(data.id);
          return "@" + id + "";
        },

        enumerable: false,
        writable: true
      });

      $__Object$defineProperty(Serializer.prototype, "content", {
        value: function(contentNode) {
          return contentNode.string;
        },

        enumerable: false,
        writable: true
      });

      $__Object$defineProperty(Serializer.prototype, "comment", {
        value: function(commentNode) {
          return "{{!--" + commentNode.comment + "--}}";
        },

        enumerable: false,
        writable: true
      });

      return Serializer;
    }(Visitor)
  });
var $__Object$defineProperty = Object.defineProperty;
var $__Object$create = Object.create;
var $__Object$getPrototypeOf = Object.getPrototypeOf;

define("handlebars-serializer/transformer",
  ["./visitor","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Visitor = __dependency1__["default"];

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

    __exports__["default"] = Transformer;
  });
var $__Object$defineProperty = Object.defineProperty;

define("handlebars-serializer/visitor",
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = function() {
      "use strict";
      function Visitor() {}

      $__Object$defineProperty(Visitor.prototype, "accept", {
        value: function(object) {
          var options = (arguments[1] !== void 0 ? arguments[1] : {});
          var handler = this[object.type];

          if (handler) {
            return handler.call(this, object, options);
          }

          return object;
        },

        enumerable: false,
        writable: true
      });

      return Visitor;
    }()
  });