# graph-project [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> First part



## Usage

```js
Example of how to use the graph,  add nodes and Edges.
Node require 2 values (x,y) which is the position on a 2D space.
Nodes has to be inside the graph BEFORE adding an Edge.
To add an edge you have to specify 2 nodes.
    let g = new Graph();
    let A = new Node(0, 1);
    let B = new Node(1, 1);
    let C = new Node(1, 0);
    let D = new Node(3, 1);
    g.addNode(A);
    g.addNode(B);
    g.addNode(C);
    g.addNode(D);

    g.addEdge(A, B);
    g.addEdge(B, C);
    g.addEdge(B, D);

 Example of how to get the Weight of the graph once the nodes and edges has been inserted.

 let weight = thetaFunction(g, A);  
 
 Where A is the Central Node.

```
## License

Apache-2.0 © [Juan S Sandoval](http://sas.rochester.edu/chm/groups/huo/juan-sebastian-sandoval/)


[npm-image]: https://badge.fury.io/js/graph-project.svg
[npm-url]: https://npmjs.org/package/graph-project
[travis-image]: https://travis-ci.org/jsandov4/graph-project.svg?branch=master
[travis-url]: https://travis-ci.org/jsandov4/graph-project
[daviddm-image]: https://david-dm.org/jsandov4/graph-project.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/jsandov4/graph-project
[coveralls-image]: https://coveralls.io/repos/jsandov4/graph-project/badge.svg
[coveralls-url]: https://coveralls.io/r/jsandov4/graph-project
