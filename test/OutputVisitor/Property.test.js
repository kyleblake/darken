const compareTraversal = require('./compareTraversal');

describe('Property', function() {
  it('should generate syntax for properties', function() {
    const testSrc1 = 'a: 1';
    const expected1 = 'a:1';
    compareTraversal(testSrc1, expected1, 'Property');
    const testSrc2 = 'a: "test2"';
    const expected2 = 'a:"test2"';
    compareTraversal(testSrc2, expected2, 'Property');
    const testSrc3 = 'a: {z: 1}';
    const expected3 = 'a:{z:1}';
    compareTraversal(testSrc3, expected3, 'Property');
  });
});
