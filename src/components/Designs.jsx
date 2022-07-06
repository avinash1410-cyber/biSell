import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { Link } from 'react-router-dom';
import axios from 'axios';
import DesignView from '../pages/DesignView';



const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Designs = () => {

  const [products, setProducts] = useState([]);
useEffect(() => {
    fetchProducts();
  }, []);
const fetchProducts = () => {
    axios
      .get('http://127.0.0.1:8000/design/')
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      {products.map((item) => (
        <DesignView item={item} key={item.id} name={item.name}  />
      ))}
    </Container>
  );
};
export default Designs;