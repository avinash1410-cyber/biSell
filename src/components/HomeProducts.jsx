import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Product from "./Product";
import axios from 'axios';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const HomeProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = () => {
      axios
        .get('https://avinash8654340.pythonanywhere.com/')
        .then((res) => {
          console.log(res);
          const firstThreeProducts = res.data.slice(0, 3);
          setProducts(firstThreeProducts);
          console.log(res.data); 
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchProducts();
  }, []); // No dependency needed here

  return (
    <div>
      <Container>
        {products.map((item) => (
          <Product item={item} key={item.id} name={item.name}  />
        ))}
      </Container>
    </div>
  );
};

export default HomeProducts;