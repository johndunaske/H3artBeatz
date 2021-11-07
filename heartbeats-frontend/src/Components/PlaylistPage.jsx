import React from "react";
import { Link } from "react-router-dom";

export default class PlaylistPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        currentlySelected: null,
    };
  }

  componentDidMount = () => {
    this.props.playlistMethod();
  };

  render() {
    return (
      <div className="playlistPageContent">
        <div className="topBar">
          <div className="pageHeader">
            <span className="heart">H3art</span>Beatz
          </div>
        </div>
        <Link to="/" className="backButton">
            Back
          </Link>
          <div className="playlistHeader">Playlists:</div>
        <div className="playlistsContainer">
        {this.props.playlists.map((playlist) => {
          return (
            <div className={this.state.currentlySelected === playlist.name ? "playlistItem selected" : "playlistItem"} key={playlist.name}>
              <div className="pName">{playlist.name}</div>
              <div className="selectButton" onClick={() => {
                  this.props.favoritePlaylist(playlist);
                  this.setState({currentlySelected:playlist.name});
            }}>Favorite</div>
            </div>
          );
        })}
        </div>
      </div>
    );
  }
}
