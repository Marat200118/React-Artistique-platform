import React from "react";
import { useRouteLoaderData, Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { logout } from '../services/auth';

const AuthStatus = () => {
  const { user, profile } = useRouteLoaderData('root');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <div className={styles.buttons}>
      {user && user.jwt ? (
        <div className={styles.dropdown}>
          <Link to="/auth/profile">
            <img
              src={profile.picture ? `${import.meta.env.VITE_STRAPI_URL}${profile.picture.url}` : '/default-avatar.jpeg'}
              alt="Profile avatar"
              className={styles.smallProfilePic}
            />
          </Link>
          <div>
            <a href="#" onClick={handleLogout} className="log-out">Log Out</a>
          </div>
        </div>
      ) : (
        <>
          <Link className={styles.loginButton} to="/auth/login">Log In</Link>
          <Link className={styles.signupButton} to="/auth/register">Sign Up</Link>
        </>
      )}
    </div>
  );
};

export default AuthStatus;
