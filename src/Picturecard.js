import React from 'react';
import './App.css';
const Picturecard = ({ image }) => {
  return (
    <div className="image-card">
      <img  src={image.urls.regular} alt={image.description} />
      <div className="image-info">
        <p>Author: {image.user.name}</p>
        <p>Description: {image.description || 'No description available'}</p>
        <a className='btn btn-success'  href={image.links.html} target="_blank" rel="noopener noreferrer">
          View on Unsplash
        </a>
      </div>
    </div>
  );
};

export default Picturecard;
