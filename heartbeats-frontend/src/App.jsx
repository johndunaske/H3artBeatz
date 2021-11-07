import "./App.css";
import React from "react";
import HomeComponent from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const cookies = new Cookies()

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookies.get('spotifyToken'),
    }
  }

  setToken = (token) => {
    cookies.set('spotifyToken', token, {path:'/'});
    this.setState({token: token});
  }

  removeToken = () => {
    cookies.remove('spotifyToken');
    this.setState({'token': null});
  }

  render() {
    return <div className="App">
      <Router>
        <Routes>
          {this.state.token != null ? 
          <Route path="/" element={<HomeComponent signout={this.removeToken}/>}/> :
          <Route path="/" element={<LoginPage updateToken={this.setToken}/>}/>}
        </Routes>
      </Router>
    </div>;
  }
}
