import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const SignUp = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setUserState] = useState("");
  const [errorMessage, setMessage] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleCityChange(e) {
    setCity(e.target.value);
  }

  function handleStateChange(e) {
    setUserState(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/auth/", {
        name: name
      })
      .then(res => {
        console.log(res.data);
      });
    axios
      .post("/auth/signup", {
        name: name,
        email: email,
        password: password,
        city: city,
        state: state
      })
      .then(res => {
        if (res.data.type === "error") {
          console.log("ERROR");
        } else {
          localStorage.setItem("mernToken", res.data.token);
          this.props.liftToken(res.data);
          props.history.push("/collection");
        }
      })
      .catch(err => {
        // This block catches the rate limiters.
        setMessage("Maximum accounts exceeded. Please try again later.");
      });
  }

  return (
    <main>
      <header>SIGN UP</header>
      {errorMessage !== "" ? errorMessage : ""}
      <div className="sign-up-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={name}
          onChange={handleNameChange}
        ></input>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={city}
          onChange={handleCityChange}
        ></input>
        <input
          type="text"
          name="state"
          placeholder="State"
          value={state}
          onChange={handleStateChange}
        ></input>
        <button onClick={handleSubmit}>Send</button>
      </div>
    </main>
  );
};

export default withRouter(SignUp);
