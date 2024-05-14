import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LotCard from './LotCard';
import styles from '/src/styles/LotCard.module.css';

function LotsList() {
  const [lots, setLots] = useState([]);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5180/api/lots/get_all')
      .then(response => {
        console.log(response.data)
        setLots(response.data.$values);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  const getCreator = (lot, lots) => {
    if (lot.Creator && lot.Creator.$ref) {
      const creatorId = lot.Creator.$ref;
      const creator = lots.find((item) => item.Id === creatorId);
      return creator && creator.Nickname ? creator.Nickname : 'Unknown';
    } else if (lot.Creator && lot.Creator.Nickname) {
      return lot.Creator.Nickname;
    } else {
      return 'Unknown';
    }
  };
  return (
    <div className={styles.lots}>
      {Array.isArray(lots) ? (
        lots.map(lot => (
          <LotCard
          modalActive={modalActive}
          setModalActive={setModalActive}
            id = {lot.Id}
            key={lot.Id}
            name={lot.Name}
            description={lot.Description}
            startingPrice={lot.StartingPrice}
            currentBid={lot.CurrentPrice}
            status={lot.Status}
            endTime={lot.EndTime}
            creator={getCreator(lot, lots)}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default LotsList;

