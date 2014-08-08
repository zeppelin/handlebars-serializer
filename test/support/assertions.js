import Handlebars from 'handlebars';
import { serialize } from 'handlebars-serializer';

export function equalHBS(string) {
  var ast = Handlebars.parse(string);
  var result = serialize(ast);

  QUnit.push(result === string, result, string);
}
