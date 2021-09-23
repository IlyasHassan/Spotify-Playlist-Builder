import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//import { WEB_APP } from "../../constants/routes";


//import { useAuth } from "../../context/AuthContext";


const SignUp = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  //const auth = useAuth();
  let history = useHistory();


  return (
    <div className="container" margin-top="20px">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          //alert(email + "" + password)
          
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};


export default SignUp;