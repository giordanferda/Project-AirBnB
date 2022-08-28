import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { Link } from "react-router-dom";
function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showLogin, setShowLogin] = useState(false); // for the x on logout onclick

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="Login-Modal">
      <div className="Login-Form-Modal-Header">
        <h3 className="Modal-Title">Log in</h3>
      </div>
      <h2 className="WelcomeMessage">Welcome to FerdaBnB</h2>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div>
        <label className="input-label">Username or Email</label>
        <input
          className="Username-Email"
          placeholder="Username or Email"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="input-label">Password</label>
        <input
          className="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Link
        className="Link-Login"
        to="/signup"
        onClick={() => setShowModal(false)}
      >
        Dont Have an account?
      </Link>
      <div>
        <button type="submit" className="login-button">
          Log In
        </button>
        <button
          className="login-button"
          type="submit"
          onClick={(e) => {
            setCredential("TOTHEMOON");
            setPassword("password");
          }}
        >
          Demo User
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
