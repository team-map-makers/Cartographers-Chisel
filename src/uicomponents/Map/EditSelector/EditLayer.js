import React, { Component } from 'react';
import "./EditLayer.scss"

/**
 * React Component that contains the map and controlls for map.
 * @prop height - map height.
 * @prop width - map width.
 * @state mapData - Array of cells to be drawn on map
 */
class EditLayer extends Component {
    constructor(props) {
        super(props);
        this.state= {buttonMode :"SVGGIsland", sliderValue: "2"}
        this.setAlgorithm = this.setAlgorithm.bind(this);

    }
//onClick of specific button we need to select correct height changing algorithm    

setAlgorithm(e){
    if(e.target.id === "Down"){
        this.setState({buttonMode:"Down"});
        this.props.heightFun("Down");
        console.log("Down");
        //set algorithm to decreasing height
        //change color of button to green
    }
    if(e.target.id === "Up"){
        this.setState({buttonMode:"Up"});
        this.props.heightFun("Up");
        console.log("Up");
        //set algorithm to increasing height


    }
    if(e.target.id === "SVGGIsland"){
        this.setState({buttonMode:"SVGGIsland"});
        this.props.heightFun("SVGGIsland");
        console.log("SVGGIsland");
        //set to island algorithm
    }
}

handleChange = (event) => {
    this.setState({sliderValue: event.target.value});
    this.props.sliderSet(this.state.sliderValue);
};

  render() {
    
    const { value } = this.state;
    const { classes } = this.props;


    return (
        <div>
        <div className='EditButton-close'>
            <svg className={this.state.buttonMode == "SVGGIsland" ? 'EL-active' : 'no'} id="SVGGIsland" width="48px" height="48px" version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" onClick={this.setAlgorithm} >
                <g className="stupidFix">
                    <path className="stupidFix" d="m10 43h28c-0.94094-5.6358-5.9168-8.1957-14-8-6.4547-0.11048-11.292 1.8751-14 8z"  stroke="#000000" stroke-width="1px"/>
                    <path  className="stupidFix" d="m21 35c-1.6346-7.7077-0.50393-11.48 1-19l4-1c-3.0314 7.3298-0.27926 13.832 2 20z"  stroke="#000000" stroke-width="1px"/>
                    <path className="stupidFix" d="m35.465 15.765-8.9453 1.9859 0.13336 6.1427-4.653-7.8938-5.8008 2.025 6.0696-6.8646-3.7185-4.8911 8.4042 3.6513 3.5027-5.0479-0.87552 9.1212z" stroke="#000000" stroke-linecap="square" stroke-linejoin="round" stroke-width=".75591"/>
                </g>
            </svg>
            <svg className={this.state.buttonMode == "Up" ? 'EL-active' : 'no'} id="Up" width="48px" height="48px" version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" onClick={this.setAlgorithm}>
                <g stroke="#000" stroke-width="1px" className="stupidFix">
                    <path className="stupidFix" d="m10 43h28c-0.94094-5.6358-5.9168-8.1957-14-8-6.4547-0.11048-11.292 1.8751-14 8z"/>
                    <path className="stupidFix" d="m20 31h9v-12l5 2-10-16-10 16 6-2z"/>
                </g>
            </svg>
            <svg className={this.state.buttonMode == "Down" ? 'EL-active' : 'no'} id="Down" width="48px" height="48px" version="1.1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" onClick={this.setAlgorithm} >
                <g className="stupidFix" stroke="#000">
                    <path className="stupidFix" d="m10 43h28c-0.94094-5.6358-5.9168-8.1957-14-8-6.4547-0.11048-11.292 1.8751-14 8z" stroke-width="1px"/>
                    <path className="stupidFix" d="m20 7.9172h9v10.083l5-1.6805-10 13.444-10-13.444 6 1.6805z" stroke-width=".91664px"/>
                </g>
            </svg>
        </div>
        { <div className={this.state.buttonMode== "SVGGIsland" ? "EditButton-slider-hidden":"EditButton-slider"}>
            <input
            
                type="range" 
                min="0" 
                max="10" 
                value={this.state.sliderValue} 
                step={1}
                onChange={this.handleChange}
            />
        </div> }
    </div>
    );
  }
}

export default EditLayer;



