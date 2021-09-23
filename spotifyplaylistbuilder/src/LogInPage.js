import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//import { WEB_APP } from "../../constants/routes";
import {Credentials} from './Credentials'

//import { useAuth } from "../../context/AuthContext";

const spotify = Credentials();  

const LoginForm = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  //const auth = useAuth();
  let history = useHistory();

const redirectPage = () => {
    window.location = `https://accounts.spotify.com/authorize?client_id=${spotify.ClientId}&redirect_uri=http://localhost:3000/Build-Playlist&scope=user-read-private%20playlist-modify-public%20playlist-modify-private&response_type=token&state=123`
}
  return (
    <div className="container" margin-top="20px">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          
        }}
      >
        <label>What is your email?</label>
        <input
          type="email"
          placeholder="Email"
          value={emailValue}
          onChange={(event) => setEmailValue(event.target.value)}
        />
        <label>What is your password?</label>
        <input
          type="password"
          placeholder="Password"
          value={passwordValue}
          onChange={(event) => setPasswordValue(event.target.value)}
        />
        <button onClick={redirectPage} type="submit">Login</button>
      </form>
    </div>
  );
};


export default LoginForm;