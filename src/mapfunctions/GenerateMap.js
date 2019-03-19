import * as d3 from 'd3';

class GenerateMap {

  constructor() {
    this.init = this.init.bind(this);
  }
  mapData ={};

  /**
   * Returns a Mapdata for a voronoi diagram
   */
  init(){
    var MAP_HEIGHT = 1000;
    var MAP_WIDTH = 2000;
    //his.mapData.width =2000;
    //this.mapData.height =1000;
    this.mapData.sites = d3.range(10).map(function(d) {
      return [Math.random() * MAP_WIDTH, Math.random() * MAP_HEIGHT];
    });
    var voronoi = d3.voronoi().extent([[0, 0],[MAP_WIDTH, MAP_HEIGHT]]);
    this.mapData.diagram = voronoi(this.mapData.sites);
    var color = d3.scaleSequential(d3.interpolateSpectral);
    this.mapData.cells = [];
    //debugger;
    this.mapData.cells = this.mapData.diagram.polygons().map(function(path, id) {
      var cell ={};
      cell.key = id;
      cell.d = "M" + path.join("L") + "Z";
      cell.fill=color(1);
      return cell;
    })
    return this.mapData.cells;
  }
  /**
   * Work In Progress-----
   * A function that takes a geoJSON and returns its svg that data
   * @param {*} jsonLocation 
   */
  geoJsonDrawMap(jsonLocation){
    return fetch("/us.json").then(function(response) {
      return response.json();
    }).then(function(myJson) {
      window.imports = JSON.stringify(myJson);
      var projection = d3.geoAlbersUsa()
				   .translate([2000/2, 1000/2])    // translate to center of screen
				   .scale([1000]);          // scale things down so see entire US
    // Define path generator
    window.pathz = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
      	 .projection(projection);  // tell path generator to use albersUsa projection
    window.d3 = d3;
    window.cellz = window.pathz(myJson);
    return window.cellz;
    });
    
  }
}

export default GenerateMap;

