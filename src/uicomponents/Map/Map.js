import React, { Component } from 'react';
import './Map.scss';
import GenerateMap from '../../mapfunctions/GenerateMap';
import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE} from 'react-svg-pan-zoom';
import {GithubPicker} from 'react-color';

class Map extends Component {

  Viewer = null;
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      tool: TOOL_NONE, 
      value: INITIAL_VALUE,
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
      },
      selector:{
        key:null,
      }
    };

    // This binding is necessary to make `this` work in the callback
    this.componentDidMount = this.componentDidMount.bind(this);
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
  colorChange(color){
    let {key} = this.state.selector;
    debugger;
    let {cells} = this.state.mapData;
    cells = cells.map(cell=>{
      if(cell.key===key) cell.fill = color.hex;
      return cell
    })
    this.setState({mapData:{cells}});
  }
  pathOnClick(key){
    this.setState({selector:{key}})
  }
  render() {
    const cells = this.state.mapData.cells.map((cell) =>
    <path d={cell.d} fill={cell.fill} key={cell.key} onClick={this.pathOnClick.bind(this,cell.key)}/>
    )
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

          onClick={event => console.log('click', event.x, event.y, event.originalEvent)}
        >
      <svg width={2000} height={1000}>
      {cells}
      </svg>
      </ReactSVGPanZoom>
      <div className={"Color-Picker"} style={{
          left:"40px", 
          top:"50px", 
          visibility:this.props.mode === "edit"? "visible" :"hidden"}}
        >
          <GithubPicker onChange={this.colorChange.bind(this)} />
      </div>
      </div>
    );
  }
}

export default Map;
