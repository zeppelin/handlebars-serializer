export default class Visitor {

  /**
    Tries to call the method name found on `object.type`.

    @method accept
    @param {Object} object
    @param {Object} options
  */
  accept(object, options = {}) {
    var handler = this[object.type];

    if (handler) {
      return handler.call(this, object, options);
    }

    return object;
  }
}
