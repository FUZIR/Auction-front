import React from 'react'
import Modal from './Modal'
import {useState, useEffect} from 'react'
import styles from '../styles/Form.module.css'
import axios from 'axios'
import { Cookies, useCookies } from 'react-cookie'

function LoginModal({ modalActive, setModalActive, setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState("Email cannot be empty");
    const [passwordError, setPasswordError] = useState("Password cannot be empty");
    const [formValid, setFormValid] = useState(false);
    const [serverResponse, setServerResponse] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['id']);

    useEffect(()=>{
        if(emailError||passwordError){
            setFormValid(false)
        }
        else{
            setFormValid(true);
        }
    },[emailError, passwordError])

    const emailHandler = (e)=>{
        setEmail(e.target.value);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(String(e.target.value).toLowerCase())){
            setEmailError("Invalid email");
        }else{
            setEmailError("");
        }

    }
    const passwordHandler = (e)=>{
        setPassword(e.target.value);
        if(e.target.value.length < 8){
            setPasswordError("Email must be more than 8 symbols");
            if(!e.target.value){
                setPasswordError("Password cannot be empty");
            }
        }else{
            setPasswordError("");
        }

    }
    
    const blureHandler = (e)=>{
        switch (e.target.name){
            case 'email':
                setEmailDirty(true);
                break;

            case 'password':
                setPasswordDirty(true);
                break;
        }
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(!emailError && !passwordError){
            try{
                const response = await axios.post("http://localhost:5180/api/login",{
                    email,
                    password
                });
                if(response.status === 200){
                    console.log("Login succesful");
                    setCookie("id", response.data);
                    setIsAuthenticated(true);
                    setModalActive(false);
                }
            }
            catch(err){
                console.log("Error: ", err);
                setServerResponse('Email or password is wrong!');
            }
        }
    }
  return (
    <Modal active = {modalActive} setActive={setModalActive} >
    <form action="" method="post" className={styles.form}>
      <label htmlFor="email"><h2>Email:</h2></label>
      {(emailDirty && emailError) && <div style ={{color:"red"}}>{emailError}</div>}
      <input onChange={e=>emailHandler(e)} onBlur= {e=>blureHandler(e)} type="text" placeholder="Enter email" name="email" id="email" required className={styles.input} />
      <label htmlFor="password"><h2>Password:</h2></label>
      {(passwordDirty && passwordError) && <div style ={{color:"red"}}>{passwordError}</div>}
      <input onChange={e=>passwordHandler(e)} onBlur ={e=>blureHandler(e)} type="password" placeholder="Enter password" name="password" id="password" required  className={styles.input}/>
      <button disabled = {!formValid} type="submit" className={styles.regbtn} onClick={handleSubmit}>Sign In</button>
      <p style={{ color: "red", marginTop:"10px" }}>{serverResponse}</p>
    </form>
  </Modal>
  )
}

export default LoginModal
