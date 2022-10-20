import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import useGeolocation from "react-hook-geolocation";
import React, { useState, useRef, useEffect } from 'react';
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import AutocompleteForm from './AutocompleteForm';
import Geocode from "react-geocode";

const containerStyle = {
  width: '1000px',
  height: '400px'
};


function Locator() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    //hide this before commit
    googleMapsApiKey: "AIzaSyBncK9JqcnImcLkJqG8NJIMy9SMdPNDhBY",
    libraries: ["places"]
  })

  

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const inputRef = useRef(null);
  const [country, setCountry] = useState("us");
  const [formLocation, setFormLocation ] = useState("");
  const [latForm, setLatForm] = useState(-10);
  const [longForm, setLongForm] = useState(-5);
  const center = {
    lat: latForm,
    lng: longForm
  };

  Geocode.setApiKey("AIzaSyBncK9JqcnImcLkJqG8NJIMy9SMdPNDhBY");

  Geocode.fromAddress(formLocation).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
      if (lat !== latForm) {
        setLatForm(parseFloat(lat));
      }
      if (lng !== longForm) {
        setLongForm(parseFloat(lng));
      }
    },
    (error) => {
      console.error(error);
    }
  );
  

  console.log("form", formLocation);
  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
      
      <div className="App">
        <Autocomplete
          style={{ width: "250px" }}
          ref={inputRef}
          apiKey={"AIzaSyBncK9JqcnImcLkJqG8NJIMy9SMdPNDhBY"}
          onPlaceSelected={(selected, a, c) => {
            //convert geolocation here
            console.log("geolocation", selected);
            setFormLocation(selected.formatted_address);
          }}
          options={{
            types: ["geocode", "establishment"],
            componentRestrictions: { country },
          }}
        />
    </div>
    </div>

  ) : <></>
}

export default Locator;