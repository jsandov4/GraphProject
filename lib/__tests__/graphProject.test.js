const assert = require('assert');
const graphProject = require('../index.js');

describe('Graph', () => {
  it('Creation of node test', () => {
    let A = new graphProject.Node(4, 2);
    assert(A.x === 4 && A.y === 2, 'Node is not created appropriately');
  });
  it('Changing property ACUM (in node) used in dijkstra', () => {
    let A = new graphProject.Node(4, 2);
    A.acum = 3;
    assert(A.acum === 3, 'Acum property not set appropriately');
  });
});
