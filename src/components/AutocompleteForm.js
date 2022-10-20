import React, { FC, RefObject, useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";

function AutocompleteForm() {  
  const inputRef = useRef(null);
  const [country, setCountry] = useState("us");

  return (
    <div className="App">
        <Autocomplete
          style={{ width: "250px" }}
          ref={inputRef}
          apiKey={"AIzaSyBncK9JqcnImcLkJqG8NJIMy9SMdPNDhBY"}
          onPlaceSelected={(selected, a, c) => {
            //convert geolocation here
            console.log("geolocation", selected);
          }}
          options={{
            types: ["geocode", "establishment"],
            componentRestrictions: { country },
          }}
        />
    </div>
  );
}

export default AutocompleteForm;