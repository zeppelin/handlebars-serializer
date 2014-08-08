import Visitor from './visitor';

export default class Serializer extends Visitor {

  /**
    Serializes a `Handlebars.AST.ProgramNode`

    @method program
    @param {Handlebars.AST.ProgramNode} program
    @return {String} The serialized string
  */
  program(programNode) {
    var out = '';
    var self = this;

    (programNode.statements || []).forEach(function(statement) {
      out += self.accept(statement);
    });

    return out;
  }

  /**
    Serializes a `Handlebars.AST.BlockNode`

    @method block
    @param {Handlebars.AST.BlockNode} block
    @return {String} The serialized string
  */
  block(blockNode) {
    var out = this.accept(blockNode.mustache, {
      openingTag: true
    });

    if (blockNode.program) {
      out += this.accept(blockNode.program);
    }

    if (blockNode.inverse) {
      var inverse = this.accept(blockNode.inverse);
      out += `{{^}}${inverse}`;
    }

    return `${out}{{/${this.accept(blockNode.mustache.id)}}}`;
  }

  /**
    Serializes a `Handlebars.AST.MustacheNode`.
    Pass `{openingTag: true}` option to get an opening tag for a block

    @method mustache
    @param {Handlebars.AST.MustacheNode} mustache
    @param {Object} options
    @return {String} The serialized string
  */
  mustache(mustacheNode, options) {
    var paramStrings = '';
    var self = this;

    (mustacheNode.params || []).forEach(function(param) {
      paramStrings += ` ${self.accept(param)}`;
    });

    var hash = mustacheNode.hash ? this.accept(mustacheNode.hash) : '';
    var hashmarkOrEmptyString = options.openingTag ? '#' : '';
    var out = `{{${hashmarkOrEmptyString}`;

    out += this.accept(mustacheNode.id) + paramStrings + hash;
    out += '}}';

    if (mustacheNode.escaped) {
      return out;
    }

    return `{${out}}`;
  }

  /**
    Serializes a `Handlebars.AST.PartialNode`

    @method partial
    @param {Handlebars.AST.PartialNode} partial
    @return {String} The serialized string
  */
  partial(partialNode) {
    var content = this.accept(partialNode.partialName);

    if (partialNode.context) {
      var context = partialNode.context;
      var acceptedContext = this.accept(context);

      content += ` ${acceptedContext}`;
    }

    return `{{>${content}}}`;
  }

  /**
    Serializes a `Handlebars.AST.HashNode`

    @method hash
    @param {Handlebars.AST.HashNode} hash
    @return {String} The serialized string
  */
  hash(hashNode) {
    var out = '';

    var self = this;
    (hashNode.pairs || []).forEach(function(pair) {
      out += ' ' + pair[0] + '=' + self.accept(pair[1]);
    });

    return out;
  }

  /**
    Serializes a `Handlebars.AST.StringNode`

    @method STRING
    @param {Handlebars.AST.StringNode} string
    @return {String} The serialized string
  */
  STRING(string) {
    return `"${string.string}"`;
  }

  /**
    Serializes a `Handlebars.AST.IntegerNode`

    @method INTEGER
    @param {Handlebars.AST.IntegerNode} integer
    @return {String} The serialized string
  */
  INTEGER(integer) {
    return integer.integer;
  }

  /**
    Serializes a `Handlebars.AST.BooleanNode`

    @method BOOLEAN
    @param {Handlebars.AST.BooleanNode} bool
    @return {String} The serialized string
  */
  BOOLEAN(boolean) {
    return boolean.bool;
  }

  /**
    Serializes a `Handlebars.AST.PartialNameNode`

    @method PARTIAL_NAME
    @param {Handlebars.AST.PartialNameNode} partialName
    @return {String} The serialized string
  */
  PARTIAL_NAME(partialName) {
    return partialName.name;
  }

  /**
    Serializes a `Handlebars.AST.IdNode`

    @method ID
    @param {Handlebars.AST.IdNode} id
    @return {String} The serialized string
  */
  ID(id) {
    return id.string;
  }

  /**
    Serializes a `Handlebars.AST.DataNode`

    @method DATA
    @param {Handlebars.AST.BlockNode} data
    @return {String} The serialized string
  */
  DATA(data) {
    var id = this.accept(data.id);
    return `@${id}`;
  }

  /**
    Serializes a `Handlebars.AST.ContentNode`

    @method content
    @param {Handlebars.AST.ContentNode} content
    @return {String} The serialized string
  */
  content(contentNode) {
    return contentNode.string;
  }

  /**
    Serializes a `Handlebars.AST.CommentNode`

    @method comment
    @param {Handlebars.AST.BlockNode} comment
    @return {String} The serialized string
  */
  comment(commentNode) {
    return `{{!--${commentNode.comment}--}}`;
  }
}
