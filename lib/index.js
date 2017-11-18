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

module.exports = { Node: Node, Edge: Edge };
