import React, { Component } from 'react';
import './Map.scss';
import GenerateMap from '../../mapfunctions/GenerateMap';

import mapFile from '../Map/fm.svg';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
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
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    fetch(mapFile)
   .then(response => response.text())
   .then(svgData => {this.setState({svg:svgData});});
    window.mapData =this.state.mapData;
    window.findIdd = function(elements){
      return elements.id ===1;
    }
    var generateMap = new GenerateMap();
    var mapData = {};
    mapData.cells =generateMap.init();
    this.setState({mapData:mapData});
  }
  handleClick() {
    console.log("help");
    var themtree = 89;
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
      
    }));
    themtree =themtree + 46;
    console.log(themtree);
  }
  render() {
    const cells = this.state.mapData.cells.map((cell) =>
    <path d={cell.d} fill={cell.fill} key={cell.key}/>
)
    return (
      <div className="Map-main">
      <svg viewBox="0 0 2000 2000">
      {cells}
      </svg>
      </div>
    );
  }
}

export default Map;
