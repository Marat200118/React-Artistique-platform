// Header.jsx
import React from 'react';
import { Link } from "react-router-dom";
import styles from './Header.module.css';
import AuthStatus from "./AuthStatus";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <Link to="/">
            <img src='/stars-logo.png' alt="" className='logo-stars' />
          </Link>
        </div>
        <nav>
          <Link className={styles.loginButton} to="artwork-collection">Collection</Link>
          <Link className={styles.loginButton} to="create-artwork">Create</Link>
        </nav>
      </div>
      <AuthStatus />
    </header>
  );
};

export default Header;
