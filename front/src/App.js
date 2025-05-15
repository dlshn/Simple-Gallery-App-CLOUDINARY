import './App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);

  const fetchImages = async () => {
    try{
      const res = await axios.get('http://localhost:5000/api/images');
      setImages(res.data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append('image', image);

    try{
      const res = await axios.post('http://localhost:5000/api/images/upload', formData);
      setImages([res.data, ...images]);
      setImage(null);
      
    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
      <div className="App">

        <h1>Image Gallery</h1>
        <form onSubmit={handleSubmit}>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])}/>
          <button type="submit">Upload</button>
        </form>
        
      </div>

      <div className="gallery">
        {images.map((image) => (
          <img key={image._id} src={image.url}></img>
        ))}
      </div>
         
    </>
  );
}

export default App;
