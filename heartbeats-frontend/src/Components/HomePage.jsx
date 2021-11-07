import React from "react";
import GraphComponent from "./GraphComponent";
import defaultImage from "../Assets/testImage.jpg";
import TopBar from "./TopBar";
import SpotifyPlayer from "react-spotify-web-playback";

// props:
// signout: function to remove spotify auth token cookie
// token: spotify token
// fPlaylist: favorite playlist
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      tracks: [],
      bpmMap: {},
      favoritePlaylistLink:
        this.props.fPlaylist != null
          ? this.props.fPlaylist.uri
          : "spotify:artist:6HQYnRM4OzToCYPpVBInuU",
      favoritePlaylistId:
        this.props.fPlaylist != null ? this.props.fPlaylist.id : null,
      albumCover: defaultImage,
    };
  }

  componentDidMount = () => {
    if (
      this.state.favoritePlaylistId == null ||
      this.state.favoritePlaylistLink == null
    ) {
      return;
    } else {
      console.log(this.state)
      this.setState({tracks: ["fdsaf"]});
      // var url =
      //   "https://api.spotify.com/v1/playlists/" +
      //   this.state.favoritePlaylistId +
      //   "/tracks";
      // fetch(url, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: "Bearer " + this.props.token,
      //   },
      // })
      //   .then((response) => response.json())
        //.then((data) => {this.setState({ tracks: data.items })});
        console.log(this.state.tracks);
    }
  };
  // var url =
  //   "https://api.spotify.com/v1/audio-features?ids=" + idList.join();
  // fetch(url, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: "Bearer " + this.props.token,
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     var createMap = {}
  //     data.audio_features.forEach((track) => {
  //       var tempo = track.tempo;
  //       createMap[tempo] = track.uri;
  //     })
  //     return createMap
  //     }).then((finished) => {
  //       return finished
  //     })

  displayAlbum = (state) => {
    if (state && state.track && state.track.image) {
      this.setState({ albumCover: state.track.image });
    }
  };

  render() {
    return (
      <div className="mainContent">
        <TopBar logout={this.props.signout} />
        <div className="currentSong">{this.state.currentSong}</div>
        <div className="albumContainer">
          <img
            className="albumCover"
            src={this.state.albumCover}
            alt={defaultImage}
          ></img>
        </div>
        <GraphComponent />
        <SpotifyPlayer
          token={this.props.token}
          callback={this.displayAlbum}
          uris={[this.state.favoritePlaylistLink]}
          styles={{
            bgColor: "#000",
            sliderColor: "#ff6384",
            trackArtistColor: "#fff",
            trackNameColor: "#fff",
            color: "#fff",
          }}
        />
      </div>
    );
  }
}
