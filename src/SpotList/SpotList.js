import React, { Component } from 'react';
import styles from './SpotList.css';
import Swiper from 'react-id-swiper';
import Spot from '../Spot';

class SpotList extends Component {
  render() {
    const { spots, onSpotSelected } = this.props;

    if (!spots || !spots.length) return null;

    return (
      <div>
        <Swiper
          loop={false}
          ref={el => { if(el) this.swiper = el.swiper }}
          containerClass={styles.swiper}
          on={{
            slideChange: () => onSpotSelected(spots[this.swiper.activeIndex]),
          }}
          slidesPerView={1.5}
        >
          {
            spots.map((spot, i) => (
              <div key={`${spot.id}${i}`}>
                <Spot {...spot} />
              </div>
            ))
          }
          <span></span>
        </Swiper>
      </div>
    );
  }
}

export default SpotList;
