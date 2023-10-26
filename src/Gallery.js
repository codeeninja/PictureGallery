import React, { useEffect, useState } from "react";
import axios from "axios";
import Picturecard from "./Picturecard";

const Gallery = () => {
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [city,setCity]=useState('');
  // const[cities,setcities]=(["London","Mumbai","HongKong","New York"]);
  const cities=["London","Mumbai","HongKong","New York"]
  const [searchResult,setsearchCities]=useState([]);
  const searchCity=async(e)=>{
    if(city){
      const response = await axios.get(
        `https://api.unsplash.com/search/photos/?query=${city}&client_id=t4ccjeUgLYVfuN66h1iKdFfLdRGOV6-Ka6NLpoMotJM`
      ).then(response=>{
        setsearchCities(response.data.results);
      }).catch(error =>{
        console.log(error);
      })
    }
  }
  useEffect(()=>{
    searchCity();
  },[city])

  // const searchImages = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.unsplash.com/search/photos/?query=${category}&client_id=t4ccjeUgLYVfuN66h1iKdFfLdRGOV6-Ka6NLpoMotJM`
  //     );
  //     setImages(response.data.results);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handelCityChange=(e)=>{
    setCity(e.target.value);
  }

  return (
    <>
    <div className="gallery-container">
      <h1 className="mb-4">Unsplash</h1>
      <div className="search-bar">
        <select value={city} onChange={handelCityChange}>
          <option value="">Select a city</option>
          {cities.map((city,index)=>(
            <option key={index} value={city}>{city}</option>
          ))}
        </select>
        {/* <button onClick={searchCity}>Search</button> */}
        {/* <input
          type="text"
          placeholder="Enter a category name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={searchImages}>Search</button> */}
      </div>
    </div>
    <div>
      <div className="positionContainer">
    {searchResult.map((result,index)=>(
       <Picturecard key={result.id} image={result} />
    ))}
      </div>
  </div>
  </>
  );
};

export default Gallery;
