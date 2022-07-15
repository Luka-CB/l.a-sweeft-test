import { useState } from "react";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import Register from "../components/Register";

const Home = () => {
  const { register, login } = useSelector((state) => state.toggleAuth);

  return (
    <div className="home-container">
      <div className="hero">
        <h1>Welcome!</h1>
        <p>
          Please <span>Sign Up / Sign In</span> to use this application
        </p>
      </div>
      {register && <Register />}
      {login && <Login />}
    </div>
  );
};

export default Home;
