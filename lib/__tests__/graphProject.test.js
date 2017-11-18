const assert = require('assert');
const graphProject = require('../index.js');

describe('Graph', () => {
  it('Tests on Node', () => {
    let A = new graphProject.Node(4, 2);
    assert(A.x === 4 && A.y === 2, 'graphProject should have a test');
  });
});
