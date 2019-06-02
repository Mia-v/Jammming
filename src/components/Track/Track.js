import React from 'react';
import './Track.css';


export default class Track extends React.Component{
  constructor(props){
    super(props);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  renderAction(){
    if(this.props.isRemoval===true){
      return <button onClick={this.handleRemoveTrack} className='Track-action'>-</button>
    }else{
      return <button onClick = {this.handleAddTrack} className='Track-action'>+</button>
    }
  }

  handleAddTrack(){
    this.props.onAdd(this.props);
  }

  handleRemoveTrack(){
    this.props.onRemove(this.props);
  }

  render(){
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>{this.props.artist} | {this.props.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
