import React, { Component } from 'react';
import './App.css';
import Map from './uicomponents/Map/Map.js';
import ModeSelect from './uicomponents/ModeSelect/ModeSelect'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { width: 100, height: 100 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
    return (
      <div className="mainContainer">
        <Map width={this.state.width} height={this.state.height} />
        <ModeSelect/>
      </div>
    );
  }
}

export default App;
