class Node {
  constructor(x, y) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.edges = Array(0);
    this.visited = false;
    this.acum = 1000;
  }
}

module.exports = { Node: Node };
