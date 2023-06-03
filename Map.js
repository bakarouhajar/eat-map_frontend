import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const containerStyle = {
    width: '400px',
    height: '400px',
  };
  
  const center = {
    lat: 37.7749,
    lng: -122.4194,
  };
  
  const MapComponent = () => {
    return (
      <LoadScript googleMapsApiKey="AIzaSyDTPJJPIGPRX-ONzuAaqc1oTee4Unmc0ZIY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {/* Add additional components, such as markers or overlays, as needed */}
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    );
  };
  
  export default MapComponent;
  