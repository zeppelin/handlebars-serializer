define("handlebars-serializer-jshint/lib",
  [],
  function() {
    "use strict";
    module('JSHint - handlebars-serializer');
    test('handlebars-serializer/serializer.js should pass jshint', function() { 
      ok(true, 'handlebars-serializer/serializer.js should pass jshint.'); 
    });


    module('JSHint - handlebars-serializer');
    test('handlebars-serializer/transformer.js should pass jshint', function() { 
      ok(true, 'handlebars-serializer/transformer.js should pass jshint.'); 
    });


    module('JSHint - handlebars-serializer');
    test('handlebars-serializer/visitor.js should pass jshint', function() { 
      ok(true, 'handlebars-serializer/visitor.js should pass jshint.'); 
    });


    module('JSHint - .');
    test('handlebars-serializer.js should pass jshint', function() { 
      ok(true, 'handlebars-serializer.js should pass jshint.'); 
    });
  });
define("handlebars-serializer-jshint/tests",
  [],
  function() {
    "use strict";
    module('JSHint - handlebars-serializer-tests');
    test('handlebars-serializer-tests/main-test.js should pass jshint', function() { 
      ok(true, 'handlebars-serializer-tests/main-test.js should pass jshint.'); 
    });


    module('JSHint - handlebars-serializer-tests');
    test('handlebars-serializer-tests/serializer-test.js should pass jshint', function() { 
      ok(true, 'handlebars-serializer-tests/serializer-test.js should pass jshint.'); 
    });


    module('JSHint - handlebars-serializer-tests');
    test('handlebars-serializer-tests/transformer-test.js should pass jshint', function() { 
      ok(true, 'handlebars-serializer-tests/transformer-test.js should pass jshint.'); 
    });
  });
define("handlebars-serializer-tests/main-test",
  ["handlebars-serializer"],
  function(__dependency1__) {
    "use strict";
    var serialize = __dependency1__.serialize;

    module('handlebars-serializer');

    test('serialize()', function() {
      ok(serialize);
    });
  });
define("handlebars-serializer-tests/serializer-test",
  ["handlebars","test/support/assertions"],
  function(__dependency1__, __dependency2__) {
    "use strict";
    var Handlebars = __dependency1__["default"];
    var equalHBS = __dependency2__.equalHBS;

    module('serializer');

    // Content

    test('content', function() {
      equalHBS('foo');
    });


    // Partial

    test('partial', function() {
      equalHBS('{{>hbs}}');
    });

    test('partial with content', function() {
      equalHBS('{{>foo bar}}');
    });

    test('partial with complex name', function() {
      equalHBS('{{>foo.bar}}');
    });


    // Mustache

    test('simple mustaches', function() {
      equalHBS('{{foo}}');
    });

    test('unescaped mustaches', function() {
      equalHBS('{{{foo}}}');
    });

    test('simple mustaches with data', function() {
      equalHBS('{{@foo}}');
    });

    test('mustaches with parameters', function() {
      equalHBS('{{foo bar}}');
    });

    test('mustaches with string parameters', function() {
      equalHBS('{{foo "bar"}}');
    });

    test('mustaches with NUMBER parameters', function() {
      equalHBS('{{foo 1}}');
    });

    test('mustaches with BOOLEAN parameters', function() {
      equalHBS('{{foo true}}');
      equalHBS('{{foo false}}');
    });

    test('mustaches with DATA parameters', function() {
      equalHBS('{{foo @bar}}');
    });

    test('mustaches with multiple parameters', function() {
      equalHBS('{{foo bar.baz baar}}');
    });

    test('mustaches with hash arguments', function() {
      equalHBS('{{foo bar=baz}}');
    });

    test('mustaches with multiple hash arguments', function() {
      equalHBS('{{foo bar=baz baar=baaz}}');
    });

    test('mustaches with hash arguments with string values', function() {
      equalHBS('{{foo bar="baz"}}');
    });

    test('mustaches with multiple hash arguments with string values', function() {
      equalHBS('{{foo bar="baz" baar="baaz"}}');
    });

    test('mustaches with hash arguments with number values', function() {
      equalHBS('{{foo bar=1}}');
    });

    test('mustaches with hash arguments with boolean values', function() {
      equalHBS('{{foo bar=true}}');
      equalHBS('{{foo bar=false}}');
    });

    test('mustaches with hash arguments with data values', function() {
      equalHBS('{{foo bar=@baz}}');
    });

    test('mustaches with multiple hash arguments with values of mixed types', function() {
      equalHBS('{{foo bar=baz baar="baaz"}}');
    });


    // Comments

    test('comment', function() {
      equalHBS('{{!-- this is a comment --}}');
    });

    test('multi-line comment', function() {
      equalHBS('{{!--\nthis is a multi-line comment\n--}}');
    });


    // Blocks

    test('empty blocks', function() {
      equalHBS('{{#foo bar}}{{/foo}}');
    });

    test('block with content', function() {
      equalHBS('{{#foo}} bar {{/foo}}');
    });


    // Inverse sections

    test('inverse section', function() {
      equalHBS('{{#foo}} bar {{^}} baz {{/foo}}');
    });
  });
define("handlebars-serializer-tests/transformer-test",
  ["handlebars","test/support/assertions","handlebars-serializer/transformer"],
  function(__dependency1__, __dependency2__, __dependency3__) {
    "use strict";
    var Handlebars = __dependency1__["default"];
    var equalAST = __dependency2__.equalAST;
    var Transformer = __dependency3__["default"];

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
  });
define("test/support/assertions",
  ["handlebars","handlebars-serializer","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Handlebars = __dependency1__["default"];
    var serialize = __dependency2__.serialize;

    function equalHBS(string) {
      var ast = Handlebars.parse(string);
      var result = serialize(ast);

      QUnit.push(result === string, result, string);
    }

    __exports__.equalHBS = equalHBS;
  });