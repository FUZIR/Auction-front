import React from 'react'
import logo from '/auction.svg';
import styles from '/src/styles/Header.module.css';
import {Link} from 'react-router-dom';

function HeaderLogin() {
  return (
    <div className={styles.header}>
            <Link to="/"><img src={logo} alt="logo" className={styles.logo} /></Link>
            <ul className={styles.ul}>
                <li><Link to="/lots" className={styles.link}>Lots</Link></li>
                <li><Link to="/account" className={styles.link}>Account</Link></li>
            </ul>
        </div>
  )
}

export default HeaderLogin
