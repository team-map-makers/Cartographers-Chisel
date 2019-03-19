import React, { Component } from 'react';
import './Map.scss';
import GenerateMap from '../../mapfunctions/GenerateMap';
import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_NONE} from 'react-svg-pan-zoom';
/**
 * React Component that contains the map and controlls for map.
 * @prop height - map height.
 * @prop width - map width.
 * @state mapData - Array of cells to be drawn on map
 * @state tool - Tool define how interacting with map
 * @state value - Value used by ReactSVGPanZoom
 */
class Map extends Component {

  Viewer = null;
  constructor(props) {
    super(props);
    this.state = {
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
      }
    };

    // This binding is necessary to make `this` work in the callback
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  /**
   * Default React function, called when component loads.
   * Generates the starting mapData state.
   */
  componentDidMount(){
    this.Viewer.zoomOnViewerCenter(.6);
    var generateMap = new GenerateMap();
    var mapDataz = {};
    mapDataz.cells =generateMap.init();

    
    generateMap.geoJsonDrawMap().then((result) => {
      console.log(result);
      var mapDataz1 = {};
      mapDataz1.cells= [];
      mapDataz1.cells[0]= {};  
      mapDataz1.cells[0].key=1;
      mapDataz1.cells[0].d=result;
      mapDataz1.cells[0].fill="black";
      this.setState({mapData:mapDataz1});
    });
    this.setState({mapData:mapDataz});
  }
  /**
   * Method defined by React-svg-pan-zoom to change between click, zoom, pan.
   * @param {} nextTool Options defined by React-svg-pan-zoom
   */
  changeTool(nextTool) {
    this.setState({tool: nextTool})
  }
  /**
   * Method defined by React-svg-pan-zoom.
   * @param {} nextValue Options defined by React-svg-pan-zoom
   */
  changeValue(nextValue) {
    this.setState({value: nextValue})
  }
  /**
   * Method defined by React-svg-pan-zoom.
   */
  fitToViewer() {
    this.Viewer.fitToViewer()
  }

  /**
   * Method defined by React-svg-pan-zoom.
   */
  fitSelection() {
    this.Viewer.fitSelection(40, 40, 200, 200)
  }
  /**
   * Method defined by React-svg-pan-zoom.
   */
  zoomOnViewerCenter() {
    this.Viewer.zoomOnViewerCenter(1.1)
  }
  /**
   * Default React Method called when states or props update. 
   */
  render() {
    //gets the mapdata state and turns it into jsx svg nodes
    const cells = this.state.mapData.cells.map((cell) =>
    <path d={cell.d} fill={cell.fill} key={cell.key } stroke-opacity="0.0"/>
    );
    
    var miniatureProps = {};
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
      </div>
    );
  }
}

export default Map;
