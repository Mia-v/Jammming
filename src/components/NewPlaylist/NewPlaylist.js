import React from 'react';
import './NewPlaylist.css';
import TrackList from '../TrackList/TrackList.js';


export default class NewPlaylist extends React.Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSavePlaylist = this.handleSavePlaylist.bind(this);
  }

  handleNameChange(e){
    this.props.onNameChange(e.target.value);
  }

  handleSavePlaylist(e){
    this.props.onSave();
    e.preventDefault();
  }

  render(){
    return(
      <div className="Playlist">
        <input defaultValue = {this.props.newPlaylistName} onChange={this.handleNameChange} />
          <TrackList tracks = {this.props.newPlaylistTracks}
            isRemoval={true}
            onRemove={this.props.onRemove}/>
        <button className="Playlist-save" onClick={this.handleSavePlaylist}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
