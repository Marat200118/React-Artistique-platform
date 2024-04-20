import React from 'react';
import styles from './Header.module.css';
import '../styles/style.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Naming</div>
      <div className={styles.buttons}>
        <button className={styles.loginButton}>Login</button>
        <button className="signup-button">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;