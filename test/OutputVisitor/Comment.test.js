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

describe('Comment', function() {
  it('should generate comments', function() {
    compareTraversal("' test comment", "'test comment\n");
  });
  it('should work with "rem"', function() {
    compareTraversal("rem test comment", "'test comment\n");
  });
});
