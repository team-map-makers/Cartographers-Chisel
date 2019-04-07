import React, { Component } from 'react';
import './Map.scss';
import GenerateMap from '../../mapfunctions/GenerateMap';
import * as d3 from "d3";
import MapNav from './MapNav/MapNav';
import EditLayer from './EditSelector/EditLayer';
/**
 * React Component that contains the map and controlls for map.
 * @prop height - map height.
 * @prop width - map width.
 * @state mapData - Array of cells to be drawn on map
 */
class Map extends Component {

  Viewer = null;
  constructor(props) {
    super(props);
    this.state = {
      mapData:{},
      scale:1,
      tranX:0,
      tranY:0
    };

    // This binding is necessary to make `this` work in the callback
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUI = this.updateUI.bind(this);
    this.pointerup_handler = this.pointerup_handler.bind(this);
    this.pointerdown_handler = this.pointerdown_handler.bind(this);
    this.pointermove_handler = this.pointermove_handler.bind(this);
    this.remove_event = this.remove_event.bind(this);

    this.scaleUp = this.scaleUp.bind(this);
    this.scaleDown = this.scaleDown.bind(this);

    this.moveDown = this.moveDown.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);

    this.onKeyPress = this.onKeyPress.bind(this);

  }

  generateMap;
  evCache =[];
  prevDiff;

  /**
   * Default React function, called when component loads.
   * Generates the starting mapData state.
   */
  componentDidMount(){
    //this.Viewer.zoomOnViewerCenter(.6);
    this.generateMap = new GenerateMap();
    
    this.generateMap.generateNewDiagram();
    this.updateUI();
    window.myMapGenerator =this.generateMap;
    window.mapContainer = this;
  }

  updateUI(){
    this.setState({polygons:this.generateMap.polygons});
  }

  componentDidUpdate(){
  }
  onPolyClick(index){
    window.myMapGenerator.addIsland(index);
    console.log(index);
    this.updateUI();
  }


  pointerup_handler(ev) {
    console.log(ev.type, ev);
    // Remove this pointer from the cache and reset the target's
    // background and border
    this.remove_event(ev);
    ev.target.style.background = "white";
    ev.target.style.border = "1px solid black";
  
    // If the number of pointers down is less than two then reset diff tracker
    if (this.evCache.length < 2) {
      this.prevDiff = -1;
    }
  }

  scaleUp(){
    let newScale = this.state.scale*1.2;
    this.setState({scale:newScale});
  }
  scaleDown(){
    let newScale = this.state.scale*0.8;
    this.setState({scale:newScale});
  }
  moveDown(){
    let newY = this.state.tranY-(50/this.state.scale);
    this.setState({tranY:newY});
  }
  moveUp(){
    let newY = this.state.tranY+(50/this.state.scale);
    this.setState({tranY:newY});
  }
  moveRight(){
    let newX = this.state.tranX-(50/this.state.scale);
    this.setState({tranX:newX});
  }
  moveLeft(){
    let newX = this.state.tranX+(50/this.state.scale);
    this.setState({tranX:newX});
  }
  remove_event(ev) {
    // Remove this event from the target's cache
    for (var i = 0; i < this.evCache.length; i++) {
      if (this.evCache[i].pointerId == ev.pointerId) {
        this.evCache.splice(i, 1);
        break;
      }
    }
   }
  onKeyPress(e){
    console.log(e.keyCode);
    switch (e.keyCode){
      case 40 :
      this.moveDown();
      break;
      case 39:
      this.moveRight();
      break;
      case 38:
      this.moveUp();
      break;
      case 37:
      this.moveLeft();
      break;
      case 188:
      this.scaleDown();
      break;
      case 190:
      this.scaleUp();
      break;
      default:

      }
  }
  pointerdown_handler(ev) {
    // The pointerdown event signals the start of a touch interaction.
    // This event is cached to support 2-finger gestures
    this.evCache.push(ev);
    console.log("pointerDown", ev);
   }
   pointermove_handler(ev) {
    // This function implements a 2-pointer horizontal pinch/zoom gesture. 
    //
    // If the distance between the two pointers has increased (zoom in), 
    // the taget element's background is changed to "pink" and if the 
    // distance is decreasing (zoom out), the color is changed to "lightblue".
    //
    // This function sets the target element's border to "dashed" to visually
    // indicate the pointer's target received a move event.
    console.log("pointerMove");
    ev.target.style.border = "dashed";
   
    // Find this event in the cache and update its record with this event
    for (var i = 0; i < this.evCache.length; i++) {
      if (ev.pointerId == this.evCache[i].pointerId) {
        this.evCache[i] = ev;
      break;
      }
    }
   
    // If two pointers are down, check for pinch gestures
    if (this.evCache.length == 2) {
      // Calculate the distance between the two pointers
      var curDiff = Math.abs(this.evCache[0].clientX - this.evCache[1].clientX);
   
      if (this.prevDiff > 0) {
        if (curDiff > this.prevDiff) {
          // The distance between the two pointers has increased
          console.log("Pinch moving OUT -> Zoom in");
          ev.target.style.background = "pink";
        }
        if (curDiff < this.prevDiff) {
          // The distance between the two pointers has decreased
          console.log("Pinch moving IN -> Zoom out");
          ev.target.style.background = "lightblue";
        }
      }
   
      // Cache the distance for the next move event 
      this.prevDiff = curDiff;
    }
   }
  /**
   * Default React Method called when states or props update. 
   */
  render() {
    //gets the mapdata state and turns it into jsx svg nodes
    var svgsPathElement = null;
    var color = d3.scaleSequential(d3.interpolateSpectral);
    if(this.state.polygons)
    svgsPathElement = this.state.polygons.map((poly) =>
    <path d={poly.path} fill={color(1-poly.height)} key={poly.index} onClick={(e) => this.onPolyClick(poly.index,e)}/>
    );
    
    return (
      <div className="Map-main" onKeyDown={this.onKeyPress} tabIndex="0">
      
        <svg width={this.props.width}  height={this.props.height} onPointerDown={this.pointerdown_handler}
        onPointerUp={this.pointerup_handler}
        onPointerMove={this.pointermove_handler} onKeyDown={this.onKeyPress} tabIndex="0">
        <g transform={"scale("+this.state.scale+")translate("+this.state.tranX+","+this.state.tranY+")"}>
          {svgsPathElement}
        </g>
        </svg>
        <MapNav scaleDown={this.scaleDown} scaleUp={this.scaleUp} down={this.moveDown} up={this.moveUp} right={this.moveRight} left={this.moveLeft}/>
        <EditLayer/>
      </div>
    );
  }
}

export default Map;
