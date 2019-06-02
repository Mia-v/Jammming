import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import NewPlaylist from '../NewPlaylist/NewPlaylist.js';
import Spotify from '../../util/Spotify.js'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      searchResults: [],
      newPlaylistName: 'New Playlist',
      newPlaylistTracks: [],
      userId: ''
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.searchSpotify = this.searchSpotify.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  addTrack(track){
    if(this.state.newPlaylistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }else{
      const tracks =  this.state.newPlaylistTracks;
      tracks.push(track);
      this.setState({newPlaylistTracks: tracks});
    }
  }

  removeTrack(track){
    const updatePlaylist = this.state.newPlaylistTracks.filter(t => t.id !== track.id);
    this.setState({newPlaylistTracks: updatePlaylist});
  }

  updatePlaylistName(name){
    this.setState({newPlaylistName: name});
  }

  searchSpotify(searchInput){
    Spotify.search(searchInput)
      .then(tracks => {
        this.setState({searchResults: tracks})
      });
  }

  savePlaylist(){
    const tracksURIs = this.state.newPlaylistTracks.map(track => track.uri);
    const uris = {uris: tracksURIs};
    Spotify.savePlaylist(this.state.newPlaylistName, uris);
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify = {this.searchSpotify}/>
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.searchResults} onAdd = {this.addTrack}/>
            <NewPlaylist
                newPlaylistName={this.state.newPlaylistName}
                newPlaylistTracks = {this.state.newPlaylistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
  )};
}

export default App;
