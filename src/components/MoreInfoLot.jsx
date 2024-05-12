import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react';
import styles from '../styles/LotCard.module.css'
import { useParams } from 'react-router-dom';

function MoreInfoLot() {
    const {id} = useParams();
    const [lot, setLot] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:5180/api/lots/get?id=${id}`)
        .then(response => {
            setLot(response.data)
        })
        .catch(error=>console.log(error.message));
    },[id])
    const getStatusText = (status) => {
        switch (status) {
          case 0:
            return 'Active';
          case 1:
            return 'Sold';
          case 2:
            return 'Withdrawn';
          case 3:
            return 'Expired';
          default:
            return 'Unknown';
        }
      };
      const formatEndDate = (endTime) => {
        const formattedDate = new Date(endTime).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'UTC'
        });
        return formattedDate;
      };
  return (
    <div className={styles.moreinfo}>
            {lot && (
                <div className={styles.card}>
                    <h3>{lot.Name}</h3>
                    <p>Description: {lot.Description}</p>
                    <p>Starting price: {lot.StartingPrice != null ? lot.StartingPrice + "$" : 0}</p>
                    <p>Current bid: {lot.CurrentBid != null ? lot.CurrentBid + "$" : 0}</p>
                    <p>Status: {getStatusText(lot.Status)}</p>
                    <p>Start Time time: {formatEndDate(lot.StartTime)}</p>
                    <p>End time: {formatEndDate(lot.EndTime)}</p>
                    <p>Creator ID: {lot.CreatorId}</p>
                    <p>Creator name: {lot.Creator ? lot.Creator.Nickname : 'Unknown'}</p>
                    <p>Creator email: {lot.Creator ? lot.Creator.Email : 'Unknown'}</p>
                    {lot.status == 0 ? <button className={styles.card_btn}>Make bid</button> : <></>}
                </div>)}
            
    </div>
  )
}

export default MoreInfoLot
