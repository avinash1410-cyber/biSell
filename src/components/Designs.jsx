import React, { useState, useEffect, useCallback } from 'react';
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

const Designs = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(() => {
    axios
      .get('https://avinash8654340.pythonanywhere.com/design/')
      .then((res) => {
        console.log(res);
        setProducts(res.data);
        console.log(res.data); // Use res.data instead of products
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Include fetchProducts in the dependency array

  return (
    <div>
      <h1>Designs By Our Artist</h1>
      <Container>
        {products.map((item) => (
          <Product item={item} key={item.id} name={item.name} />
        ))}
      </Container>
      <Link to="/product">see more</Link>
    </div>
  );
};

export default Designs;