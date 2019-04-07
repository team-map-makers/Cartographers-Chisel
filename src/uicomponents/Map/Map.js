import React, { Component } from 'react';
import './Map.scss';
import GenerateMap from '../../mapfunctions/GenerateMap';

import * as d3 from "d3";
import MapNav from './MapNav/MapNav';
import EditLayer from './EditSelector/EditLayer';
import NoteBox from '../NoteBox/NoteBox';
/**
 * React Component that contains the map and controlls for map.
 * @prop height - map height.
 * @prop width - map width.
 * @state mapData - Array of cells to be drawn on map
 */

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      scale:1,
      tranX:0,
      tranY:0,
      notePassed:null,
      noteData:[
        {
          id:1,
          title: "I am 1",
          location:{x:1,y:7},
          text: "There once was a man named micheal finQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQqQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@Q@Q@@Q@Q@Q@Q@Q@Q@Q@Q@Q@Q@QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQKHYGTHJKLMJNBGVGBHNJMK<LMHNBGFCGBHUJMK,imujnbhygtvfrcdrfbghnujmunhybgtvfQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ"
        },
        {
          id:2,
          title: "I am two",
          location:{x:100,y:50},
          text: "There once was a man named micheal fin"
        },
        {
          id:3,
          title: "Buring ssssssmad",
          location:{x:50,y:100},
          text: "There once was a man named micheal fin"
        },
        {
          id:4,
          title:"Supernote",
          location:{x:400,y:600},
          text: "Pizza hut"

        }
      ],
      mapData:{
        cells:[
          {
            key:1,
            d:"M57.06610526416048,555.6155330835484L64.23242433919692,561.8814168279811L72.81600883781897,559.8844475231751L78.10726454039109,549.6921101727296L69.96458522691259,538.2010295284479L61.13835960974468,540.963313989055Z", 
            fill:"rgb(159, 2, 66)"
          },
          {
            key:2,
            d:"M156.32158805447006,253.32372194201378L158.2523219260254,260.3415260204969L169.9575306996677,263.89594446235697L176.73031694780286,255.37241319764377L170.6490323207311,241.6743870940459Z",
            fill:"rgb(159, 2, 66)"
          },
          {
            key:3,
            d:"M297.55270531621795,765.488301778003L302.8026590032835,776.6217363208199L315.17253590259645,782.5111398262717L319.8274283162062,781.5838872894035L328.29860175257403,773.5217188762529L310.89283325223647,757.9542932776071L297.66627911715375,763.3831976136082Z",
            fill:"rgb(159, 2, 66)",
          }
        ]
      }
    };

    // This binding is necessary to make `this` work in the callback
    this.componentDidMount = this.componentDidMount.bind(this);
    this.calcNote = this.calcNote.bind(this);
    this.findNoteId = this.findNoteId.bind(this);
    this.deselectNote = this.deselectNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.updateUI = this.updateUI.bind(this);

    this.onAddHeight = this.onAddHeight.bind(this);
    this.onSlider = this.onSlider.bind(this);

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


  onAddHeight(mode){
    this.setState({editMode:mode});
  }
  onSlider(value){
    this.setState({editValue: value});
  }
  onPolyClick(index,e){
    if(this.props.mode === "edit"){
      switch(this.state.editMode){
        case "Down":
        this.generateMap.addHeight(index,this.state.editValue, -.1);
        break;
        case "Up":
        this.generateMap.addHeight(index,this.state.editValue, .1);
        break;
        default:

          window.myMapGenerator.addIsland(index);
      }
      console.log(index);
      this.updateUI();
    }
    if(this.props.mode === "note"){
      //add note

      console.log(e.clientY,e.clientX);
      let noteArray=this.state.noteData;
       let newNote = {
         id:noteArray.length+1,
         title:"",
         location:{x:((e.clientX)/this.state.scale) -this.state.tranX,y:((e.clientY)/this.state.scale) - this.state.tranY},
         text: ""
       }
       
       noteArray.push(newNote);
       this.setState({noteData:noteArray})
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

  calcNote(x ,y){
    return "x = "+x+", y = "+y;

  }

  getNoteID(id){
    if(this.props.mode=='note'){
    this.setState({notePassed:id});
    }
  }
  findNoteId(e){
    return e.id == this.state.notePassed;
  }
  deselectNote(){
    this.setState({notePassed:null});
  }
  updateNote(note){
    this.setState({noteData:[note]});
  }
  removeNote(note) {
    var array = [...this.state.noteData];
    console.log(array); // make a separate copy of the array
    console.log(note);
    var index = array.indexOf(note);
    if (index !== -1) {
      array.splice(index, 1);
      console.log(array);
      this.setState({noteData: array});
    }
  }
  render() {
    var svgsPathElement = null;
    var color = d3.scaleSequential(d3.interpolateSpectral);
    if(this.state.polygons)
    svgsPathElement = this.state.polygons.map((poly) =>
    <path d={poly.path} fill={color(1-poly.height)} key={poly.index} onClick={(e) => this.onPolyClick(poly.index,e)}/>
    );

    var notes = null;
    if(!(this.props.mode == "edit")){
    notes = this.state.noteData.map((note)=> 
    <circle cx={note.location.x} cy={note.location.y} r="5" stroke="red" fill="red" strokeWidth="5" onClick={this.getNoteID.bind(this, note.id)}/>
    )
    var notePassedFull = null;
    if(this.state.notePassed!=null){
      notePassedFull=this.state.noteData.find(this.findNoteId);
    }
  }

    
    
    var miniatureProps = {};
    //miniatureProps.position ="none";
    return (
      <div className="Map-main" onKeyDown={this.onKeyPress} tabIndex="0">
      <svg width={this.props.width}  height={this.props.height} onClick={(e)=>this.onSVGClickHandler}
        onPointerUp={this.pointerup_handler}
        onPointerMove={this.pointermove_handler} onKeyDown={this.onKeyPress} tabIndex="0">
        <g transform={"scale("+this.state.scale+")translate("+this.state.tranX+","+this.state.tranY+")"}>
          {svgsPathElement}
          {notes}
        </g>
        </svg>
        <MapNav scaleDown={this.scaleDown} scaleUp={this.scaleUp} down={this.moveDown} up={this.moveUp} right={this.moveRight} left={this.moveLeft}/>
        <EditLayer heightFun={this.onAddHeight} sliderSet={this.onSlider}/>
      <NoteBox mode={this.props.mode} note={notePassedFull} exitEvent={this.deselectNote} updateNote={this.updateNote} removeNote={this.removeNote}>
      </NoteBox>

      </div>
    );
  }
}

export default Map;
