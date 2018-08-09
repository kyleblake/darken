const { expect } = require('chai');
const {
  OutputVisitor,
  traverse
} = require('../../index');
const { ast } = require('@roku-road/bright');

const compareTraversal = (testSrc, expected) => {
  const expectedLines = expected.split('\n');
  const AST = ast(testSrc);
  const {syntax: result} = traverse(AST)(new OutputVisitor, {syntax: ''});
  result.split('\n').forEach((line, i) => expect(line).to.equal(expectedLines[i]));
}

describe('DimStatement', function() {
  it('should work for arrays with 0 elements', function() {
    const testSrc =
    `sub test()
      dim x[5, 5, 5]
    end sub`;
    // This test also fails because all of the ArrayExpression elements except the last seem
    // to be dropped by the Bright AST generator
    // See ArrayExpression.test.js
    const expected = 'sub test()\ndim[5, 5, 5]\nend sub';
    compareTraversal(testSrc, expected);
  });
});
