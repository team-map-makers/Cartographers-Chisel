import * as d3 from 'd3';
class GenerateMap {

  
  constructor() {
    this.generate = this.generate.bind(this);
    this.init = this.init.bind(this);
    this.generate();
  }
  generate(){
    window.d3= d3;
    return "hello"
  }
  init(){
    var sites = d3.range(1000).map(function(d) {
      return [Math.random() * 2000, Math.random() * 2000];
    }),
    voronoi = d3.voronoi().extent([[0, 0],[2000, 2000]]),
    diagram = voronoi(sites),
    color = d3.scaleSequential(d3.interpolateSpectral),
    cells = [];
    //debugger;
    cells = diagram.polygons().map(function(path, id) {
      var cell ={};
      cell.key = id;
      cell.d = "M" + path.join("L") + "Z";
      cell.fill=color(id/2000);
      return cell;
    })
    return cells
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
  // relax(svg,sites,diagram,polygons,voronoi,color) {
  //       //iteration.value = +iteration.value + 1;
  //   svg.selectAll("path").remove();
  //   sites = voronoi(sites).polygons().map(d3.polygonCentroid);
  //   diagram = voronoi(sites);
  //   polygons = d3.diagram.polygons(); 
       
  //       // Redraw polygons after relaxation
  //   polygons.map(function(i, d) {
  //   svg.append("path")
  //   .attr("d", "M" + i.join("L") + "Z")
  //  // .attr("fill", color(d/1000)); });
  // }
}

export default GenerateMap;

