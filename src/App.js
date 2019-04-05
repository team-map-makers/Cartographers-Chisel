import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Map from './uicomponents/Map/Map.js';
import ModeSelect from './uicomponents/ModeSelect/ModeSelect'
import Search from './uicomponents/Search/Search';
import Navigation from './firebasecomponents/Navigation';

const App = () => (
  <Router>
      <Navigation />
  </Router>
);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { width: 100, height: 100, mode:"edit" };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.changeMode= this.changeMode.bind(this);
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
  changeMode(newMode){
    this.setState({mode:newMode});
  }
  render() {
    return (
      <div className="mainContainer" >
        <Map width={this.state.width} height={this.state.height} />
        <Search></Search>
        <ModeSelect mode={this.state.mode} changeMode={this.changeMode}/>
      </div>
    );
  }
}

export default App;
