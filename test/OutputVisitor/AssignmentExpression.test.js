const compareTraversal = require('./compareTraversal');

describe('AssignmentExpression', function() {
  it('should generate correct assignment for regular assignment', function() {
    const testSrc = 'x = 1';
    const expected = 'x=1';
    compareTraversal(testSrc, expected, 'AssignmentExpression');
  });
  it('should generate correct assignment for plus-equals', function() {
    const testSrc = 'x += 1';
    const expected = 'x+=1';
    compareTraversal(testSrc, expected, 'AssignmentExpression');
  });
  it('should generate correct assignment for minus-equals', function() {
    const testSrc = 'x -= 1';
    const expected = 'x-=1';
    compareTraversal(testSrc, expected, 'AssignmentExpression');
  });
  it('should generate correct assignment for division-equals', function() {
    const testSrc = 'x /= 1';
    const expected = 'x/=1';
    compareTraversal(testSrc, expected, 'AssignmentExpression');
  });
  it('should generate correct assignment for integer division-equals', function() {
    const testSrc = 'x \\= 1';
    const expected = 'x\\=1';
    compareTraversal(testSrc, expected, 'AssignmentExpression');
  });
  it('should generate correct assignment for multiply-equals', function() {
    const testSrc = 'x *= 1';
    const expected = 'x*=1';
    compareTraversal(testSrc, expected, 'AssignmentExpression');
  });
  it('should generate correct assignment for bitshift left', function() {
    const testSrc = 'x <<= 1';
    const expected = 'x<<=1';
    compareTraversal(testSrc, expected, 'AssignmentExpression');
  });
  it('should generate correct assignment for bitshift right', function() {
    const testSrc = 'x >>= 1';
    const expected = 'x>>=1';
    compareTraversal(testSrc, expected, 'AssignmentExpression');
  });
});
