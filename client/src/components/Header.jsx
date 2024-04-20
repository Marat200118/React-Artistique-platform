// Header.jsx
import React from 'react';
import { Link } from "react-router-dom";
import styles from './Header.module.css';
import AuthStatus from "./AuthStatus";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">Line Pattern Generator</Link>
      </div>
      <AuthStatus />
    </header>
  );
};

export default Header;
