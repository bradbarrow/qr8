import React from 'react';
import mapStyles from './mapStyles.json';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => 
  <GoogleMap
    defaultZoom={18}
    defaultOptions={{ styles: mapStyles }}
    defaultCenter={props.activeMarker.pos || { lat: -37.833, lng: 144.963 }}
    center={props.activeMarker.pos || { lat: -37.833, lng: 144.963 }}
  >
    {
      props.markers.map((marker, i) => (
        <Marker
          key={`${marker.id}${i}`}
          position={marker.pos}
          onClick={() => props.onMarkerClick(marker.id)}
        >
          {
            marker.id === props.activeMarker.id && (
              <InfoWindow>
                <span>{marker.label}</span>
              </InfoWindow>
            )
          }
        </Marker>
      ))
    }
  </GoogleMap>
);

export default MyMapComponent;
