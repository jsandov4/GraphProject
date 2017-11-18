const assert = require('assert');
const graphProject = require('../index.js');

describe('Graph', () => {
  it('Creation of node test', () => {
    let A = new graphProject.Node(4, 2);
    assert(A.x === 4 && A.y === 2, 'Node is not created appropriately');
  });
  it('Testing behaviour of property ACUM (in node), used in dijkstra', () => {
    let A = new graphProject.Node(4, 2);
    A.acum = 3;
    assert(A.acum === 3, 'ACUM property not set appropriately');
  });
  it('Edge creation', () => {
    let A = new graphProject.Node(4, 2);
    let B = new graphProject.Node(2, 4);
    let E = new graphProject.Edge(A, B);
    assert(E.destiny.x === 2 && E.destiny.y === 4, 'Error in Destiny node at Edge');
    assert(E.origin.x === 4 && E.origin.y === 2, 'Error in Origin node at Edge');
  });
  it('Calculation of distance among nodes in a Edge', () => {
    let A = new graphProject.Node(2, 0);
    let B = new graphProject.Node(2, 4);
    let E = new graphProject.Edge(A, B);
    assert(E.distance() === 4, 'Distance not correct');
  });
});
