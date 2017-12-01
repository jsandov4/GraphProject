function showNode(node, color = '#2c3e50') {
  var canvas = document.getElementById('screen');
  var context = canvas.getContext('2d');
  let x = node.x;
  let y = node.y;
  context.beginPath();
  context.arc(x, y, 4, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

function showEdge(edge, color = '#e74c3c') {
  let node1 = edge.origin;
  let node2 = edge.destiny;
  let x1 = node1.x;
  let y1 = node1.y;
  let x2 = node2.x;
  let y2 = node2.y;
  var canvas = document.getElementById('screen');
  var context = canvas.getContext('2d');
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = color;
  context.lineWidth = 3;
  context.stroke();
}

function showGraph(grafo) {
  let nodes = grafo.nodes;

  for (var i = 0; i < nodes.length; i++) {
    var nodet = nodes[i];
    showNode(nodet);
    for (let j = 0; j < nodet.edges.length; j++) {
      showEdge(nodet.edges[j]);
    }
  }
}

function clearScreen() {
  var canvas = document.getElementById('screen');
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}
