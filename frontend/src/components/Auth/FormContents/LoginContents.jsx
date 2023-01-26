import React from 'react';

const Login = ({ handleChange }) => {
  return (
    <>
      <div className="auth__form-container_fields-content_input">
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
          required
        />
      </div>

      <div className="auth__form-container_fields-content_input">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
};

export default Login;
