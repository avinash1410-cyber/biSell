import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import {mobile} from "../responsive";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;







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
<>
<Navbar/>
    <Container>
    <Wrapper>
      <Title>ADD DESGN</Title>
      <Form>
      <Input type="File" accept="image/*" onChange={handleFileChange} placeholder="Image" />
      <Input type="text" name="design" placeholder="Design" onChange={handleChange} />
        <Button onClick={handleUpload}>LOGIN</Button>
      </Form>
      <Link to="/">Home</Link>
    </Wrapper>
  </Container>
    </>
     );
}

export default Upload;