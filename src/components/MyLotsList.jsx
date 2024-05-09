import { useState, useEffect } from "react"
import axios from "axios";
import MyLotCard from './MyLotCard.jsx'
import styles from "../styles/LotCard.module.css"

function MyLotsList({id}) {
    const [myLots, setMyLots] = useState([]);
    useEffect(()=>{
        axios.get(`http://localhost:5180/api/lots/get_user_lots?userId=${id}`)
        .then(response =>{
            console.log(response.data)
            setMyLots(response.data.$values)
        })
        .catch(error=>console.log(error));
    },[id])
  return (
    <div className={styles.lots}>
        {Array.isArray(myLots)?
        myLots.map((lot)=>(
            <MyLotCard key={lot.Id}
            id={lot.Id}
            name={lot.Name}
            description={lot.Description}
            startingPrice={lot.StartingPrice}
            currentBid={lot.CurrentPrice}
            status={lot.Status}
            endTime={lot.EndTime}
            creator={id}/>
        )):
        <p>Loading...</p>
        }
    </div>
  )
}

export default MyLotsList
