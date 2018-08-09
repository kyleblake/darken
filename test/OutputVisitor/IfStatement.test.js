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

describe('IfStatement', function() {
  it('should work for single expression statements', function() {
    const testSrc =
    `sub test()
      if test x = 1
    end sub`;
    const expected = 'sub test()\nif test x=1\nend sub';
    compareTraversal(testSrc, expected);
  });
  it('should work for blocks', function() {
    const testSrc =
    `sub test()
      if test
        x = 1
        y = 2
      end if
    end sub`;
    const expected = 'sub test()\nif test\nx=1\ny=2\nend if\nend sub';
    compareTraversal(testSrc, expected);
  });
});

describe('ElseIfStatement', function() {
  it('should work for single expression statements', function() {
    const testSrc =
    `sub test()
      if test
        x = 1
      elseif test2
        y = 2
      end if
    end sub`;
    const expected = 'sub test()\nif test\nx=1\nelse if test2\ny=2\nend if\nend sub';
    compareTraversal(testSrc, expected);
  });
  it('should work for blocks', function() {
    const testSrc =
    `sub test()
      if test
        x = 1
      elseif test2
        y = 2
      end if
    end sub`;
    const expected = 'sub test()\nif test\nx=1\nelse if test2\ny=2\nend if\nend sub';
    compareTraversal(testSrc, expected);
  });
});

describe('ElseStatement', function() {
  it('should work for single expression statements', function() {
    const testSrc =
    `sub test()
      if test x = 1 else y = 2
    end sub`;
    const expected = 'sub test()\nif test x=1 else y=2\nend sub';
    compareTraversal(testSrc, expected);
  });
  it('should work for blocks', function() {
    const testSrc =
    `sub test()
      if test
        x = 1
      else
        y = 2
      end if
    end sub`;
    const expected = 'sub test()\nif test\nx=1\nelse \ny=2\nend if\nend sub';
    compareTraversal(testSrc, expected);
  });
});
