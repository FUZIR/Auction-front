import Modal from './Modal';
import { useEffect, useState } from 'react';
import styles from '../styles/Form.module.css'
import { useCookies } from 'react-cookie';
import axios from 'axios';

function CreateBidModal({id, modalActive, setModalActive}) {
    const [bid, setBid] = useState(0);
    const [bidDirty ,setBidDirty] = useState(false);
    const [bidError, setBidError] = useState("Bid cannot be empty");
    const [formValid, setFormValid] = useState(false);
    const [cookie] = useCookies();
    const [serverResponse, setServerResponse] = useState("");
    useEffect(()=>{
        if(bidError){
            setFormValid(false);
        }else{
            setFormValid(true);
        }
    },[bidError])

    const bidHandler = (e)=>{
      setBid(e.target.value);

      const bidRegex = /^(?!0)\d+$/;
        if(!bidRegex.test(String(e.target.value).toLowerCase()) || !e.target.value){
            setBidError("Invalid bid")
        }
        else{
            setBidError("");
        }
    }
    const handleOnClick = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5180/api/bids/${id}/create`,{
            userId:cookie.id,
            bid            
            });
            if(response.status === 200){
                console.log("bid add successful")
                setModalActive(false);
            }
        } catch (error) {
            console.log("Error: ", error)
            setServerResponse("Something went wrong")
        }
        
    }

    const blureHandler = (e)=>{
      switch(e.target.name){
          case 'bid':
              setBidDirty(true);
              break;
      }
  }
  return (
    <Modal active = {modalActive} setActive={setModalActive} >
    <form action="" method="post" className={styles.form}>
      <label htmlFor="nickname"><h2>Bid:</h2></label>
      {(bidDirty && bidError) && <div style ={{color:"red"}}>{bidError}</div>}
      <input onChange={e=>bidHandler(e)} onBlur ={e=>blureHandler(e)} type="bid" placeholder="Enter bid" name="bid" id="bid" required className={styles.input}/>
      <button disabled = {!formValid} type="submit" className={styles.regbtn} onClick={handleOnClick}>Create</button>
      <p style={{ color: "red", marginTop:"10px" }}>{serverResponse}</p>
    </form>
  </Modal>
  )
}

export default CreateBidModal
