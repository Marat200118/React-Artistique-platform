// AuthStatus.jsx
import React from "react";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { logout } from '../services/auth';

const AuthStatus = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  // console.log("AuthStatus user:", user);

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <div>
      {user && user.jwt ? (
        <>
         <div className={styles.buttons}>
          <span className={styles.welcomeMessage}>
            <Link to="/auth/profile">
              Welcome, {user.user.username}!
            </Link>
          </span>
          <button className={styles.button} onClick={handleLogout}>Log Out</button>
         </div>
        </>
      ) : (
        <>
        <div className={styles.buttons}>
          <Link className={styles.loginButton} to="/auth/login">Log In</Link>
          <Link className={styles.signupButton} to="/auth/register">Sign Up</Link>
        </div>
        </>
      )}
    </div>
  );
};

export default AuthStatus;
