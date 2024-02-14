// Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ErrorMessage,
  Input,
  Label,
  SubmitButton,
  RegisterDiv,
  Form,
} from "../../styles/Register";

function Login({ usersData }) {
  const [userDetails, setUserDetails] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { userEmail, userPassword } = userDetails;
    const user = usersData.find(
      (user) =>
        user.userEmail === userEmail && user.userPassword === userPassword
    );
    if (user) {
      // Redirect to user-specific home page
      navigate(`/home/${user.id}`);
    } else {
      setLoginError("Invalid email or password.");
    }
  };

  return (
    <RegisterDiv className="login">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="loginUserEmailInput">Email:</Label>
        <Input
          type="email"
          placeholder="Email"
          name="userEmail"
          id="loginUserEmailInput"
          value={userDetails.userEmail}
          onChange={handleChange}
          required
        />

        <Label htmlFor="loginUserPasswordInput">Password:</Label>
        <Input
          type="password"
          placeholder="Password"
          name="userPassword"
          id="loginUserPasswordInput"
          value={userDetails.userPassword}
          onChange={handleChange}
          required
        />

        <SubmitButton type="submit">Login</SubmitButton>
      </Form>
      {loginError && (
        <ErrorMessage className="error-message">{loginError}</ErrorMessage>
      )}
    </RegisterDiv>
  );
}

export default Login;
