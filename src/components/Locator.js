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

 
  useEffect(() => {
    fetch("https://cors-anywhere.herokuapp.com/")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("hello", result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("guh");
        }
      )
  }, [])


  const [initial, setInitial] = useState(0);
  const [latForm, setLatForm] = useState(-10);
  const [longForm, setLongForm] = useState(-5);

  const geolocation = useGeolocation();

  if (initial === 0 && geolocation.latitude !== null) {
    console.log("Apple!!");
    setLatForm(geolocation.latitude);
    setLongForm(geolocation.longitude);
    setInitial(1);
  }

  const [map, setMap] = React.useState(null)

  let coords = [];
  const [coordsResult, setCoordsResult] = useState([]);

  const onLoad = React.useCallback(function callback(map) {

    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)


    let request = {
      query: "L&B Spumoni Gardens",
      fields: ["name", "geometry"]
    };

    let service = new window.google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          coords.push(results[i]);
        }
        setCoordsResult(coords);
      }

    });
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
          {coordsResult !== [] &&
            coordsResult.map(function (results, i) {
              return (
                <Marker key={i} position={results.geometry.location}>
                </Marker>
              );
            })}
      </GoogleMap>
      <br></br>
      <div className="App">
        <Autocomplete
          style={{ width: "1000px" }}
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