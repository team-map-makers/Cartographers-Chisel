import * as d3 from 'd3';

class GenerateMap {

  constructor() {
    this.init = this.init.bind(this);
    this.getPath = this.getPath.bind(this);
    this.init = this.init.bind(this);
    this.geoJsonDrawMap = this.geoJsonDrawMap.bind(this);
  }
  mapData ={};
  height = null;
  width = null;
  json = null;
  path = null;
  projection = null;


  /**
   * Returns a Mapdata for a voronoi diagram
   */
  init(){
    var MAP_HEIGHT = 180;
    var MAP_WIDTH = 360;
    //his.mapData.width =2000;
    //this.mapData.height =1000;
    this.mapData.sites = d3.range(1000).map(function(d) {
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
  geoJsonDrawMap(height,width){
    return fetch("/us.json").then(function(response) {
      return response.json();
    }).then(json=>this.getPath(json,height,width));
    
  }

  getPath(json,height,width){

    window.imports = JSON.stringify(json);
      //var projection = d3.geoOrthographic().translate([height/2,width/2]);
      var projection = d3.geoConicEqualArea().translate([height/2,width/2]);
      //var projection = d3.geoMercator().translate([height/2,width/2]).scale(100);
           //.postclip(d3.geoClipRectangle(x0, y0, x1, y1));          // scale thngs down so see entire US
    // Define path generator
      window.pathz = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
         .projection(projection); 
         
    
    window.d3 = d3;
    window.cellz = window.pathz(json);
    return window.cellz;
  }

}



export default GenerateMap;

