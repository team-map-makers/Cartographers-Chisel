import React, { Component } from 'react';
import './ModeSelect.scss';
//import svg from '../../logo.svg';

class ModeSelect extends Component {

  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(newMode) {
    alert(newMode)
  }
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
