import React, { useEffect, useState } from "react";
import axios from "axios";
import Picturecard from "./Picturecard";

const Gallery = () => {
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [city, setCity] = useState('');
  const cities = ["London", "Mumbai", "HongKong", "New York"];
  const [searchResult, setsearchCities] = useState([]);

  const searchCity = async (e) => {
    if (city) {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos/?query=${city}&client_id=t4ccjeUgLYVfuN66h1iKdFfLdRGOV6-Ka6NLpoMotJM`
      ).then(response => {
        setsearchCities(response.data.results);
      }).catch(error => {
        console.log(error);
      })
    }
  }

  useEffect(() => {
    searchCity();
  }, [city])

  const handelCityChange = (e) => {
    setCity(e.target.value);
  }

  return (
    <div className="container">
      <h1 className="mt-4">Unsplash</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="search-bar">
            <select className="form-control" value={city} onChange={handelCityChange}>
              <option value="">Select a city</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row positionContainer">
        {searchResult.map((result, index) => (
          <div className="col-md-4" key={result.id}>
            <Picturecard setsearchCities={setsearchCities} image={result} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
