import React, { Component } from 'react';
import './NoteBox.scss';


class NoteBox extends Component {
    constructor(props) {
        super(props);
        this.state= {noteMode: "view" , noteText:"note text", noteTitle:"title text"}
        

        this.setEdit = this.setEdit.bind(this);
        this.setView = this.setView.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.setNoteText = this.setNoteText.bind(this);
        this.setNoteTitle = this.setNoteTitle.bind(this);
        
    }
    setEdit(){
      this.setState({noteMode: "edit"});
      if(this.props.note){
        this.setNoteText(this.props.note.text);
        this.setNoteTitle(this.props.note.title);
      }
    }
    onSave(){
      var noteTemp = this.props.note;
      noteTemp.text = this.state.noteText;
      noteTemp.title = this.state.noteTitle;
      this.props.updateNote.bind(this,noteTemp);
      this.setView();
    }
    setView(){
      this.setState({noteMode: "view"});
    }
    handleChange(event) {
      this.setState({noteText: event.target.value});
    }
    handleTitleChange(event){
      this.setState({noteTitle: event.target.value});
    }
    setNoteText(text){
      this.setState({noteText:text});
    }
    setNoteTitle(title){
      this.setState({noteTitle:title});
    }
    componentDidUpdate(){
      
    }
    render() {
        var isVisible =((this.props.mode=== "note") && this.props.note != null);
        var isEdit = this.state.noteMode ==="edit";
        
        if(isVisible && isEdit){
        return (
            
          <div className="noteBox-main" >
            <div className="noteBox-TopBar">

              <textarea className="noteBox-Title" value={this.state.noteTitle} onChange={this.handleTitleChange}/>
              <div className = "noteBox-barSpacer">
              
              </div>
              <button className="noteBox-Delete" onClick={this.props.removeNote.bind(this,this.props.note)}>
                DEL
              </button>
              <button className="noteBox-Exit" onClick={this.props.exitEvent.bind(this)}>
                  X
              </button>
              <button className = "noteBox-Edit" onClick={this.onSave}>
              SAVE
              </button>

            </div>
            <textarea className="noteBox-text" value={this.state.noteText} onChange={this.handleChange}/>
          </div>
        );
        }
        if(isVisible){
          
          return (
            
            <div className="noteBox-main" >
              <div className="noteBox-TopBar">
  
                <div className="noteBox-Title">
                  <b>{this.props.note.title}</b>
                </div>
                <div className = "noteBox-barSpacer">
                
                </div>
                <button className="noteBox-Exit" onClick={this.props.exitEvent.bind(this)}>
                    X
                </button>
                <button className = "noteBox-Edit" onClick={this.setEdit}>
                EDIT
                </button>
  
              </div>
              <div className="noteBox-text">
              {this.props.note.text}
              </div>
            </div>
          );

        }
      
        return null;
      }
}
export default NoteBox;