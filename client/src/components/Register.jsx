import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin } from "../redux/features/toggleAuthSlice";
import { resetRegSuccess } from "../redux/features/authSlice";
import { registerUser } from "../redux/actions/authActions";
import { useEffect } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);

  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confPassError, setConfPassError] = useState(false);

  const { registerLoading, registerSuccess, regError } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (registerSuccess) {
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      dispatch(toggleLogin(true));
      dispatch(resetRegSuccess());
    }
  }, [registerSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (username === "") {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    if (password === "" || password.length < 6) {
      setPassError(true);
    } else {
      setPassError(false);
    }

    if (confirmPassword === "" || confirmPassword !== password) {
      setConfPassError(true);
    } else {
      setConfPassError(false);
    }

    if (
      username === "" ||
      password === "" ||
      confirmPassword === "" ||
      confirmPassword !== password
    )
      return;

    const userInfo = {
      username,
      password,
    };

    dispatch(registerUser(userInfo));
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={submitHandler}>
        <div className="input-box">
          <label>Username</label>
          <input
            type="text"
            placeholder="enter username"
            className={
              usernameError || regError
                ? "usernameError"
                : username !== ""
                ? "usernameSuccess"
                : undefined
            }
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {regError && <p id="err-text">{regError}</p>}
        </div>

        <div className="input-box">
          <label>Password</label>
          <input
            type="password"
            placeholder="enter password"
            className={
              passError
                ? "passError"
                : password !== "" && password.length >= 6
                ? "passSuccess"
                : undefined
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passError && (
            <p id="err-text">Password must be at least 6 characters long!</p>
          )}
        </div>

        <div className="input-box">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="retype password"
            className={
              confPassError
                ? "confPassError"
                : confirmPassword !== "" && confirmPassword === password
                ? "confPassSuccess"
                : undefined
            }
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confPassError && <p id="err-text">Passwords doesn't match!</p>}
        </div>

        <button id="auth-btn">
          {registerLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <div className="info">
        <p>Already Have an Account?</p>
        <h2 onClick={() => dispatch(toggleLogin(true))}>Sign In</h2>
      </div>
    </div>
  );
};

export default Register;
