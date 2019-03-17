import React, { Component } from 'react';
import './ModeSelect.scss';
//import svg from '../../logo.svg';

class ModeSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("help")
    var themtree = 89;
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
      
    }));
    themtree =themtree + 46;
    console.log(themtree);
  }
  render() {
    return (
      <div className="Mode-main">
        <i className="fas fa-paint-brush" ></i>
        <i className="fas fa-sticky-note"></i>
        <i className="fas fa-map"></i>
      </div>
    );
  }
}

export default ModeSelect;
