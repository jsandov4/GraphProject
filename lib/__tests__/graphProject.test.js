const assert = require('assert');
const graphProject = require('../index.js');

describe('Node, Edges and Graph test cases', () => {
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

describe('Functions required to apply Dijkstra', () => {
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
    let edg = g.findEdge(B, D);
    assert(edg.distance() === 2, 'Incorrect edge');
  });
  it('Find node with lowest value of property ACUM', () => {
    var g = new graphProject.Graph();
    var A = new graphProject.Node(0, 1);
    var B = new graphProject.Node(1, 1);
    var C = new graphProject.Node(1, 0);
    var D = new graphProject.Node(3, 1);
    g.addNode(A);
    g.addNode(B);
    g.addNode(C);
    g.addNode(D);
    A.acum = 10;
    B.acum = 5;
    C.acum = 4;
    D.acum = 2;

    g.addEdge(A, B);
    g.addEdge(B, C);
    g.addEdge(B, D);

    let nodMin = graphProject.minLabel(g);
    assert(nodMin.x === 3 && nodMin.y === 1, 'Incorrect node with minimum ACUM');
  });
  it('Check if all nodes has been visited, condition to stop Dijkstra', () => {
    var g = new graphProject.Graph();
    var A = new graphProject.Node(0, 1);
    var B = new graphProject.Node(1, 1);
    var C = new graphProject.Node(1, 0);
    var D = new graphProject.Node(3, 1);
    g.addNode(A);
    g.addNode(B);
    g.addNode(C);
    g.addNode(D);
    A.visited = true;
    B.visited = true;
    C.visited = true;
    D.visited = true;

    g.addEdge(A, B);
    g.addEdge(B, C);
    g.addEdge(B, D);

    let bol = graphProject.checkVisited(g);
    assert(!bol, 'Not correct checking');
  });
});

describe('Dijkstra Method', () => {
  it('Checking Dijkstra algorithm', () => {
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

    graphProject.dijkstra(g, A);
    assert(A.acum === 0, 'Error in ACUM property 1');
    assert(B.acum === 1, 'Error in ACUM property 2');
    assert(C.acum === 2, 'Error in ACUM property 3');
    assert(D.acum === 3, 'Error in ACUM property 4');
  });
});
describe('Theta function (Weight of the graph)', () => {
  it('Summation of the weight of all edges', () => {
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

    let peso = graphProject.sumEdgesWeight(g);
    assert(peso === 4, 'Error summation of weights');
  });
  it('Weight of the graph, including shortest distance to each node from Central Node', () => {
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

    let peso = graphProject.thetaFunction(g, A);
    assert(peso === 10, 'Error summation of weights');
  });
});
describe('Check connectivity', () => {
  it('Verify that edges of a node are not yet visited ', () => {
    var g = new graphProject.Graph();
    var A = new graphProject.Node(0, 1);
    var B = new graphProject.Node(1, 1);
    var C = new graphProject.Node(1, 0);
    var D = new graphProject.Node(3, 1);
    g.addNode(A);
    g.addNode(B);
    g.addNode(C);
    g.addNode(D);

    g.addEdge(B, A);
    g.addEdge(B, C);
    g.addEdge(B, D);
    g.findEdge(B, A).visited = true;
    g.findEdge(B, C).visited = true;
    let boole = graphProject.isThereEdge(g.findNode(B));
    g.findEdge(B, D).visited = true;
    let boole2 = graphProject.isThereEdge(g.findNode(B));
    assert(boole, 'Error try 1');
    assert(!boole2, 'Error try 2');
  });

  it('Recursive method to visit nodes ', () => {
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
    var g2 = new graphProject.Graph();
    var A2 = new graphProject.Node(0, 2);
    var B2 = new graphProject.Node(2, 2);
    var C2 = new graphProject.Node(2, 0);
    var D2 = new graphProject.Node(3, 2);
    g2.addNode(A2);
    g2.addNode(B2);
    g2.addNode(C2);
    g2.addNode(D2);
    g2.addEdge(A2, B2);
    g2.addEdge(C2, D2);

    graphProject.checkConectivity(g, g.nodes[0], g.nodes[0]);
    let nds = g.nodes;
    let boole = true;
    for (let i = 0; i < nds.length; i++) {
      if (!nds[i].visited) {
        console.log(nds[i].visited);
        boole = false;
      }
    }

    graphProject.checkConectivity(g2, g2.nodes[0], g2.nodes[0]);
    let nds2 = g2.nodes;
    let boole2 = true;
    for (let i = 0; i < nds2.length; i++) {
      if (!nds2[i].visited) {
        console.log(nds2[i].visited);
        boole2 = false;
      }
    }
    assert(boole, 'Error try 1');
    assert(!boole2, 'Error try 1');
  });

  it('Connected', () => {
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
    let boole = graphProject.isConected(g);

    var g2 = new graphProject.Graph();
    g2.addNode(A);
    g2.addNode(B);
    g2.addNode(C);
    g2.addNode(D);
    g2.addEdge(A, B);
    g2.addEdge(C, D);
    let boole2 = graphProject.isConected(g2);

    var g3 = new graphProject.Graph();
    var E = new graphProject.Node(3, 3);
    g3.addNode(A);
    g3.addNode(B);
    g3.addNode(C);
    g3.addNode(D);
    g3.addNode(E);
    g3.addEdge(A, B);
    g3.addEdge(B, C);
    g3.addEdge(B, D);
    let boole3 = graphProject.isConected(g3);

    assert(boole, 'Error try 1');
    assert(!boole2, 'Error try 2');
    assert(!boole3, 'Error try 3');
  });
});
