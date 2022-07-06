import React, { useState, useEffect } from 'react';
import { Link,useParams } from "react-router-dom";
import axios from 'axios';
import Product from './Product';
import styled from "styled-components";
import Navbar from './Navbar';




const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;






export default function SearchProduct() {
  const{id}=useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
    .get(`http://127.0.0.1:8000/search/${id}`)
    .then((res) => {
      console.log(res.data);
      setProducts(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
    },
    []);

    return (
      <div>
<Navbar/>
<Container>
     {products.map((item) => (
      <Product item={item} key={item.id} name={item.name}  />
      ))}
    </Container>      </div>
 
    );
}
