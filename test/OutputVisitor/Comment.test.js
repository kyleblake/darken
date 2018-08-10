const compareTraversal = require('./compareTraversal');

describe('Comment', function() {
  it('should generate correct syntax comments', function() {
    compareTraversal("' test comment", "'test comment\n", 'Comment');
  });
  it('should work with "rem"', function() {
    compareTraversal("rem test comment", "'test comment\n", 'Comment');
  });
});
