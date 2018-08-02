const _ = require('lodash');

const addToSyntax = (state, ...values) => {
//  if (values.includes('getPlayerState')) debugger;
  //const hasUndefined = values.filter(x=>!x).length > 0; 
  const combinedVal = values.filter(x=>x).join('') || '';

  if (combinedVal)
    state.syntax += combinedVal;
}

class OutputVisitor {
  constructor() {
  }
  AND({node: {value}}, state) {
    addToSyntax(state, ' ', value, ' ');
  }
  AS({node: {value}}, state) {
    addToSyntax(state, ' ', value, ' ');
  }
  BOOLEAN({node: {value}}, state) {
    addToSyntax(state, value);
  }
  CLOSE_BRACKET({node: {value}}, state) {
    addToSyntax(state, value);
  }
  CLOSE_CURLY_BRACE({node: {value}}, state) {
    addToSyntax(state, value);
  }
  CLOSE_PAREN({node: {value}}, state) {
    addToSyntax(state, value);
  }
  COLON({node: {value}}, state) {
    addToSyntax(state, value);
  }
  COMMA({node: {value}}, state) {
    addToSyntax(state, value);
  }
  COMMENT_QUOTE(path, state) {
  }
  END({node: {value}}, state) {
    addToSyntax(state, value);
  }
  ELSE({node: {value}}, state) {
    addToSyntax(state, value);
  }
  ELSE_IF({node: {value}}, state) {
    addToSyntax(state, value, ' ');
  }
  END_IF({node: {value}}, state) {
    addToSyntax(state, value);
  }
  END_FUNCTION({node: {value}}, state) {
    addToSyntax(state, value);
  }
  END_SUB({node: {value}}, state) {
    addToSyntax(state, value);
  }
  EQUAL({node: {value}}, state) {
    addToSyntax(state, value);
  }
  FALSE({node: {value}}, state) {
    addToSyntax(state, value);
  }
  FULL_PRINT({node: {value}}, state) {
    addToSyntax(state, '?');
  }
  FUNCTION({node: {value}}, state) {
    addToSyntax(state, value, ' ');
  }
  IDENTIFIER({node: {value}}, state) {
    addToSyntax(state, value);
  }
  IF({node: {value}}, state) {
    addToSyntax(state, value, ' ');
  }
  NEWLINE({node: {value}}, state) {
    addToSyntax(state, value); //:
  }
  NOT({node: {value}}, state) {
    if (value) {
      //I dont get this one quite yet
      addToSyntax(state, value, ' ');
    }
  }
  NOT_EQUAL({node: {value}}, state) {
    addToSyntax(state, value); 
  }
  NUMBER_LITERAL({node: {value}}, state) {
    addToSyntax(state, value, ' ');
  }
  OP_MINUS({node: {value}}, state) {
    addToSyntax(state, value);
  }
  OP_PLUS({node: {value}}, state) {
    addToSyntax(state, value);
  }
  OPEN_BRACKET({node: {value}}, state) {
    addToSyntax(state, value);
  }
  OPEN_CURLY_BRACE({node: {value}}, state) {
    addToSyntax(state, value);
  }
  OPEN_PAREN({node: {value}}, state) {
    addToSyntax(state, value);
  }
  OR({node: {value}}, state) {
    addToSyntax(state, ' ', value, ' ');
  }
  PERIOD({node: {value}}, state) {
    addToSyntax(state, value);
  }
  RETURN({node: {value}}, state) {
    addToSyntax(state, value, ' ');
  }
  SEMICOLON({node: {value}}, state) {
    addToSyntax(state, value);
  }
  STRING({node: {value}}, state) {
    //console.log(value)
    addToSyntax(state, value);
  }
  STRING_LITERAL({node: {value}}, state) {
    //console.log(value)
    addToSyntax(state, value);
  }
  SUB({node: {value}}, state) {
    addToSyntax(state, value, ' ');
  }
  TRUE({node: {value}}, state) {
    addToSyntax(state, value);
  }
}
exports.OutputVisitor = OutputVisitor;
