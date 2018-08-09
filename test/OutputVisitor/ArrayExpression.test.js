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

describe('ArrayExpression / ArrayElement', function() {
  it('should work for arrays with 0 elements', function() {
    const testSrc =
    `sub test()
      x = []
    end sub`;
    const expected = 'sub test()\nx=[]\nend sub';
    compareTraversal(testSrc, expected);
  });
  it('should for arrays with multiple arguments', function() {
    const testSrc = "sub test()\n x = [1, 2]\n end sub";
    // I don't understand why this is coming out 'sub test()\nx=[2]\nend sub'
    // Something seems to be wrong with the Bright AST output. Works in Roku project.
    const expected = 'sub test()\nx=[1,2]\nend sub';
    compareTraversal(testSrc, expected);
  });
});
