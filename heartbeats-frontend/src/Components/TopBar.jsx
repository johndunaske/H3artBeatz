import React from "react";
import { Link } from "react-router-dom"

// props:
// logout: function to remove the spotify auth cookie
export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {//<div className="settingsButton topBarButton">Playlists</div>
    return (
      <div className="topBar">
        <div className="signInButton topBarButton" onClick={this.props.logout}>Sign Out</div>
        <div className="profileButton topBarButton"></div>
        <div className="bpmButton topBarButton">Sport</div>
        <div className="pageHeader">
          <span className="heart">H3art</span>Beatz
        </div>
        <div className="invertedButton topBarButton">BPMFlip</div>
        <div className="therapyModeButton topBarButton">Therapy</div>
        <Link to="/playlist" className="settingsButton topBarButton">Playlists</Link>
      </div>
    );
  }
}
