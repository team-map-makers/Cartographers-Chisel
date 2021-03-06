import * as d3 from "d3";

class GenerateMap {
  constructor() {
    //Bind all functions here

    this.relaxVoronoi = this.relaxVoronoi.bind(this);
    this.generateNewDiagram = this.generateNewDiagram.bind(this);
    this.addIsland = this.addIsland.bind(this);

    this.justWorks = this.justWorks.bind(this);
    this.height = 1000;
    this.width = 1500;
  }
  height;
  width;
  sites;
  diagram;
  polygons;
  voronoi;

  /**
   * Makes an array of sites. Tries to get height from the map data, else uses default.
   * Assigns it to this.mapData.site, and returns it.
   */
  justWorks() {
    var me = this;
    this.sites = d3.range(10000).map(function(d) {
      return [Math.random() * me.width, Math.random() * me.height];
    });
    this.voronoi = d3.voronoi().extent([[0, 0], [this.width, this.height]]);
    this.diagram = this.voronoi(this.sites);
    this.polygons = this.diagram.polygons();
  }

  generateNewDiagram() {
    this.justWorks();
    this.relaxVoronoi();
    this.relaxVoronoi();
    var me = this;
    this.makePathFromPolyon(me);
  }

  makePathFromPolyon(scope) {
    scope.polygons.forEach(function(poly) {
      poly.path = "M" + poly.join("L") + "Z";
      poly.height = 0;
    });
  }

  relaxVoronoi() {
    // relaxation itself
    this.sites = this.voronoi(this.sites)
      .polygons()
      .map(d3.polygonCentroid);
    this.diagram = this.voronoi(this.sites);
    this.polygons = this.diagram.polygons();
    var me = this;

    // push neighbors indexes to each polygons element
    this.polygons.map(function(i, d) {
      i.index = d; // index of this element
      var neighbors = [];
      me.diagram.cells[d].halfedges.forEach(function(e) {
        var edge = me.diagram.edges[e],
          ea;
        if (edge.left && edge.right) {
          ea = edge.left.index;
          if (ea === d) {
            ea = edge.right.index;
          }
          neighbors.push(ea);
        }
      });
      i.neighbors = neighbors;
    });
  }

  addColor(index, color) {
    this.polygons[index].color = color;
  }
  addHeight(start, numberOfNeigbors, addheight) {
    this.polygons[start].used = 1;
    let queue = [];
    let me = this;
    queue.push(start);
    let addNeighborsToQueue = poly => {
      me.polygons[poly].neighbors.forEach(e => {
        if (!me.polygons[e].used) {
          queue.push(e);

          me.polygons[e].used = 1;
        }
      });
    };
    for (let i = 0; i < numberOfNeigbors; i++) {
      queue.forEach(index => {
        addNeighborsToQueue(index);
      });
    }
    queue.forEach(index => {
      if (me.polygons[index].height < 0.95)
        me.polygons[index].height += addheight;
    });
    this.polygons.forEach(function(e) {
      e.used = null;
    });
  }
  addIsland(start) {
    // get options from inputs
    var height = 0.6,
      radius = 0.993,
      sharpness = 0.6,
      i,
      queue = [],
      me = this;
    let color = d3.scaleSequential(d3.interpolateSpectral);
    me.polygons[start].height += height;
    me.polygons[start].color = color(1 - me.polygons[start].height);
    me.polygons[start].used = 1;
    let addHeightWithNeigbors = function(e) {
      if (!me.polygons[e].used) {
        me.polygons[e].height += height;
        // max height is 1

        me.polygons[e].color = color(1 - me.polygons[e].height);
        if (me.polygons[e].height > 1) {
          me.polygons[e].height = 1;
        }

        me.polygons[e].used = 1;
        queue.push(e);
      }
    };
    queue.push(start);
    for (i = 0; i < queue.length && height > 0.01; i++) {
      height *= radius;

      me.polygons[queue[i]].neighbors.forEach(addHeightWithNeigbors);
    }
    me.polygons.forEach(function(e) {
      e.used = null;
    });
    me.polygons.forEach(function(e) {
      if (!e.color) {
        e.color = color(1 - e.height);
      }
    });
  }
}

export default GenerateMap;
