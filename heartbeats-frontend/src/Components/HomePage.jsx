import React from "react";
import GraphComponent from "./GraphComponent";

export default class HomePage extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className="mainContent">
                <div className="albumContainer">HERES AN ALBUM</div>
                <GraphComponent/>
            </div>
        );
    }
}