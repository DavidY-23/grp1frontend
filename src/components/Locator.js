import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import useGeolocation from "react-hook-geolocation";
import React, { useState, useRef, useEffect } from 'react';
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import AutocompleteForm from './AutocompleteForm';
import Geocode from "react-geocode";
import axios from 'axios';

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

  const [initial, setInitial] = useState(0);
  const [latForm, setLatForm] = useState(0);
  const [longForm, setLongForm] = useState(0);
  const [location, setLocation] = useState("");

  const geolocation = useGeolocation();

  if (initial === 0 && geolocation.latitude !== null) {
    console.log("Apple!!");
    setLatForm(geolocation.latitude);
    setLongForm(geolocation.longitude);
    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${geolocation.latitude},${geolocation.longitude}&radius=15000&types=gym&key=AIzaSyBncK9JqcnImcLkJqG8NJIMy9SMdPNDhBY`)
    .then(res => res.json())
    .then(
      (result) => {
        console.log("hello fetch!", result.results)
        if (result.results.length < 5) {
          var resultLen = result.results.length 
        }
        else {
          resultLen = 5;
        }
        for (let i = 0; i < resultLen; i++) {
          new window.google.maps.Marker({position: {lat: result.results[i].geometry.location.lat, lng: result.results[i].geometry.location.lng}, map: map}); 
        }
        
      },
      (error) => {
        console.log("guh");
      }
    )

    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${geolocation.latitude},${geolocation.longitude}&radius=15000&types=park&key=AIzaSyBncK9JqcnImcLkJqG8NJIMy9SMdPNDhBY`)
    .then(res => res.json())
    .then(
    (result) => {
      console.log("hello fetch!", result.results)
      if (result.results.length < 5) {
        var resultLen = result.results.length 
      }
      else {
        resultLen = 5;
      }
      for (let i = 0; i < resultLen; i++) {
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

        new window.google.maps.Marker({position: {lat: result.results[i].geometry.location.lat, lng: result.results[i].geometry.location.lng}, map: map, icon: iconBase + 'parking_lot_maps.png'        }); 
      }
      
    },
    (error) => {
      console.log("guh");
    }
    )
    setInitial(1);
  }

  const [map, setMap] = React.useState(null)

  let coords = [];
  const [coordsResult, setCoordsResult] = useState([]);

  const onLoad = React.useCallback(function callback(map) {

    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
    console.log("hello coords", coords);
  }, [])
  

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const inputRef = useRef(null);
  const [country, setCountry] = useState("us");
  const [formLocation, setFormLocation ] = useState("");

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
      console.log("inside geocode", lat, lng)

      fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=15000&types=gym&key=AIzaSyBncK9JqcnImcLkJqG8NJIMy9SMdPNDhBY`)
      .then(res => res.json())
      .then(
      (result) => {
        console.log("hello fetch!", result.results)
        if (result.results.length < 5) {
          var resultLen = result.results.length 
        }
        else {
          resultLen = 5;
        }
        for (let i = 0; i < resultLen; i++) {
          var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

          new window.google.maps.Marker({position: {lat: result.results[i].geometry.location.lat, lng: result.results[i].geometry.location.lng}, map: map }); 
        }
        
      },
      (error) => {
        console.log("guh");
      }
    )
    fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=15000&types=park&key=AIzaSyBncK9JqcnImcLkJqG8NJIMy9SMdPNDhBY`)
    .then(res => res.json())
    .then(
    (result) => {
      console.log("hello fetch!", result.results)
      if (result.results.length < 5) {
        var resultLen = result.results.length 
      }
      else {
        resultLen = 5;
      }
      for (let i = 0; i < resultLen; i++) {
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

        new window.google.maps.Marker({position: {lat: result.results[i].geometry.location.lat, lng: result.results[i].geometry.location.lng}, map: map, icon: iconBase + 'parking_lot_maps.png'        }); 
      }
      
    },
    (error) => {
      console.log("guh");
    }
  )


    },
    (error) => {
      console.error(error);
    }
  );
  
  const OPTIONS = {
    minZoom: 4,
    maxZoom: 14,
  }

  console.log("form", formLocation);
  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options={OPTIONS}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
      </GoogleMap>
      <br></br>
      <div className="App">
        <Autocomplete
          style={{ width: "1000px" }}
          ref={inputRef}
          apiKey={"AIzaSyBncK9JqcnImcLkJqG8NJIMy9SMdPNDhBY"}
          onPlaceSelected={(selected, a, c) => {
            //convert geolocation here
            console.log("geolocation after search", selected);
            setFormLocation(selected.formatted_address);
            
          }}
          options={{
            types: ["geocode", "establishment"],
            componentRestrictions: { country },
          }}
        />
        {<div><p>P - Parks <br />Red Marker - Gyms</p></div>}
    </div>
    </div>

  ) : <></>
}

export default Locator;