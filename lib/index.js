class Node {
  constructor(x, y) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.edges = Array(0);
    this.visited = false;
    this.acum = 1000;
  }
  addAcum(val) {
    if (val < this.acum) {
      this.acum = val;
    }
  }
  addEdgeInNode(enlace) {
    this.edges.push(enlace);
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

module.exports = { Node: Node, Edge: Edge, Graph: Graph };
