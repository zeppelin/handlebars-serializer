import Visitor from './visitor';

class Transformer extends Visitor {

  program(programNode) {
    var self = this;

    programNode.statements = programNode.statements.map(function(statement) {
      return self.accept(statement);
    });

    return programNode;
  }

  block(blockNode) {
    if (blockNode.program) { blockNode.program = this.accept(blockNode.program); }
    if (blockNode.inverse) { blockNode.inverse = this.accept(blockNode.inverse); }

    return blockNode;
  }
}

export default Transformer;
