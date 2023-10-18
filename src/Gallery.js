import React, { useState } from "react";
import axios from "axios";
import Picturecard from "./Picturecard";

const Gallery = () => {
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  const searchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos/?query=${category}&client_id=t4ccjeUgLYVfuN66h1iKdFfLdRGOV6-Ka6NLpoMotJM`
      );
      setImages(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="gallery-container">
      <h1 className="mb-4">Unsplash</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter a category name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button onClick={searchImages}>Search</button>
      </div>
      <div className="image-grid">
        {images.map((image) => (
          <Picturecard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
