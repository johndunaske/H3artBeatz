import React from "react";
import GraphComponent from "./GraphComponent";
import defaultImage from "../Assets/testImage.jpg";
import TopBar from "./TopBar";

// props:
// signout: function to remove spotify auth token cookie
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mainContent">
        <TopBar logout={this.props.signout}/>
        <div className="albumContainer">
          <img
            className="albumCover"
            src={defaultImage}
            alt={defaultImage}
          ></img>
        </div>
        <GraphComponent />
      </div>
    );
  }
}
