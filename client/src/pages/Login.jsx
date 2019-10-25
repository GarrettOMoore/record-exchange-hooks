import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/auth/login", {
        email: email,
        password: password
      })
      .then(res => {
        if (res.data.type === "error") {
          setMessage(res.data.message);
        } else {
          localStorage.setItem("mernToken", res.data.token);
          props.liftToken(res.data);
          // props.getItems()
        }
      })
      .catch(err => {
        setMessage(err);
      })
      .finally(() => {
        props.history.push("/collection");
      });
  }

  let showMessage;

  if (message) {
    showMessage = message;
  } else {
    showMessage = "";
  }

  return (
    <main>
      <h3>Log into your account:</h3>
      {showMessage}
      <div className="sign-up-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              onChange={handleEmailChange}
              type="email"
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              onChange={handlePasswordChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Send!
          </Button>
        </Form>
      </div>
    </main>
  );
};

export default withRouter(Login);
