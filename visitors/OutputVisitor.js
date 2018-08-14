const _ = require('lodash');

const unbufferedTokens = {
  '.': true,
  ':': true,
  '?': true,
  '(': true,
  ')': true,
  '{': true,
  '}': true,
  '[': true,
  ']': true,
  '+': true,
  '=': true,
  '^': true,
  '>': true,
  '<': true,
  '-': true,
  '/': true,
  '\\': true,
  '*': true,
  '\n': true,
  ' ': true,
  '\'': true
};

const addWithBuffer = (syntax, value) => {
  if (!value || !value.slice) debugger;
  const lastValIsUnBuffered = syntax.length == 0 || unbufferedTokens[syntax.slice(-1)];
  const firstValIsUnbuffered = unbufferedTokens[value.slice(0,1)];

  const buffer = firstValIsUnbuffered || lastValIsUnBuffered ? '' : ' ';

  return syntax + (buffer + value);
};

const toCondensed = (acc, v)=>{
  const [
    last = ''
  ] = acc.slice(-1) || [];
  const lastElementEndsinCR = last.slice(-1) === '\n';
  return lastElementEndsinCR && v==='\n' ? acc : [...acc, v];
};

const addToSyntax = (state, ...values) => {
  const combinedVal = (values.filter(x=>x)
                          .reduce(toCondensed, [])
                          .reduce(addWithBuffer, '') || '');

  if (combinedVal)
    state.syntax = addWithBuffer(state.syntax, combinedVal);
};

const toSyntaxPluck = ({syntax})=>syntax;
const withDelimiter = delimiter => value => Array.isArray(value) ? value.join(delimiter) : value;
const withNothing = withDelimiter('');
const withNewLine = withDelimiter('\n');
const withComma = withDelimiter(',');
const withSemiColon = withDelimiter(';');

const toSyntax = (path, visitor) => path.traverse(visitor).map(toSyntaxPluck);

const flatZip = (...elements) => {
  const arrays = elements.map(e=>Array.isArray(e) ? e : [e]);
  return _.flatten(_.zip(...arrays));
};

const toOperatorExpression = ({get}, state, visitor) => {
  const left = toSyntax(get('left'), visitor);
  const right = toSyntax(get('right'), visitor);
  const operator = toSyntax(get('operator'), visitor);

  const rest = flatZip(operator, right);
  addToSyntax(state, left, ...rest);

  return false;
};

const toSubFuncDefinition = type => ({get}, state, visitor)=>{
  const id = toSyntax(get('id'), visitor);
  const params = toSyntax(get('params'), visitor);
  const body = toSyntax(get('body'), visitor);
  const returnType = toSyntax(get('ReturnType'), visitor);
  addToSyntax(state, type, id, params, returnType, body, `end ${type}`);
  return false;
};

class OutputVisitor {
  constructor() {
  }
  AdditionExpression(path, state) {
    return toOperatorExpression(path, state, this);
  }
  AND(path, state) {
    addToSyntax(state, ' and');
  }
  Arguments({get}, state) {
    const propertiesSyntax = toSyntax(get('param'), this);
    addToSyntax(state, '(', withComma(propertiesSyntax), ')');
    return false;
  }
  ArrayElement(path, state) {
    const element = toSyntax(path.get('value'), this);
    addToSyntax(state, element);
    return false;
  }
  ArrayExpression({get}, state) {
    const elements = toSyntax(get('elements'), this);
    addToSyntax(state, '[', elements, ']');
    return false;
  }
  AssignmentExpression(path, state) {
    return toOperatorExpression(path, state, this);
  }
  BACK_SLASH(path, state) {
    addToSyntax(state, '\\');
  }
  BlockStatement({get}, state) {
    const body = toSyntax(get('body'), this);
    addToSyntax(state, '\n', withNothing(body), '\n');
    return false;
  }
  CallExpression({get}, state) {
    const callee = toSyntax(get('callee'), this);
    const args = toSyntax(get('args'), this);

    addToSyntax(state, callee, args);
    return false;
  }
  Comment(path, state) {
    const {node: {value}} = path;
    addToSyntax(state, "'", value, "\n");
    return false;
  }
  DECREMENT(path, state) {
    addToSyntax(state, '--');
  }
  DimStatement(path, state) {
    addToSyntax(state, 'dim');
  }
  DotMemberExpression(path, state) {
  }
  ElseStatement(path, state) {
    addToSyntax(state, 'else ');
  }
  ElseIfStatement({get}, state) {
    const test = toSyntax(get('test'), this);
    const body = toSyntax(get('body'), this);
    //NOTE: Brightscript documentation states that "then" is an optional keyword for
    //      IF, ELSEIF, THEN, ENDIF block
    addToSyntax(state, 'else if', test, body);
    return false;
  }
  END(path, state) {
    addToSyntax(state, 'end');
  }
  EQUAL({node: {value}}, state) {
    addToSyntax(state, '=');
  }
  EXIT_FOR(path, state) {
    addToSyntax(state, 'exit for')
  }
  EXIT_WHILE(path, state) {
    addToSyntax(state, 'exit while');
  }
  EmptyStatement(path, state) {
    addToSyntax(state, '\n');
  }
  ForEachStatement(path, state) {
    const {get} = path;
    const counter = toSyntax(get('counter'), this);
    const countExpression = toSyntax(get('countExpression'), this);
    const body = toSyntax(get('body'), this);
    addToSyntax(state, 'for each', counter, 'in ', countExpression, body, 'end for');
    return false;
  }
  ForStatement(path, state) {
    const {get} = path;
    const test = toSyntax(get('test'), this);
    const body = toSyntax(get('body'), this);
    const counter = toSyntax(get('counter'), this);
    const init = toSyntax(get('init'), this);
    const update = toSyntax(get('update'), this);
    const explicitStep = update ? `step ${update}` : undefined;

    addToSyntax(state, 'for', counter, (counter && init.length)?'=':'', init, 'to', test, explicitStep, body, 'end for');
    return false;
  }
  FunctionDeclaration(path, state) {
    return toSubFuncDefinition('function')(path, state, this);
  }
  FunctionExpression(path, state) {
    return toSubFuncDefinition('function')(path, state, this);
  }
  GoToStatement(path, state) {
    const {node: {id: {name}}} = path;
    addToSyntax(state, 'goto', name);
    return false;
  }
  GREATER_THAN(path, state) {
    addToSyntax(state, '>');
  }
  GREATER_THAN_EQUAL(path, state) {
    addToSyntax(state, '>=');
  }
  Identifier({node:{name}}, state) {
    addToSyntax(state, name);
  }
  IfStatement(path, state) {
    const {get, node:{consequent: {type}}} = path;
    //logic from here needs to apply to else if as well... refactor?
    const test = toSyntax(get('test'), this);
    const consequent = toSyntax(get('consequent'), this);
    const alternate = toSyntax(get('alternate'), this);
    const blockForm = type === 'BlockStatement';
    //still need to fix this.... bad way to determine block form

    //NOTE: Brightscript documentation states that "then" is an optional keyword for
    //      IF, ELSEIF, THEN, ENDIF block
    addToSyntax(state, 'if', test, consequent, withNothing(alternate), blockForm?'end if':'');
    return false;
  }
  INCREMENT(path, state) {
    addToSyntax(state, '++');
  }
  LabeledStatement(path, state) {
    const {node: {label: {name}}} = path;
    //TODO: Seems to be treating the line following the label as the body of the label statement.
    const body = toSyntax(path.get('body'), this);
    addToSyntax(state, name, ':\n', body)
    return false;
  }
  LESS_THAN(path, state) {
    addToSyntax(state, '<');
  }
  LESS_THAN_EQUAL(path, state) {
    addToSyntax(state, '<=');
  }
  LibraryStatement(path, state) {
    addToSyntax(state, 'library');
  }
  Literal({node:{raw, value}}, state) {
    addToSyntax(state, value);
  }
  LogicExpression(path, state) {
    return toOperatorExpression(path, state, this);
  }
  MemberExpression(path, state) {
  }
  MultiplicationExpression(path, state) {
    return toOperatorExpression(path, state, this);
  }
  NEWLINE(path, state) {
    addToSyntax(state, '\\n'); //:
  }
  NOT(path, state) {
    addToSyntax(state, 'not');
  }
  NOT_EQUAL({node: {value}}, state) {
    addToSyntax(state, '<>'); 
  }
  ObjectExpression({get}, state) {
    const properties = toSyntax(get('properties'), this);
    addToSyntax(state, '{', withComma(properties), '}');
    return false;
  }
  OP_ASSIGNMENT_ADD(path, state) {
    addToSyntax(state, '+=');
  }
  OP_ASSIGNMENT_SUBTRACT(path, state) {
    addToSyntax(state, '-=');
  }
  OP_ASSIGNMENT_DIVISION(path, state) {
    addToSyntax(state, '/=');
  }
  OP_ASSIGNMENT_INTEGER_DIVISION(path, state) {
    addToSyntax(state, '\\=');
  }
  OP_ASSIGNMENT_MULTIPLY(path, state) {
    addToSyntax(state, '*=');
  }
  OP_ASSIGNMENT_BITSHIFT_LEFT(path, state) {
    addToSyntax(state, '<<=');
  }
  OP_ASSIGNMENT_BITSHIFT_RIGHT(path, state) {
    addToSyntax(state, '>>=');
  }
  OP_MINUS(path, state) {
    addToSyntax(state, '-');
  }
  OP_PLUS(path, state) {
    addToSyntax(state, '+');
  }
  OP_EXPONENT(path, state) {
    addToSyntax(state, '^');
  }
  OP_MULTIPLE(path, state) {
    addToSyntax(state, '*');
  }
  OP_DIVIDE(path, state) {
    addToSyntax(state, '/');
  }
  MOD(path, state) {
    addToSyntax(state, 'MOD');
  }
  OR(path, state) {
    addToSyntax(state, 'or');
  }
  Parameter({get}, state) {
    const name = toSyntax(get('name'), this);
    const type = toSyntax(get('TypeAnnotation'), this);
    const value = toSyntax(get('value'), this);

    addToSyntax(state, name, value?`=${value}`:'', type);
    return false;
  }
  ParameterList({get}, state) {
    const args = toSyntax(get('args'), this);
    addToSyntax(state, '(', withComma(args), ')');
    return false;
  }
  ParenthesisExpression({get}, state) {
    const expression = toSyntax(get('expression'), this);
    addToSyntax(state, '(', expression, ')');
    return false;
  }
  PERIOD(path, state) {
    addToSyntax(state, '.');
  }
  PrintStatement({get}, state) {
    const value = toSyntax(get('value'), this);

    addToSyntax(state, '?', withSemiColon(value));
    return false;
  }
  PostfixExpression({get}, state) {
    const arg = toSyntax(get('argument'), this);
    const operator = toSyntax(get('operator'), this);
    addToSyntax(state, arg, operator);
    return false;
  }
  Program(path, state) {
  }
  Property({get}, state) {
    const key = toSyntax(get('key'), this);
    const value = toSyntax(get('value'), this);

    addToSyntax(state, key, ':', value);
    return false;
  }
  RelationExpression(path, state) {
    return toOperatorExpression(path, state, this);
  }
  ReturnStatement(path, state) {
    //when we are not in a block, we need to have a space before us
    const returnExpression = toSyntax(path.get('argument'), this);
    const trailingComments = toSyntax(path.get('trailingComments'), this);
    addToSyntax(state, 'return', returnExpression, ' ', trailingComments);
    return false;
  }
  SubDeclaration(path, state) {
    return toSubFuncDefinition('sub')(path, state, this);
  }
  STRING_LITERAL({node: {loc: {source}}}, state) {
    addToSyntax(state, source);
  }
  StopStatement(path, state) {
    addToSyntax(state, 'stop', '\n')
  }
  STOP(path, state) {
    addToSyntax(state, 'stop');
  }  
  TypeAnnotation({node:{value}}, state) {
    addToSyntax(state, ' as', value);
  }
  UnaryExpression(path, state) {
  }
  UnTypedIdentifier({node:{name}}, state) {
    addToSyntax(state, name);
  }
  WhileStatement({get}, state) {
    const test = toSyntax(get('test'), this);
    const body = toSyntax(get('body'), this);

    addToSyntax(state, 'while', test, body, 'end while');
    return false;
  }
}
exports.OutputVisitor = OutputVisitor;
