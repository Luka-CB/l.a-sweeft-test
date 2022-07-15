import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleRegister } from "../redux/features/toggleAuthSlice";
import { loginUser } from "../redux/actions/authActions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginLoading, loginError } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser({ username, password }));
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={submitHandler}>
        {loginError && <p id="login-error">{loginError}</p>}
        <div className="input-box">
          <label>Username</label>
          <input
            type="text"
            placeholder="enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-box">
          <label>Password</label>
          <input
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button id="auth-btn">
          {loginLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="info">
        <p>Already Have an Account?</p>
        <h2 onClick={() => dispatch(toggleRegister(true))}>Sign Up</h2>
      </div>
    </div>
  );
};

export default Login;
