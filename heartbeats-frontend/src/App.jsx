import "./App.css";
import React from "react";
import HomeComponent from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PlaylistPage from "./Components/PlaylistPage";

const cookies = new Cookies()

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: cookies.get('spotifyToken'),
      playlists: [],
      favoritePlaylist:null
    }
  }

  getPlaylists = () => {
    fetch("https://api.spotify.com/v1/me/playlists", {
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + this.state.token,
    }}).then((response) => response.json())
    .then((data) => {
      this.setState({playlists: data.items});
    })
  }

  setFavoritePlaylist = (playlistURL) => {
    this.setState({favoritePlaylist : playlistURL});
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
          <Route path="/playlist" element={<PlaylistPage playlistMethod={this.getPlaylists} playlists={this.state.playlists} favoritePlaylist={this.setFavoritePlaylist}/>}/>
          {this.state.token != null ? 
          <Route path="/" element={<HomeComponent signout={this.removeToken} token={this.state.token} fPlaylist={this.state.favoritePlaylist}/>}/> :
          <Route path="/" element={<LoginPage updateToken={this.setToken}/>}/>}
        </Routes>
      </Router>

    </div>;
  }
}
