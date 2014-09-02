var $__Object$defineProperty = Object.defineProperty;
"use strict";

exports["default"] = function() {
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
}();