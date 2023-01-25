const SpotifyWebApi = require("spotify-web-api-node");

class SessionManager {
  constructor(){
    this.spotifyApi = new SpotifyWebApi({clientId: process.env.CLIENT_ID, clientSecret: process.env.CLIENT_SECRET, redirectUri: process.env.SITE_URL + '/auth'});
    this._queue = [];
    this._history = [];
    this._status = {
      host : false,
      active : false,
      accessToken : '',
    };
    this._playback = {};
    this._buffer = [];
  }

  // Getters & Setters
  get queue(){
    return this._queue;
  }

  get history(){
    return this._history;
  }

  get status(){
    return this._status;
  }

  set accessToken(token){
    this._status.accessToken = token;
  }

  set host(newStatus) {
    this._status.host = newStatus;
  }

  set active(newStatus) {
    this._status.active = newStatus;
  }

  get playback(){
    return this._playback;
  }

  set playback(state){
    this._playback = state;
  }

  get buffer(){
    return this._buffer;
  }

  get spotify(){
    return this.spotifyApi;
  }

  // Methods
  addToQueue(item) {
    this._queue.push(item);
    this._buffer.push(item.uri);
    return true;
  }

  popQueue(){
    return this._queue.shift();
  }

  removeQueueItem(uri){
    const index = this._queue.map(item => item.uri).indexOf(uri);
    if (index > -1){
      this._queue.splice(index, 1);
    }
  }

  addToHistory(item){
    this._history.push(item);
  }

  updateHistory(){
    this._history.push(this._queue.shift());
  }

  // Spotify
  authenticate(code){
    return this.spotifyApi.authorizationCodeGrant(code).then((data) => {
      this._status.accessToken = data.body['access_token']
      // Set the access token on the API object to use it in later calls
      this.spotifyApi.setAccessToken(data.body['access_token']);
      this.spotifyApi.setRefreshToken(data.body['refresh_token']);
      this.status.host = true; //Flag verifying token set (Concept in case we need to add more adminstrative features from client)
      console.log('Host set')
      return(200);
    }, (err) => {
      this._status.host = false;
      console.log('Host login error: ', err);
      return(400); 
    }).catch(() => {
      return(400);
    })
  }

  refreshToken(){
    this.spotifyApi.refreshAccessToken().then((data) => {
      console.log('Access token refreshed');
      this._status.accessToken = data.body['access_token'];
      this.spotifyApi.setAccessToken(data.body['access_token']);
    }, (err) => {
      console.log('Failed to refresh access token: ', err);
      this._status.host = false;
    })
  }

  pushToSpotify(uri){
    return this.spotifyApi.addToQueue(uri);
  }

}

module.exports = SessionManager;
