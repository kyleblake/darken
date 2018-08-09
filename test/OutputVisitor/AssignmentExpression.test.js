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

describe('AssignmentExpression', function() {
  it('should handle regular assignment', function() {
    const testSrc =
    `sub test()
      x = 1
    end sub`;
    const expected = 'sub test()\nx=1\nend sub';
    compareTraversal(testSrc, expected);
  });
  it('should handle plus-equals', function() {
    const testSrc =
    `sub test()
      x += 1
    end sub`;
    const expected = 'sub test()\nx+=1\nend sub';
    compareTraversal(testSrc, expected);
  });
  it('should handle minus-equals', function() {
    const testSrc =
    `sub test()
      x -= 1
    end sub`;
    const expected = 'sub test()\nx-=1\nend sub';
    compareTraversal(testSrc, expected);
  });
  it('should handle division-equals', function() {
    const testSrc =
    `sub test()
      x /= 1
    end sub`;
    const expected = 'sub test()\nx/=1\nend sub';
    compareTraversal(testSrc, expected);
  });
  it('should handle integer division-equals', function() {
    const testSrc =
    `sub test()
      x \\= 1
    end sub`;
    const expected = 'sub test()\nx\\=1\nend sub';
    compareTraversal(testSrc, expected);
  });
  it('should handle multiply-equals', function() {
    const testSrc =
    `sub test()
      x *= 1
    end sub`;
    const expected = 'sub test()\nx*=1\nend sub';
    compareTraversal(testSrc, expected);
  });
  it('should handle bitshift left', function() {
    const testSrc =
    `sub test()
      x <<= 1
    end sub`;
    const expected = 'sub test()\nx<<=1\nend sub';
    compareTraversal(testSrc, expected);
  });
  it('should handle bitshift right', function() {
    const testSrc =
    `sub test()
      x >>= 1
    end sub`;
    const expected = 'sub test()\nx>>=1\nend sub';
    compareTraversal(testSrc, expected);
  });
});
