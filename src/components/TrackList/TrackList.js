import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';


export default class TrackList extends React.Component{

  render() {
      return (
        <div className="TrackList">
          {this.props.tracks.map( track =>{
          return <Track key = {track.id}
          id = {track.id}
          uri = {track.uri}
          name={track.name}
          artist={track.artist}
          album={track.album}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          isRemoval = {this.props.isRemoval} />;
        })}
        </div>
      );
  }
}
