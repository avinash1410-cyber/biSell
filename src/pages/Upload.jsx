import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function Upload({ artistValue }) {
  const [designData, setDesignData] = useState({ image: null, artist: artistValue, design: '' });

  const handleFileChange = (event) => {
    setDesignData({ ...designData, image: event.target.files[0] });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDesignData({ ...designData, [name]: value });
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('image', designData.image);
    formData.append('artist', designData.artist);
    formData.append('design', designData.design);

    axios.post('/api/upload-design/', formData)
      .then(response => {
        console.log('Design uploaded successfully:', response.data);
        // Add logic here to handle successful response, e.g., update UI
      })
      .catch(error => {
        console.error('Error uploading design:', error);
        // Add error handling logic here, e.g., show error message to user
      });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <input type="text" name="design" placeholder="Design" onChange={handleChange} />
      <button onClick={handleUpload}>Upload Design</button>
    </div>
  );
}

export default Upload;