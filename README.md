# Handlebars Serializer [![Build Status](https://travis-ci.org/zeppelin/handlebars-serializer.png)](https://travis-ci.org/zeppelin/handlebars-serializer)

Serialize Handlebars AST into template string.

Useful when you want to parse a Handlebars template into an Abstract Syntax Tree (AST), add/remove/modify nodes, then it serialize back to Handlebars template.

Also includes a `Transformer` that could be used as a base class for performing such transformations. The following example uses [marked](https://github.com/chjj/marked) to compile all text content into Markdown:

```js
// markdown-transformer.js
import Transformer from 'handlebars-serializer/transformer';

export default class MarkdownTransformer extends Transformer {
  content(content) {
    var string = content.string;

    // Don't parse whitespace
    if (!string.match(/[^\s]/g)) {
      return content;
    }

    content.string = marked(string);

    return content;
  }
}
```

```js
// app.js
import Handlebars from 'handlebars';
import MarkdownTransformer from './markdown-transformer';

var template = '{{#if shouldSayHello}} Hello **World** {{/if}}';
var ast = Handlebars.parse(template);
var mdTemplate = new MarkdownTransformer().accept(ast);

console.log(mdTemplate); // {{#if shouldSayHello}} Hello <strong>World</strong> {{/if}}
```

## License

Copyright (c) 2014 Gabor Babicz ([MIT](LICENSE) License)
