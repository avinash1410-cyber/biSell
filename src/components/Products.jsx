import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Product from "./Product";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios
      .get('https://avinash8654340.pythonanywhere.com/')
      .then((res) => {
        console.log(res);
        setProducts(res.data);
        console.log(products); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []); // No dependency needed here

  return (
    <div>
      <h1>Our Products</h1>
      <Container>
        {products.map((item) => (
          <Product item={item} key={item.id} name={item.name}  />
        ))}
      </Container>
      <Link to="/product">see more</Link>
    </div>
  );
};

export default Products;