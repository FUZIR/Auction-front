import styles from '/src/styles/LotCard.module.css'
import { Link
 } from 'react-router-dom';

function LotCard({ id, name, description,startingPrice, currentBid, status, endTime, creator }) {
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
    <div className={styles.card}>
        <h3>{name}</h3>
        <p>Description: {description}</p>
        <p>Starting price: {startingPrice!=null? startingPrice+"$":0}</p>
        <p>Current bid: {currentBid!=null? currentBid+"$":0}</p>
        <p>Status: {getStatusText(status)}</p>
        <p>End time: {formatEndDate(endTime)}</p>
        <p>Creator: {creator}</p>
        <Link to={`/lots/${id}`} >
           <button className={styles.card_btn}>More Info</button>
        </Link>
    </div>
  )
}

export default LotCard