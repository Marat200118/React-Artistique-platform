// AuthStatus.jsx
import React from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { logout } from '../services/auth';

const AuthStatus = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from auth service
    navigate('/auth/login'); // Redirect to login page after logout
  };

  return (
    <div>
      {user && user.jwt ? (
        <>
         <div className={styles.buttons}>
          <span className={styles.welcomeMessage}>Welcome, {user.username}!</span>
          <button className={styles.button} onClick={handleLogout}>Log Out</button>
         </div>
        </>
      ) : (
        <>
        <div className={styles.buttons}>
          <Link className={styles.loginButton} to="/auth/login">Log In</Link>
          <Link className={styles.signupButton} to="/auth/signup">Sign Up</Link>
        </div>
        </>
      )}
    </div>
  );
};

export default AuthStatus;
