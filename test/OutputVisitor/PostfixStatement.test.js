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

describe('PostfixStatement', function() {
  it('should handle Increment', function() {
    const testSrc =
    `sub test()
      x++
    end sub`;
    const expected = 'sub test()\nx++\nend sub';
    compareTraversal(testSrc, expected);
  });
  it('should handle Decrement', function() {
    const testSrc =
    `sub test()
      x--
    end sub`;
    const expected = 'sub test()\nx--\nend sub';
    compareTraversal(testSrc, expected);
  });
});
