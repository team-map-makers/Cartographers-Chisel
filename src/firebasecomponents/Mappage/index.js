
import React, {Component } from 'react';
import { compose } from 'recompose';
import Map from '../../uicomponents/Map/Map';
import ModeSelect from '../../uicomponents/ModeSelect/ModeSelect';

import { withAuthorization, withEmailVerification } from '../Session';

class MapPage extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 100, height: 100, mode:"edit", };
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
            <Map width={this.state.width} height={this.state.height} mode={this.state.mode}/>
            <ModeSelect mode={this.state.mode} changeMode={this.changeMode}/>
        </div>
      );
    }
}

const condition = authUser => !!authUser;
export default compose(withEmailVerification, withAuthorization(condition),)(MapPage);