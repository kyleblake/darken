const {
  OutputVisitor,
  traverse
} = require('../../index');
const { ast, parse } = require('@roku-road/bright');
const { expect } = require('chai');

const compareTraversal = (testSrc, expected, type = 'Program') => {
  const {syntax} = traverse(ast(testSrc, type))(new OutputVisitor, {syntax: ''});
  expect(syntax).to.equal(expected);
};

module.exports = compareTraversal;
