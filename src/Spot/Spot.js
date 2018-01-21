import React from 'react';
import styles from './Spot.css';

const Spot = ({ title, price_range, primary_address, lead_image }) => (
  <div className={styles.wrapper}>
    <img
      className={styles.image}
      key={lead_image.thumbnail}
      alt={title}
      src={lead_image.thumbnail}
    />

    <div className={styles.title}>
      {title}
    </div>

    <div className={styles.meta}>
      <span className={styles.price}>
        {new Array(price_range).fill(null).map(x => '$').join('')}
      </span>
      
      <span className={styles.dot}>
        •
      </span>

      <span className={styles.street}>
        { primary_address.street }  
      </span>
    </div>
  </div>
);

export default Spot;
