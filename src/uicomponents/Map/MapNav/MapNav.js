import React, { Component } from 'react';
import "./MapNav.scss"

/**
 * React Component that contains the map and controlls for map.
 * @prop height - map height.
 * @prop width - map width.
 * @state mapData - Array of cells to be drawn on map
 */
class MapNav extends Component {

  render() {
    return (
        <div className='mapNavBox'>
        <svg id="mapNav" width="100px" height="100px" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" >
        <g transform="scale(2.5) translate(-30,-25)">
        <path d="m60 45a10 10 0 0 1-5.0018 8.6613 10 10 0 0 1-10.002-0.0032 10 10 0 0 1-4.9963-8.6645l10 0.006376z" onClick={this.props.scaleDown}/>
        <path transform="scale(1,-1)" d="m60-43a10 10 0 0 1-5.0018 8.6613 10 10 0 0 1-10.002-0.0032 10 10 0 0 1-4.9963-8.6645l10 0.006376z" onClick={this.props.scaleUp}/>
        <path d="m49 35h2v2h2v2h-2v2h-2v-2h-2v-2h2z" fill="#fff" stroke-width="0" onClick={this.props.scaleUp}/>
        <path d="m47 49v2h6v-2z" fill="#f2f2f2" stroke-width="0" onClick={this.props.scaleDown}/>
        <g stroke="#000" stroke-width="1px">
          <path d="m62 40v7l6-4z" onClick={this.props.right}/>
          <path d="m38 40v7l-6-4z"onClick={this.props.left}/>
          <path d="m46 31h8l-4-5z"onClick={this.props.up}/>
          <path d="m46 57h8l-4 5z"onClick={this.props.down}/> 
        </g>
        </g>
        </svg>
        </div>
    );
  }
}

export default MapNav;



