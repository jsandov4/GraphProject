import { SIGBREAK } from 'constants';

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

    if (n1 !== null && n2 !== null) {
      let ed1 = new Edge(n1, n2);
      let ed2 = new Edge(n2, n1);
      n1.addEdgeInNode(ed1);
      n2.addEdgeInNode(ed2);
      return true;
    }
    return false;
  }
}

// Return the set of neighbs of a node
//  in a graph (grafo)
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

function findEdge(grafo, node1, node2) {
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
        let weight = findEdge(grafo, nodot, xnode).distance();
        weight += nodot.acum;
        xnode.addAcum(weight);
      }
    }

    nodot = minLabel(grafo);
    nodot.visited = true;
    stay = checkVisited(grafo);
    //visitedNodesFalse(grafo);
  }
}

function visitedEdgesFalse(grafo) {
  let nods = grafo.nodes;
  for (let i = 0; i < nods.length; i++) {
    let edgs = nods[i].edges;
    for (let j = 0; j < edgs.length; j++) {
      edgs[j].visited = false;
    }
  }
}
function sumEdgesWeight(grafo) {
  visitedEdgesFalse(grafo);
  let nods = grafo.nodes;
  let suma = 0.0;

  for (let k = 0; k < nods.length; k++) {
    let nod0 = nods[k];
    let neigs = neighbors(grafo, nod0);

    for (let i = 0; i < neigs.length; i++) {
      let edg = findEdge(grafo, nod0, neigs[i]);

      if (!edg.visited) {
        edg.visited = true;
        findEdge(grafo, neigs[i], nod0).visited = true;
        suma += edg.distance();
      }
    }
  }
  return suma;
}

// Return the weight of the Graph

function thetaFunction(grafo, n0) {
  let suma1 = sumEdgesWeight(grafo);
  dijkstra(grafo, n0);
  let nds = grafo.nodes;
  let suma2 = 0.0;
  for (let i = 0; i < nds.length; i++) {
    suma2 += nds[i].acum;
  }
  return suma1 + suma2;
}

function visitedNodesFalse(grafo) {
  let nds = grafo.nodes;
  for (let i = 0; i < nds.length; i++) {
    nds[i].visited = false;
  }
}
function copyGraph(grafo) {
  let nodes = grafo.nodes;
  let grafo2 = new Graph();
  for (let i = 0; i < nodes.length; i++) {
    let nn = new Node(nodes[i].x, nodes[i].y);
    grafo2.addNode(nn);
  }
  for (let i = 0; i < nodes.length; i++) {
    let tedges = nodes[i].edges;
    for (let j = 0; j < tedges[j]; j++) {
      grafo2.addEdge(tedges[j].origin, tedges[j].destiny);
    }
  }
  return grafo2;
}
// Functions to verify if the graph is conected or not

//  Verify if there is some edges to visit

function isThereEdge(node) {
  let eds = node.edges;
  for (let i = 0; i < eds.length; i++) {
    if (!eds[i].visited) {
      return true;
    }
  }

  return false;
}

// Obtain the first edge not yet visited

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

function checkConectivity(grafo, node) {
  let boolean = isThereEdge(node);
  if (boolean) {
    let nodeF = firstNode(node);
    let edge1 = findEdge(grafo, node, nodeF);
    let edge2 = findEdge(grafo, nodeF, node);
    nodeF.visited = true;
    edge1.visited = true;
    edge2.visited = true;
    checkConectivity(grafo, nodeF);
  }
}
function isConected(grafo) {
  let nodeA = grafo.nodes[0];
  visitedEdgesFalse(grafo);
  visitedNodesFalse(grafo);
  checkConectivity(grafo, nodeA);
}

function proposeGraph(grafo) {}
module.exports = {
  Node: Node,
  Edge: Edge,
  Graph: Graph,
  neighbors: neighbors,
  findEdge: findEdge,
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
  checkConectivity: checkConectivity
};
