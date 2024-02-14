import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase";
import {
  ErrorMessage,
  Form,
  Input,
  Label,
  RegisterDiv,
  SubmitButton,
  SuccessMessage,
} from "../../styles/Register";

function Register({ usersData, setActiveComponent }) {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    userConfirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [passwordsMatch, setPasswordMatch] = useState(true);
  const [emailExistsError, setEmailExistsError] = useState("");
  const usersCollection = collection(db, "users");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailExists = usersData.some(
      (user) => userDetails.userEmail === user.userEmail
    );

    if (emailExists) {
      setEmailExistsError("User with this email already exists!");
      setTimeout(() => {
        setEmailExistsError("");
      }, 3000);
      clearInput();
      return;
    }

    if (userDetails.userPassword !== userDetails.userConfirmPassword) {
      setPasswordMatch(false);
      setTimeout(() => {
        setPasswordMatch(true);
      }, 3000);
      clearInput();
      return;
    }

    try {
      await addDoc(usersCollection, {
        userName: userDetails.userName,
        userEmail: userDetails.userEmail,
        userPassword: userDetails.userPassword,
      });
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        clearInput();
      }, 3000);
      clearInput();
      setActiveComponent(1);
    } catch (error) {
      console.log("error while registering new user: ", error.message);
    }
  };

  const clearInput = () => {
    setUserDetails({
      userName: "",
      userEmail: "",
      userPassword: "",
      userConfirmPassword: "",
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };
  return (
    <RegisterDiv className="register">
      <h2>Register</h2>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Label htmlFor="userNameInput">Name:</Label>
        <Input
          type="text"
          placeholder="Name"
          id="userNameInput"
          name="userName"
          value={userDetails.userName}
          onChange={handleChange}
          required
        />

        <Label htmlFor="userEmailInput">Email:</Label>
        <Input
          type="email"
          placeholder="Email"
          name="userEmail"
          id="userEmailInput"
          value={userDetails.userEmail}
          onChange={handleChange}
          required
        />

        <Label htmlFor="userPasswordInput">Password:</Label>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          name="userPassword"
          id="userPasswordInput"
          value={userDetails.userPassword}
          onChange={handleChange}
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
          title="Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long."
          required
        />

        <Label htmlFor="showPasswordToggle">
          Show Password :
          <Input
            type="checkbox"
            id="showPasswordToggle"
            checked={showPassword}
            onChange={() => togglePasswordVisibility("password")}
          />
        </Label>

        <Label htmlFor="userConfirmPasswordInput">Confirm Password:</Label>
        <Input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          id="userConfirmPasswordInput"
          name="userConfirmPassword"
          value={userDetails.userConfirmPassword}
          onChange={handleChange}
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
          title="Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long."
          required
        />

        <Label htmlFor="showConfirmPasswordToggle">
          Show Confirm Password :
          <Input
            type="checkbox"
            id="showConfirmPasswordToggle"
            checked={showConfirmPassword}
            onChange={() => togglePasswordVisibility("confirmPassword")}
          />
        </Label>

        <SubmitButton type="submit">Register</SubmitButton>
      </Form>
      {!passwordsMatch && (
        <ErrorMessage className="error-message">
          Passwords do not match.
        </ErrorMessage>
      )}

      {emailExistsError && (
        <ErrorMessage className="error-message">
          Email Already Exists
        </ErrorMessage>
      )}

      {formSubmitted && (
        <SuccessMessage className="success-message">
          Registration Successful.
        </SuccessMessage>
      )}
    </RegisterDiv>
  );
}

export default Register;
