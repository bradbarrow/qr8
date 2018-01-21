import React, { Component } from 'react';
import styles from './App.css';
import Map from './Map.js';
import SpotList from './SpotList';
import fetchJSON from './fetch';
import uniqBy from 'lodash.uniqby';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suburb: 'Melbourne',
      spots: [],
    }

    this.handleSpotSelected = this.handleSpotSelected.bind(this);
    this.fetch = this.fetch.bind(this);
  }
  
  fetch(suburb) {
    const encodedSuburb = encodeURIComponent(suburb.toLowerCase());
    const url = `https://www.broadsheet.com.au/api/melbourne/search?page=1&o={%22suburbs%22:[%22${encodedSuburb}%22]}`;
    
    fetchJSON(url, {
      transformResponse: (response) => {
        return response.results.map(location => ({
          ...location,
          label: location.title,
          pos: {
            lat: location.primary_address.latitude,
            lng: location.primary_address.longitude,
          }
        }));
      },
      defaultReturnValue: [],
    })
    .then(spots => {
      this.setState({ spots: uniqBy(spots, 'id') });
    });
  }

  componentDidMount() {
    this.fetch(this.state.suburb);
  }

  handleSpotSelected(spot) {
    if (spot && spot.id) {
      this.setState({ activeId: spot.id });
    }
  }

  render() {
    const { activeId, spots } = this.state;
    const activeSpot = spots.find(s => s.id === activeId) || this.state.spots[0];

    return (
      <div className={styles.app}>
        { /*
          <form className={styles.form} onChange={this.onChange} onSubmit={this.onSubmit}>
            <input defaultValue={this.state.suburb} type="text" name="suburb" placeholder="Enter Suburb" />
            <button type="submit">Search</button>
          </form>
        */ }
        <div className={styles.mapArea}>
          {
            !(activeSpot || this.state.spots.length) ? (
              <div>No Results</div>
            ) : (
              <Map
                activeMarker={activeSpot}
                markers={spots}
                onMarkerClick={this.handleMarkerClick}
              />
            )
          }
        </div>
        <div className={styles.listArea}>
          <SpotList
            onSpotSelected={this.handleSpotSelected}
            spots={spots}
          />
        </div>
      </div>
    );
  }
}

export default App;
