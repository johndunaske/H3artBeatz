import "./App.css";
import React from "react";
import HomeComponent from "./Components/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeComponent/>}/>
        </Routes>
      </Router>
    </div>;
  }
}
