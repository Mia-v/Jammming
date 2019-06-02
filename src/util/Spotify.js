const Spotify = {

  accessToken: null,

  getAccessToken(){
    const parsedHashString = window.location.hash
      .substring(1)
      .split('&')
      .map(el => el.split('='))
      .reduce((acc, curr, i) => {
        acc[curr[0]] = curr[1];
        return acc;
      }, {});
    this.accessToken = parsedHashString['access_token'];
    let expiresIn = parsedHashString['expires_in'];
    window.setTimeout(() => {
        this.accessToken = '';
        window.history.pushState('Access Token', null, '/');
      }, expiresIn * 1000);
    if(this.accessToken){
      return this.accessToken;
    }else{
      const clientId = 'ce9e022c950441ae99a0a8e376ccf9b6';
      const redirectUrl = 'http:%2F%2Flocalhost:3000';
      const scope = 'user-read-private%20user-read-email%20playlist-modify-private';
      const implicitFlowUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope}&response_type=token&state=123`;
      window.location.href = implicitFlowUri;
    }
  },

  search(searchInput){
    this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })
    .then(response => response.json())
    .then(jsonResponse =>{
      if(jsonResponse.tracks){
        return jsonResponse.tracks.items.map(track =>{
          return {
            id: track.id,
            uri: track.uri,
            name: track.name,
            album: track.album.name,
            artist: track.artists[0].name,
          }
        });
      }
    });
  },

  savePlaylist(newPlaylistName, uris){
    this.getUserId()
    .then(userId => {
      this.addPlaylistToSpotify(userId, newPlaylistName)
      .then(playlistId =>{
        this.addTracksToPlaylist(playlistId, uris)
      }
    );
    });
  },

  getUserId(){
    return fetch (`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })
    .then(response => response.json())
    .then(response => response.id);
  },


  addPlaylistToSpotify(userId, newPlaylistName){
    const payload = {name: newPlaylistName, public: false};
    return fetch (`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(response => response.id);
  },

  addTracksToPlaylist(playlistId, uris){
    return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,{
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(uris)
    });
  },
}

export default Spotify;
