import React, { Component } from 'react';
import './App.css';
import Map from './uicomponents/Map/Map.js';
import ModeSelect from './uicomponents/ModeSelect/ModeSelect'

class App extends Component {

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
      <div className="mainContainer">
        
        <Map/>
        <div className="mainGrid">
          <ModeSelect/>
        </div>
      </div>
    );
  }
}

export default App;
