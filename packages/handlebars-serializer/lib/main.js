import Visitor from './handlebars-serializer/visitor';
import Serializer from './handlebars-serializer/serializer';
import Transformer from './handlebars-serializer/transformer';

export function serialize(ast) {
  var serializer = new Serializer();
  var result = serializer.accept(ast);

  return result;
}

export {
  Visitor,
  Serializer,
  Transformer
};
