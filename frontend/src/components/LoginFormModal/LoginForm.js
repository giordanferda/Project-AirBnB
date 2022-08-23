import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'
function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showLogin, setShowLogin] = useState(false) // for the x on logout onclick

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
    <form onSubmit={handleSubmit} className='Login-Modal'>
      <div>&#10006;</div>
      <div className="Login-Form-Modal-Header">
      <h3 className="Modal-Title">Log in</h3>
      </div>
      <h2>Welcome to FerdaBnB</h2>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
        <input
          placeholder='Username or Email'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />



        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

      <button type="submit">Log In</button>
      <button
      className='login-button'
      type='submit'
      onClick={(e) => {
        setCredential('TOTHEMOON')
        setPassword('password')
      }}
      >Demo User</button>
    </form>
  );
}

export default LoginForm;
