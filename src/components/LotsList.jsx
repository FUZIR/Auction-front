import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LotCard from './LotCard'; // Предполагается, что компонент LotCard находится в отдельном файле
import styles from '/src/styles/LotCard.module.css';

function LotsList() {
  const [lots, setLots] = useState([]);

  useEffect(() => {
    // Выполнение запроса к серверу при загрузке компонента
    axios.get('http://localhost:5180/api/lots/get_all')
      .then(response => {
        // Обработка успешного ответа
        console.log(response.data)
        setLots(response.data.$values); // Сохранение полученных данных в состоянии
      })
      .catch(error => {
        // Обработка ошибки
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  return (
    <div className={styles.lots}>
      {Array.isArray(lots) ? (
        lots.map(lot => (
          <LotCard
            key={lot.Id} // Предположим, что каждый лот имеет уникальный идентификатор
            name={lot.Name}
            description={lot.Description}
            startingPrice={lot.StartingPrice}
            currentBid={lot.CurrentPrice}
            status={lot.Status}
            endTime={lot.EndTime}
            creator={lot.CreatorId}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default LotsList;

