import React from "react";


export const authEndpoint = 'https://accounts.spotify.com/authorize?';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "0f76c14b4897491db4970cd235a10161";
const redirectUri = "http://localhost:3000";
//const redirectUri = "https://h3artbeatz.herokuapp.com/";
const scopes = [
  "user-read-playback-state",
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-modify-playback-state",
  "user-library-read",
  "user-library-modify",
];

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";


// props:
// updateToken: function to update the token in app.jsx
export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
        }
    }

    componentDidMount = () => {
        let _token = hash.access_token;
        if (_token) {
            this.setState({token:_token});
            this.props.updateToken(_token);
        }
    }

    render() {
        return (
            <div className="mainContainer">
                <div className="pageHeader"><span className="heart">H3art</span>Beatz</div>
                <div className="loginContainer">
                    <div className="loginWindow">
                        <div className="loginHeader">Login</div>
                        {this.state.token === "" ? (
                            <a className="loginButton" href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>Login With Spotify</a>
                        ):(<div/>)}
                    </div>
                </div>
            </div>
        );
    }
}