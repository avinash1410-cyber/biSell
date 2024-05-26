
import { useParams } from 'react-router-dom';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import Product from "./Product";
import styled from "styled-components";
import Navbar from "./Navbar";


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;



function ArtistDesigns(){
  const [designs, setDesigns] = useState([]);
  const{id}=useParams();
  console.log(id);

  useEffect(()=>{
    axios.get(`https://avinash8654340.pythonanywhere.com/artist/${id}/designs`)
    .then((res)=>{
        setDesigns(res.data);
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
  },[]);



  return (
    <>
    <Navbar></Navbar>
    <Container>
      {designs.map((item) => (
        <Product item={item} key={item.id} name={item.name}  />
      ))}
    </Container>
    </>
  );

}

export default ArtistDesigns;