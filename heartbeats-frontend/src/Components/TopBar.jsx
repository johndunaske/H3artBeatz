import React from "react";

// props:
// logout: function to remove the spotify auth cookie
export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="topBar">
        <div className="signInButton topBarButton" onClick={this.props.logout}>Sign Out</div>
        <div className="bpmButton topBarButton">Sport</div>
        <div className="pageHeader">
          <span className="heart">H3art</span>Beatz
        </div>
        <div className="invertedButton topBarButton">BPMFlip</div>
        <div className="therapyModeButton topBarButton">Therapy Mode</div>
      </div>
    );
  }
}
