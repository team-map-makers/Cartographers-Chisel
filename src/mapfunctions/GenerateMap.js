import * as d3 from 'd3';
class GenerateMap {


  constructor() {
    this.init = this.init.bind(this);
  }
  mapData = {};
  init() {
    var MAP_HEIGHT = 1000;
    var MAP_WIDTH = 2000;
    //his.mapData.width =2000;
    //this.mapData.height =1000;
    this.mapData.sites = d3.range(1000).map(function (d) {
      return [Math.random(2) * MAP_WIDTH, Math.random(2) * MAP_HEIGHT];
    });
    var voronoi = d3.voronoi().extent([
      [0, 0],
      [MAP_WIDTH, MAP_HEIGHT]
    ]);
    this.mapData.diagram = voronoi(this.mapData.sites);
    var color = d3.scaleSequential(d3.interpolateSpectral);
    this.mapData.cells = [];
    //debugger;
    this.mapData.cells = this.mapData.diagram.polygons().map(function (path, id) {
      var cell = {};
      cell.key = id;
      cell.d = "M" + path.join("L") + "Z";
      cell.fill = color(id / 2000);
      return cell;
    })
    return this.mapData.cells
  }
  // init(height,width){

  //   var svg = d3.select("svg"),
  //     sites = d3.range(1000).map(function(d) {
  //         return [Math.random() * width, Math.random() * height];
  //     }),
  //     voronoi = d3.voronoi().extent([[0, 0],[width, height]]),
  //     diagram = voronoi(sites), polygons = diagram.polygons(),
  //       // Add spectral color range[0,1] using d3-scale-chromatic
  //     color = d3.scaleSequential(d3.interpolateSpectral); 

  //     // Draw the colored polygons
  //   polygons.map(function(i, d) {
  //     svg.append("path")
  //     .attr("d", "M" + i.join("L") + "Z")
  //     .attr("fill", color(d/1000));
  //   });
  //       //relax(svg,sites,diagram,polygons,voronoi,color);
  //       //relax(svg,sites,diagram,polygons,voronoi,color);
  //       //addIsland();
  // }

  //     // Adding relax function
}

export default GenerateMap;