import Serializer from 'handlebars-serializer/serializer';

export function serialize(ast) {
  var serializer = new Serializer();
  var result = serializer.accept(ast);

  return result;
}
