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

describe('Arguments', function() {
  it('should work for function calls with 0 arguments', function() {
    const testSrc =
    `sub test()
      fn()
    end sub`;
    const expected = 'sub test()\nfn()\nend sub';
    compareTraversal(testSrc, expected);
  });
  it('should for function calls with 1+ arguments', function() {
    const testSrc =
    `sub test()
      fn(x, y)
    end sub`;
    const expected = 'sub test()\nfn(x,y)\nend sub';
    compareTraversal(testSrc, expected);
  });
});
