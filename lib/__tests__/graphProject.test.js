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

  it('Addition of a node in a Graph', () => {
    let A = new graphProject.Node(2, 0);
    let B = new graphProject.Node(2, 2);
    let G = new graphProject.Graph();
    G.addNode(A);
    G.addNode(B);
    assert(G.nodes[0].x === 2 && G.nodes[0].y === 0, 'Node not added correctly');
    assert(G.nodes[1].x === 2 && G.nodes[1].y === 2, 'Node not added correctly');
    assert(G.nodes.length === 2, 'Incorrect size');
  });
  it('Identical Nodes - same (x,y) - are not added', () => {
    let A = new graphProject.Node(2, 0);
    let B = new graphProject.Node(2, 0);
    let G = new graphProject.Graph();
    G.addNode(A);
    G.addNode(B);
    assert(G.nodes.length === 1, 'Same nodes added twice');
  });
  it('Addition of an Edge', () => {
    let A = new graphProject.Node(2, 0);
    let B = new graphProject.Node(2, 2);
    let G = new graphProject.Graph();
    G.addNode(A);
    G.addNode(B);
    G.addEdge(A, B);
    assert(G.nodes[0].edges.length === 1, 'Edge is not correct');
    assert(G.nodes[1].edges.length === 1, 'Edge is not correct');
  });
});

describe('Functions over the Graph', () => {
  it('Find the neighbors of a given Node', () => {
    var g = new graphProject.Graph();
    var A = new graphProject.Node(0, 1);
    var B = new graphProject.Node(1, 1);
    var C = new graphProject.Node(1, 0);
    var D = new graphProject.Node(3, 1);
    g.addNode(A);
    g.addNode(B);
    g.addNode(C);
    g.addNode(D);

    g.addEdge(A, B);
    g.addEdge(B, C);
    g.addEdge(B, D);
    let neighs = graphProject.neighbors(g, B);
    assert(neighs.length === 3, 'Wrong neighbors');
  });
  it('Find an Edge given the nodes', () => {
    var g = new graphProject.Graph();
    var A = new graphProject.Node(0, 1);
    var B = new graphProject.Node(1, 1);
    var C = new graphProject.Node(1, 0);
    var D = new graphProject.Node(3, 1);
    g.addNode(A);
    g.addNode(B);
    g.addNode(C);
    g.addNode(D);

    g.addEdge(A, B);
    g.addEdge(B, C);
    g.addEdge(B, D);
    let edg = graphProject.findEdge(g, B, D);
    assert(edg.distance() === 2, 'Incorrect edge');
  });
});
