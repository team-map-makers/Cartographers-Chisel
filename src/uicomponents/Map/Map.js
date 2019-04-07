import React, { Component } from 'react';
import './Map.scss';
import GenerateMap from '../../mapfunctions/GenerateMap';
import NoteBox from '../NoteBox/NoteBox';
import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE} from 'react-svg-pan-zoom';

class Map extends Component {

  Viewer = null;
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      tool: TOOL_NONE, 
      value: INITIAL_VALUE,
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
  }

  componentDidMount(){
    this.Viewer.zoomOnViewerCenter(.6);
    var generateMap = new GenerateMap();
    var mapDataz = {};
    mapDataz.cells =generateMap.init();
    this.setState({mapData:mapDataz});
  }


  changeTool(nextTool) {
    this.setState({tool: nextTool})
  }

  changeValue(nextValue) {
    this.setState({value: nextValue})
  }

  fitToViewer() {
    this.Viewer.fitToViewer()
  }

  fitSelection() {
    this.Viewer.fitSelection(40, 40, 200, 200)
  }

  zoomOnViewerCenter() {
    this.Viewer.zoomOnViewerCenter(1.1)
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
    const cells = this.state.mapData.cells.map((cell) =>
    <path d={cell.d} fill={cell.fill} key={cell.key} />
    )
    const notes = this.state.noteData.map((note)=> 
    <circle cx={note.location.x} cy={note.location.y} r="20" stroke="red" fill="red" strokeWidth="5" onClick={this.getNoteID.bind(this, note.id)}/>
    )
    var notePassedFull = null;
    if(this.state.notePassed!=null){
      notePassedFull=this.state.noteData.find(this.findNoteId);
    }
    var miniatureProps = {};
    //miniatureProps.position ="none";
    return (
      <div className="Map-main">
      <ReactSVGPanZoom
          width={this.props.width} height={this.props.height}
          ref={Viewer => this.Viewer = Viewer}
          tool={this.state.tool} onChangeTool={tool => this.changeTool(tool)}
          value={this.state.value} onChangeValue={value => this.changeValue(value)}

          miniatureProps={miniatureProps}
          onZoom={e => console.log('zoom')}
          onPan={e => console.log('pan')}

          onClick={event => console.log(this.calcNote(event.x, event.y))}
         

        >
      <svg width={2000} height={1000} >
      {cells}
      {notes}
      
      </svg>
      </ReactSVGPanZoom>
      <NoteBox mode={this.props.mode} note={notePassedFull} exitEvent={this.deselectNote} updateNote={this.updateNote} removeNote={this.removeNote}>
      </NoteBox>

      </div>
    );
  }
}

export default Map;
