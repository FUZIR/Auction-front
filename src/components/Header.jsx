import logo from '/auction.svg';
import styles from '/src/styles/Header.module.css';
import {Link} from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Header = ({setLoginModalActive, setRegisterModalActive, setCreateLotModalActive,isAuthenticated, setIsAuthenticated}) => {
  const [cookies,setCookies, removeCookies] = useCookies(['id']);

  const handleLogout = () =>{
    setIsAuthenticated(false);
    removeCookies('id');
  }

  return (
    <div className={styles.header}>
            <Link to="/"><img src={logo} alt="logo" className={styles.logo} /></Link>
            <ul className={styles.ul}>
                <li><Link to="/lots" className={styles.link}>Lots</Link></li>
                <li><Link to="/account" className={styles.link}>Account</Link></li>
            </ul>
            {isAuthenticated ? (
            <div style = {{display:"flex", alignItems:"center", justifyContent:"space-between"}} >
              <button onClick={()=>setCreateLotModalActive(true)} className={styles.btn} style={{marginRight:"50px"}} >Create Lot</button>
              <p style = {{marginRight:"50px"}}>{cookies.id}</p>
              <button onClick={handleLogout} className={styles.btn}>Log out</button>
            </div>
            ) : (
              <div>
                <button className={styles.btn} onClick={() => setLoginModalActive(true)}>Sign in</button>
                <button className={styles.btn} onClick={() => setRegisterModalActive(true)}>Sign up</button>
              </div>
            )}
        </div>
  );
}
export default Header;