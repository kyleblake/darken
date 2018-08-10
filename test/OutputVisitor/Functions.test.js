const compareTraversal = require('./compareTraversal');

describe('Function and Subroutines', function() {
  describe('FunctionDeclaration', function() {
    it('should generate correct syntax for function declarations', function() {
      const testSrc =
      `function test(a)
      end function`;
      const expected = 'function test(a)\nend function';
      compareTraversal(testSrc, expected, 'FunctionDeclaration');
    });
  });
  describe('FunctionExpression', function() {
    it('should generate correct syntax for function expressions', function() {
      const testSrc =
      `function (a)
          return a
        end function`;
      const expected = 'function(a)\nreturn a \nend function';
      compareTraversal(testSrc, expected, 'FunctionExpression');
    });
  });
  describe('SubDeclaration', function() {
    it('should generate correct syntax for function expressions', function() {
      const testSrc =
      `sub test()
      end sub`;
      const expected = 'sub test()\nend sub';
      compareTraversal(testSrc, expected, 'SubDeclaration');
    });
  });
});
