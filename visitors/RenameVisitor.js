const lodash = require('lodash');

const toCurrentName = ({name}) => {
  return name;
};

const getRename = ({renamed}, {name}) => {
  const {dst} = renamed.find(({src})=>src===name) || {};
  return dst;
};

const updateIdentifier = identifier => newName => {
  identifier.name = newName;
};

const updateFunctionLiteral = identifier => newValue => {
  identifier.raw = `"${newValue}"`;
  identifier.value = `"${newValue}"`;
};

const toNewName = ({renames=[]}) => ({name}) => {
  const {src, dst} = renames.find(({src})=>src===name) || {};

  return dst && dst != src && dst;
};

const toNewValue = ({renames = []}) => ({value}) => {
  const name = typeof(value) === 'string' ? value.replace(/\"/g, '') : value;
  const { src, dst } = renames.find(({src}) => src === name) || {};

  return dst && dst !== src && dst;
};

class RenameVisitor {
  constructor() {
  }
  AdditionExpression(path, state) {
  }
  Arguments(path, state) {
  }
  ArrayElement(path, state) {
  }
  ArrayExpression(path, state) {
  }
  AssignmentExpression(path, state) {
  }
  BlockStatement(path, state) {
  }
  CallExpression({node: {callee}}, state) {
  }
  Comment(path, state) {
    return false;
  }
  DotMemberExpression(path, state) {
    return false;
  }
  ElseStatement(path, state) {
  }
  ElseIfStatement(path, state) {
  }
  EmptyStatement(path, state) {
  }
  FunctionDeclaration(path, state) {
  }
  FunctionExpression(path, state) {
  }
  Identifier(path, state) {
    const {node} = path;
    const dst = toNewName(state)(node);
    if (dst) {
      updateIdentifier(node)(dst);
    }
  }
  IfStatement(path, state) {
  }
  Literal(path, state) {
    const { node } = path;
    const dst = toNewValue(state)(node)
    if (dst) {
      updateFunctionLiteral(node)(dst)
    }
  }
  LogicExpression(path, state) {
  }
  MemberExpression({get}, state) {
  }
  ObjectExpression(path, state) {
  }
  Parameter(path, state) {
  }
  ParameterList(path, state) {
  }
  ParenthesisExpression(path, state) {
  }
  PrintStatement(path, state) {
  }
  Program(path, state) {
  }
  Property(path, state) {
    const {get} = path;
    //For now we aren't going to let it traverse the keys during our basic rename
    get('value').traverse(this, state);
    return false;
  }
  RelationExpression(path, state) {
  }
  ReturnStatement(path, state) {
  }
  SubDeclaration({node: {id}}, state) {
  }
  SubDeclarationPost(path, state) {
  }
  TypeAnnotation(path, state) {
  }
  UnaryExpression(path, state) {
  }
  UnTypedIdentifier(path, state) {
    const {node} = path;
    const dst = toNewName(state)(node);
    if (dst) {
      updateIdentifier(node)(dst);
    }
  }
}
exports.RenameVisitor = RenameVisitor;
