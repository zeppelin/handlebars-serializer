import Handlebars from 'handlebars';
import { equalAST } from "test/support/assertions";
import Transformer from "handlebars-serializer/transformer";

var transformer;

module('transformer', {
  setup: function() {
    Transformer.prototype.content = function(contentNode) {
      contentNode.string = contentNode.string.split('').reverse().join('');
      return contentNode;
    };

    transformer = new Transformer();
  },

  teardown: function() {
    delete Transformer.prototype.content;
  }
});

test('program node', function() {
  var ast = Handlebars.parse('foo');
  var result = transformer.accept(ast);

  equal(result.statements[0].string, 'oof');
});

test('block node', function() {
  var ast = Handlebars.parse('{{#block}}foo{{else}}bar{{/block}}');
  var result = transformer.accept(ast);
  var blockNode = result.statements[0];

  equal(blockNode.program.statements[0].string, 'oof');
  equal(blockNode.inverse.statements[0].string, 'rab');
});
