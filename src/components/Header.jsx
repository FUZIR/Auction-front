import React from 'react';
import logo from '/auction.svg';
import styles from '/src/styles/Header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
            <a href="#"><img src={logo} alt="logo" className={styles.logo} /></a>
            <ul className={styles.ul}>
                <li><a href="#" className={styles.link}>Lots</a></li>
                <li><a href="#" className={styles.link}>Account</a></li>
            </ul>
            <div>
                <button className={styles.btn}>Sign in</button>
                <button className={styles.btn}>Sign up</button>
            </div>
        </div>
  );
}

export default Header;