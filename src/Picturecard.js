import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
const Picturecard = ({ image }) => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [word, setWord] = useState([]);
  const [Result, setResult] = useState([]);
  
  const handelSearch = async(e) => {
    if (start && end) {
      const userInput = image.description.split(' ').slice(Number(start)-1 , Number(end));
      console.log(userInput)
      // console.log(userInput)
      setWord(e.target.value)
      let wordResult = [];
     for(let word of userInput){
        try{
          const serverResp=await axios.get(`https://api.unsplash.com/search/photos/?query=${word}&client_id=t4ccjeUgLYVfuN66h1iKdFfLdRGOV6-Ka6NLpoMotJM`)
          wordResult=serverResp.data.results;
          console.log(wordResult);
        }
        catch(error){
          console.error(error)
        }
        setResult(wordResult)
      }
    }
  }

  const handelstartChange = (e) => {
    setStart(e.target.value);
  }
  const handelendChange = (e) => {
    setEnd(e.target.value);
  }
  return (
    <>    <div className="image-card">
      <img src={image.urls.regular} alt={image.description} />
      <div className="image-info">
        <p style={{ fontSize: "20px" }}>Author: {image.user.name}</p>
        <p style={{ fontSize: "20px" }}>Description: {image.description || 'No description available'}</p>
        <a className='btn btn-success' href={image.links.html} target="_blank" rel="noopener noreferrer">
          View on Unsplash
        </a>
      </div>
      <div className="container">
        <input type="text" placeholder='Enter Start position' value={start} onChange={handelstartChange} />
        <input type="text" placeholder='Enter Start position' value={end} onChange={handelendChange} />
        <button className='btn btn-success' onClick={handelSearch}>Search</button>
      </div>
    </div>
    <div className="result">
       {Result.map((result) => (
          <img key={result.id} src={result.urls.small} />
        ))}
    </div>
  </>

  );
};

export default Picturecard;
