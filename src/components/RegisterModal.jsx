import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import styles from '../styles/Form.module.css'
import axios from 'axios';

function RegisterModal({ modalActive, setModalActive }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [nicknameDirty, setNicknameDirty] = useState(false);
    const [emailError, setEmailError] = useState("Email cannot be empty");
    const [passwordError, setPasswordError] = useState("Password cannot be empty");
    const [nicknameError, setNicknameError] = useState("Nickname cannot be empty");
    const [formValid, setFormValid] = useState(false);
    const [serverResponse, setServerResponse] = useState('');
    
    useEffect(()=>{
        if(emailError||passwordError||nicknameError){
            setFormValid(false)
        }
        else{
            setFormValid(true);
        }
    },[emailError, passwordError, nicknameError])

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
    const nicknameHandler = (e)=>{
        setNickname(e.target.value);
        if(!e.target.value){
            setNicknameError("Nickname cannot be empty");
        }else{
            setNicknameError("");
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
            case 'nickname':
                setNicknameDirty(true);
                break;
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if (!emailError && !passwordError && !nicknameError) {
            try {
                const response = await axios.post('http://localhost:5180/api/register', {
                    email,
                    password,
                    nickname
                });
                if (response.status === 200) { // Проверяем статус код ответа
                    setServerResponse("Register successful"); // Обновляем состояние с ответом от сервера
                    setModalActive(false);
                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
                setServerResponse('An error occurred. Please try again later.');
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
      <label htmlFor="nickname"><h2>Nickname:</h2></label>
      {(nicknameDirty && nicknameError) && <div style ={{color:"red"}}>{nicknameError}</div>}
      <input onChange={e=>nicknameHandler(e)} onBlur ={e=>blureHandler(e)} type="nickname" placeholder="Enter nickname" name="nickname" id="nickname" required className={styles.input}/>
      <button disabled = {!formValid} type="submit" className={styles.regbtn} onClick={handleSubmit}>Sign Up</button>
      <p style={{ color: "red", marginTop:"10px" }}>{serverResponse}</p>
    </form>
  </Modal>
  )
}

export default RegisterModal
