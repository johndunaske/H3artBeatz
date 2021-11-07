// import React from 'react';
// import './App.css';
// import SpotifyWebApi from 'spotify-web-api-js';

// // const SpotifyWebApi = require('spotify-web-api-node');
// const spotifyAPI = new SpotifyWebApi();

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     const params = this.getHashParams();
//     const token = params.access_token;
//     if (token) {
//       spotifyAPI.setAccessToken(token);
//     }
//     this.state = {
//       playback: {
//         name: "",
//         albumArt: ""
//       }
//     }
//   }

//   getHashParams() {
//     var hashParams = {};
//     var e, r = /([^&;=]+)=?([^&;]*)/g,
//       q = window.location.hash.substring(1);
//     e = r.exec(q)
//     while (e) {
//       hashParams[e[1]] = decodeURIComponent(e[2]);
//       e = r.exec(q);
//     }
//     return hashParams;
//   }

//   // Get the Spotify ID of an artist
//   // getArtistID(artist) {
//   //   spotifyAPI.searchArtists(artist)
//   //     .then((response) => {
//   //       var id = response.artists.items[0].id
//   //       this.setState({
//   //         spotifyID: id
//   //       });
//   //     });
//   // }

//   // Get the Spotify ID of a track
//   // getTrackID(track) {
//   //   spotifyAPI.searchTracks(track)
//   //     .then((response) => {
//   //       var id = response.tracks.items[0].id;
//   //       var artist = response.tracks.items[0].artists[0].name;
//   //       console.log(artist);
//   //       this.setState({
//   //         spotifyID: id
//   //       });
//   //     });
//   // }

//   getNowPlaying() {
//     spotifyAPI.getMyCurrentPlaybackState()
//       .then((data) => {
//         this.setState({
//           playback: {
//             name: data.item.name,
//             albumArt: data.item.album.images[0].url
//           }
//         });
//       })
//   }

//   // componentDidMount() {
//   //   this.getPlayback();
//   // }

//   render = () => {
//     return (
//       <div className="App">
//         <a href='http://localhost:8888' > Login to Spotify </a>
//         <div>
//           Now Playing: {this.state.playback.name}
//         </div>
//         <div>
//           <img src={this.state.playback.albumArt} style={{ height: 150 }} />
//         </div>
//         <button onClick={() => this.getNowPlaying()}>
//           Check Now Playing
//         </button>
//       </div>
//     );
//   }
// }

// export default App;
