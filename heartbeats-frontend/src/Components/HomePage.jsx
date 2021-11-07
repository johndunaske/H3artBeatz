import React from "react";
import GraphComponent from "./GraphComponent";
import defaultImage from "../Assets/testImage.jpg";
import TopBar from "./TopBar";
import SpotifyPlayer from "react-spotify-web-playback";

// props:
// signout: function to remove spotify auth token cookie
// token: spotify token
// fPlaylist: favorite playlist

var socket;
var count = 0;
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favoritePlaylistLink:
        this.props.fPlaylist != null
          ? this.props.fPlaylist.uri
          : "spotify:artist:6HQYnRM4OzToCYPpVBInuU",
      favoritePlaylistId:
        this.props.fPlaylist != null ? this.props.fPlaylist.id : null,
      albumCover: defaultImage,
      avg: [],
      avgCalc: 0,
      hrReadings: [100],
      xAxis: [0],
      tracks:[],
    };
  }

  getTracks = () => {
    var url = `https://api.spotify.com/v1/playlists/${this.state.favoritePlaylistId}/tracks`
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.token,
      }
    }).then((response) => response.json())
    .then(data => {
      let temp = [];
      for (let i of data.items) {
        temp.push(i);
      }
      this.setState({tracks:temp});
    })
  }

  componentDidMount = () => {
    socket = new WebSocket("ws://h3artbeatz.herokuapp.com/websocket");

    socket.addEventListener("open", (event) => {
      console.log("Websocket Connected!");
    });

    socket.addEventListener("message", (event) => {
      var data = ""
      try {
        data = JSON.parse(event.data)["BPM"];
      } catch(e) {
        
      }
       
      var newList =[];
      if (this.state.avg.length < 15) {
        newList = this.state.avg.concat([data]);
        this.setState({avg:newList});
      }
      if (this.state.avg.length >= 15) {
        var sum = 0;
        for (var i = 0; i < 15; i++) {
          sum += this.state.avg[i]
        }
        var avgVal = sum / 15
        this.setState({avgCalc: avgVal});
      }
      if (count > 20) {
        var newList = this.state.hrReadings.concat([data]);
        var lastX = this.state.xAxis[this.state.xAxis.length - 1]
        var newX = this.state.xAxis.concat(this.state.xAxis[lastX])
        this.setState({hrReadings:newList});
        this.setState({xAxis:lastX});
        count = 0;
      }

      count++;
    });

    socket.addEventListener("close", (event) => {
      console.log("Websocket Disconnected!");
    });

    if (this.state.favoritePlaylistId != null && this.state.favoritePlaylistLink != null) {
      let tracksVar = this.getTracks();
      this.setState({tracks: tracksVar});
    }
  };

  displayAlbum = (state) => {
    if (state && state.track && state.track.image) {
      this.setState({ albumCover: state.track.image });
    }
  };

  render() {
    return (
      <div className="mainContent">
        <TopBar logout={this.props.signout} />
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
