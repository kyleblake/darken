const { expect } = require('chai');
const {
  OutputVisitor,
  traverse
} = require('../../index');
const { ast } = require('@roku-road/bright');

const compareTraversal = (testSrc, expected) => {
  const expectedLines = expected.split('\n');
  const {syntax: result} = traverse(ast(testSrc))(new OutputVisitor, {syntax: ''});
  result.split('\n').forEach((line, i) => expect(line).to.equal(expectedLines[i]));
}

describe('AdditionStatement', function() {
  it('should work for x + y', function() {
    const testSrc =
    `sub test()
      x + 2
    end sub`;
    const expected = 'sub test()\nx+2\nend sub';
    compareTraversal(testSrc, expected);
  });
});
