import React, { Component } from 'react';
import './Search.scss';

class Search extends Component {

  place = "Search...";
  constructor(props) {
    super(props);
    this.state = {value:""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }
  handleSubmit(event){
    
    if(event.key === 'Enter') {
      console.log(this.state.value);        
  }
  }
  render() {
    return (
      <div className="Search-main" >
        <input type="text" value={this.state.value} 
          onChange={this.handleChange} placeholder={this.place} 
          className="Search-bar" onKeyDown={this.handleSubmit}> 
        </input>
        <div className="Search-autocomplete"></div>
      </div>
    );
  }
}

export default Search;
