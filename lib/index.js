class Node {
  constructor(x, y) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.edges = Array(0);
    this.visited = false;
    this.acum = Infinity;
  }
  addAcum(val) {
    if (val < this.acum) {
      this.acum = val;
    }
  }
  addEdgeInNode(enlace) {
    this.edges.push(enlace);
  }
  removeEdgeInNode(enlace) {
    let array = this.edges;
    let x1 = enlace.destiny.x;
    let y1 = enlace.destiny.y;
    for (let i = 0; i < array.length; i++) {
      let xx = array[i].destiny.x;
      let yy = array[i].destiny.y;
      if (xx === x1 && yy === y1) {
        array.splice(i, 1);
        return true;
      }
    }
    return false;
  }
  areEqualN(x1, y1) {
    return this.x === x1 && this.y === y1;
  }
}

class Edge {
  constructor(NodeO, NodeD) {
    this.origin = NodeO;
    this.destiny = NodeD;
    this.visited = false;
  }
  distance() {
    return Math.pow(
      Math.pow(this.origin.x - this.destiny.x, 2) +
        Math.pow(this.origin.y - this.destiny.y, 2),
      0.5
    );
  }
}

class Graph {
  constructor() {
    this.nodes = [];
  }

  // Find and return a node otherwise null
  findNode(node) {
    let x1 = node.x;
    let y1 = node.y;

    for (var i = 0; i < this.nodes.length; i++) {
      let nod = this.nodes[i];
      if (nod.x === x1 && nod.y === y1) {
        return nod;
      }
    }
    return null;
  }

  addNode(node) {
    if (this.findNode(node) !== null) {
      return false;
    }
    this.nodes.push(node);
    return true;
  }
  addEdge(node1, node2) {
    let n1 = this.findNode(node1);
    let n2 = this.findNode(node2);
    let ed = this.findEdge(node1, node2);

    if (n1 !== null && n2 !== null && ed === null) {
      let ed1 = new Edge(n1, n2);
      let ed2 = new Edge(n2, n1);
      n1.addEdgeInNode(ed1);
      n2.addEdgeInNode(ed2);
      return true;
    }
    return false;
  }

  findEdge(node1, node2) {
    let n1 = this.findNode(node1);
    let n2 = this.findNode(node2);

    if (n1 !== null && n2 !== null) {
      let enlaces = n1.edges;
      for (let i = 0; i < enlaces.length; i++) {
        if (enlaces[i].destiny.areEqualN(n2.x, n2.y)) {
          return enlaces[i];
        }
      }
    }
    return null;
  }

  removeEdge(node1, node2) {
    let e1 = this.findEdge(node1, node2);

    if (e1 !== null) {
      let n1 = this.findNode(node1);
      let n2 = this.findNode(node2);
      n1.removeEdgeInNode(e1);
      let e2 = this.findEdge(node2, node1);
      n2.removeEdgeInNode(e2);
      return true;
    }

    return false;
  }
}

// Used by Dijkstra. Return the set of neighbs
// (nodes) of a given node in a graph (grafo)

function neighbors(grafo, node) {
  var neighs = [];
  var nn = grafo.findNode(node);

  if (nn !== null) {
    for (let i = 0; i < nn.edges.length; i++) {
      neighs.push(nn.edges[i].destiny);
    }
  }
  return neighs;
}

// Given a pair of nodes, find an edge,
// if there is so. Otherwise return null

function findEdge2(grafo, node1, node2) {
  let n1 = grafo.findNode(node1);
  let n2 = grafo.findNode(node2);

  if (n1 !== null && n2 !== null) {
    let enlaces = n1.edges;
    for (let i = 0; i < enlaces.length; i++) {
      if (enlaces[i].destiny.areEqualN(n2.x, n2.y)) {
        return enlaces[i];
      }
    }
  }
  return null;
}
// Used by Dijkstra. Return the lowest
// value of "ACUM" to determine the next
// step on the Alogrithm

function minLabel(grafo) {
  let arrayN = grafo.nodes;
  let xmin = 10000;
  var nodoMin = null;

  for (let i = 0; i < arrayN.length; i++) {
    let nodo = arrayN[i];
    if (!nodo.visited) {
      let val = nodo.acum;
      if (val < xmin) {
        xmin = val;
        nodoMin = nodo;
      }
    }
  }
  return nodoMin;
}
// Used by Dijkstra. Determine if there
// is any node to be visited.
// Condition to stop Dijkstra

function checkVisited(grafo) {
  var nodess = grafo.nodes;

  for (let i = 0; i < nodess.length; i++) {
    if (!nodess[i].visited) {
      return true;
    }
  }
  return false;
}

// Given a central node, determine the
// min distance to each node. Given the
// fact that it is a connected graph

function dijkstra(grafo, nodo0) {
  nodo0.acum = 0.0;
  nodo0.visited = true;
  var nodot = nodo0;
  var stay = checkVisited(grafo);
  var neighs = [];

  while (stay) {
    neighs = neighbors(grafo, nodot);
    for (let i = 0; i < neighs.length; i++) {
      let xnode = neighs[i];
      if (!xnode.visited) {
        // Let weight = findEdge(grafo, nodot, xnode).distance();
        let weight = grafo.findEdge(nodot, xnode).distance();
        weight += nodot.acum;
        xnode.addAcum(weight);
      }
    }

    nodot = minLabel(grafo);
    nodot.visited = true;
    stay = checkVisited(grafo);
    // VisitedNodesFalse(grafo);
  }
}

// Initialize all the edges with the
// attribute "visited" as false.

function visitedEdgesFalse(grafo) {
  let nods = grafo.nodes;
  for (let i = 0; i < nods.length; i++) {
    let edgs = nods[i].edges;
    for (let j = 0; j < edgs.length; j++) {
      edgs[j].visited = false;
    }
  }
}

// Sum of distances of all edges in the
// graph

function sumEdgesWeight(grafo) {
  visitedEdgesFalse(grafo);
  let nods = grafo.nodes;
  let suma = 0.0;

  for (let k = 0; k < nods.length; k++) {
    let nod0 = nods[k];
    let neigs = neighbors(grafo, nod0);

    for (let i = 0; i < neigs.length; i++) {
      // Let edg = findEdge(grafo, nod0, neigs[i]);
      let edg = grafo.findEdge(nod0, neigs[i]);

      if (!edg.visited) {
        edg.visited = true;
        grafo.findEdge(neigs[i], nod0).visited = true;
        suma += edg.distance();
      }
    }
  }
  return suma;
}

// Return the weight of the Graph.
// Dijkstra is used to obtain the min
// distance to each node and use that
// value of distance to calculate
// the wiegth of the graph

function thetaFunction(grafo, n0) {
  let suma1 = sumEdgesWeight(grafo);
  visitedNodesFalse(grafo);
  dijkstra(grafo, n0);
  let nds = grafo.nodes;
  let suma2 = 0.0;
  for (let i = 0; i < nds.length; i++) {
    suma2 += nds[i].acum;
  }
  visitedNodesFalse(grafo);
  return suma1 + suma2;
}

// Initialize attribute
// "visited" as false for all
// the nodes in a graph.

function visitedNodesFalse(grafo) {
  let nds = grafo.nodes;
  for (let i = 0; i < nds.length; i++) {
    nds[i].visited = false;
  }
}

// Copy a graph

function copyGraph(grafo) {
  let nodes = grafo.nodes;
  var grafo2 = new Graph();
  for (let i = 0; i < nodes.length; i++) {
    grafo2.addNode(new Node(nodes[i].x, nodes[i].y));
  }
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < grafo2.nodes[i].edges.length; j++) {
      grafo2.addEdge(
        new Node(grafo2.nodes[i].edges[j].origin.x, grafo2.nodes[i].edges[j].origin.y),
        new Node(grafo2.nodes[i].edges[j].destiny.x, grafo2.nodes[i].edges[j].destiny.y)
      );
    }
  }
  visitedNodesFalse(grafo);
  visitedEdgesFalse(grafo);
  visitedNodesFalse(grafo2);
  visitedEdgesFalse(grafo2);
  return grafo2;
}
// Functions to verify if the graph is conected or not:

// Used by IsConected. Determine if the
// there is at least one edge of a node
// that has not yet been visited.

function isThereEdge(node) {
  let eds = node.edges;
  for (let i = 0; i < eds.length; i++) {
    if (!eds[i].visited) {
      return true;
    }
  }

  return false;
}

// Used by IsConected.
// Obtain the first edge not yet visited
// in a node.

function firstNode(node) {
  let edgs = node.edges;
  for (let i = 0; i < edgs.length; i++) {
    if (!edgs[i].visited) {
      return edgs[i].destiny;
    }
  }
}

// Recursive method to check if there is any
// node that cannot be reach from nodeA

function checkConectivity(grafo, node1, node2) {
  let bool = isThereEdge(node2);
  if (bool) {
    let node3 = firstNode(node2);
    grafo.findEdge(node2, node3).visited = true;
    grafo.findEdge(node3, node2).visited = true;
    node1.visited = true;

    return checkConectivity(grafo, node2, node3);
  }
  node1.visited = true;
  node2.visited = true;
  let bool2 = isThereEdge(node1);
  if (bool2) {
    return checkConectivity(grafo, node1, node1);
  }
  return true;
}

// Determine if a given graph is connected
// or not.
function isConected(grafo) {
  let nodeA = grafo.nodes[0];
  visitedEdgesFalse(grafo);
  visitedNodesFalse(grafo);
  checkConectivity(grafo, nodeA, nodeA);
  let nds = grafo.nodes;
  for (let i = 0; i < nds.length; i++) {
    if (!nds[i].visited) {
      // Console.log(String(nds[i].x) + nds[i].y);
      return false;
    }
  }
  return true;
}

// Random number between limits

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Propuse a new grap
function proposeGraph(grafo) {
  var grafo2 = copyGraph(grafo);
  var sizeG = grafo2.nodes.length;
  var stay = true;

  while (stay) {
    let ran0 = Math.random();
    let ran1 = Math.floor(getRandom(0, sizeG));
    let ran2 = Math.floor(getRandom(0, sizeG));
    let na = grafo2.nodes[ran1];
    let nb = grafo2.nodes[ran2];

    // Remove edge
    if (ran0 < 0.5) {
      let edg = grafo2.findEdge(na, nb);
      if (edg !== null) {
        grafo2.removeEdge(na, nb);
        if (isConected(grafo2)) {
          stay = false;
        }
        visitedNodesFalse(grafo2);
        visitedEdgesFalse(grafo2);
      }
    } else {
      // Add graph
      let boole = grafo2.addEdge(na, nb);
      if (boole) {
        stay = false;
      }
    }
  }
  visitedEdgesFalse(grafo2);
  visitedNodesFalse(grafo2);
  return grafo2;
}

// Prob transition for going between states

function probTransition(grafo1, grafo2, temp) {
  let theta1 = thetaFunction(grafo1, grafo1.nodes[0]);
  let theta2 = thetaFunction(grafo2, grafo2.nodes[0]);

  let val = (theta2 - theta1) / temp;
  let pt = Math.exp(-val);
  return Math.min(1, pt);
}

function acceptance(prob) {
  let rand = Math.random();
  if (rand < prob) {
    return true;
  }
  return false;
}

// Initialize a complete conected graph

function initializeGraph(grafo) {
  let nds = grafo.nodes;

  for (let i = 0; i < nds.length; i++) {
    for (let j = i; j < nds.length; j++) {
      if (j !== i) {
        let node1 = nds[i];
        let node2 = nds[j];
        grafo.addEdge(node1, node2);
      }
    }
  }
}

var g4 = new Graph();
var A4 = new Node(0, 1);
var B4 = new Node(1, 1);
var C4 = new Node(1, 0);

g4.addNode(B4);
g4.addNode(A4);
g4.addNode(C4);

// G4.addEdge(A4, B4);
// g4.addEdge(B4, C4);
// g4.addEdge(C4, A4);
initializeGraph(g4);
console.log(g4.findEdge(A4, C4) !== null);
console.log(g4.findEdge(A4, B4) !== null);
console.log(g4.findEdge(B4, C4) !== null);

console.log(isConected(g4));
// Console.log(thetaFunction(g, g.nodes[0]));
// var g2 = proposeGraph(g);

module.exports = {
  Node: Node,
  Edge: Edge,
  Graph: Graph,
  neighbors: neighbors,
  findEdge2: findEdge2,
  minLabel: minLabel,
  checkVisited: checkVisited,
  dijkstra: dijkstra,
  visitedEdgesFalse: visitedEdgesFalse,
  sumEdgesWeight: sumEdgesWeight,
  copyGraph: copyGraph,
  proposeGraph: proposeGraph,
  visitedNodesFalse: visitedNodesFalse,
  thetaFunction: thetaFunction,
  isThereEdge: isThereEdge,
  firstNode: firstNode,
  checkConectivity: checkConectivity,
  isConected: isConected,
  probTransition: probTransition,
  initializeGraph: initializeGraph,
  acceptance: acceptance,
  getRandom: getRandom
};
