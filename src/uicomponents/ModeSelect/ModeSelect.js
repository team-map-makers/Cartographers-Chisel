import React, { Component } from 'react';
import './ModeSelect.scss';
//import svg from '../../logo.svg';

/**
 * React Component that lets you pick mode for application. 
 */
class ModeSelect extends Component {

  render() {
    return (
      <div className="Mode-main" >
        <i className={this.props.mode === "edit" ? 'active fas fa-paint-brush' : 'fas fa-paint-brush'} 
           onClick={this.props.changeMode.bind(this, "edit")}></i>
        <i className={this.props.mode === "note" ? 'active fas fa-sticky-note' : 'fas fa-sticky-note'}
           onClick={this.props.changeMode.bind(this,"note")}></i>
        <i className={this.props.mode === "map" ? 'active fas fa-map' : 'fas fa-map'}
           onClick={this.props.changeMode.bind(this,"map")}></i>
      </div>
    );
  }
}

export default ModeSelect;
