import React, { Component } from 'react';
import './Map.scss';
import svg from '../../logo.svg';

class Map extends Component {

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
      <div className="Map">
          <img onClick={this.handleClick} src={svg} className="App-logo" alt="logo" />
          <p onClick={this.handleClick}>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={this.handleClick} >Hi</button>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
      </div>
    );
  }
}

export default Map;
