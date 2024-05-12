import{ useEffect, useState } from 'react'
import Modal from './Modal'
import styles from '../styles/Form.module.css'
import axios from 'axios';
import { useCookies } from 'react-cookie';

function CreateLotModal({modalActive, setModalActive}) {
    const[name, setName] = useState('');
    const[description, setDescription] = useState('');
    const[startingPrice, setStartingPrice] = useState('');

    const[nameDirty, setNameDirty] = useState(false);
    const[descriptionDirty, setDescriptionDirty] = useState(false);
    const[priceDirty, setPriceDirty] = useState(false);

    const[nameError, setNameError] = useState("Name cannot be empty");
    const[descriptionError, setDescriptionError] = useState("Description cannot be empty");
    const[priceError, setPriceError] = useState("Invalid price");

    const[formValid, setFormValid] = useState(false);
    const[serverResponse, setServerResponse] = useState("");

    const[cookie, setCookies, removeCookies] = useCookies(['id']);

    useEffect(()=>{
        if(nameError|| descriptionError|| priceError){
            setFormValid(false);
        }
        else{
            setFormValid(true);
        }
    },[nameError, descriptionError, priceError])
    const nameHandler = (e)=>{
        setName(e.target.value);
        if(!e.target.value){
            setNameError("Name cannot be empty");
        }
        else{
            setNameError("");
        }
    }

    const descriptionHandler = (e)=>{
        setDescription(e.target.value);
        if(!e.target.value){
            setDescriptionError("Description cannot be empty")
        }
        else{
            setDescriptionError("")
        }
    }

    const priceHandler = (e)=>{
        setStartingPrice(e.target.value)
        const priceRegex = /^(?!0)\d+$/;
        if(!priceRegex.test(String(e.target.value).toLowerCase()) || !e.target.value){
            setPriceError("Invalid price")
        }
        else{
            setPriceError("");
        }
    }

    const blureHandler = (e)=>{
        switch(e.target.name){
            case 'name':
                setNameDirty(true);
                break;
            case 'description':
                setDescriptionDirty(true);
                break;
            case 'startingPrice':
                setPriceDirty(true);
                break;
        }
    }


    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!nameError && !descriptionError && !priceError){
            try {
                const response = await axios.post("http://localhost:5180/api/lots/create",{
                    name,
                    description, 
                    startprice:+startingPrice,
                    creatorId:cookie.id,
                });
                console.log(response);

                if(response.status === 200){
                    console.log("Create successful")
                    setModalActive(false);
                }
            } catch (error) {
                console.log("Error: ", error)
                setServerResponse("Something went wrong!")
            }
        }
    }
  return (
    <Modal active={modalActive} setActive={setModalActive}>
        <form action="" method="post" className={styles.form}>
        <label htmlFor="name"><h2>Lot name:</h2></label>
        {(nameDirty && nameError) && <div style ={{color:"red"}}>{nameError}</div>}
        <input onChange={e=>nameHandler(e)} onBlur= {e=>blureHandler(e)} type="text" placeholder="Enter lot name" name="name" id="name" required className={styles.input} />
        <label htmlFor="password"><h2>Description:</h2></label>
        {(descriptionDirty && descriptionError) && <div style ={{color:"red"}}>{descriptionError}</div>}
        <input onChange={e=>descriptionHandler(e)} onBlur ={e=>blureHandler(e)} type="text" placeholder="Enter description" name="description" id="description" required  className={styles.input}/>
        <label htmlFor="password"><h2>Starting Price:</h2></label>
        {(priceDirty && priceError) && <div style ={{color:"red"}}>{priceError}</div>}
        <input onChange={e=>priceHandler(e)} onBlur ={e=>blureHandler(e)} type="text" placeholder="Enter starting price" name="starting_price" id="starting_price" required  className={styles.input}/>
        <button disabled = {!formValid} type="submit" className={styles.regbtn} onClick={handleSubmit}>Create</button>
        <p style={{ color: "red", marginTop:"10px" }}>{serverResponse}</p>
        </form>
    </Modal>
  )
}

export default CreateLotModal
