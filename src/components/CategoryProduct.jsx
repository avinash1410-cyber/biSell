import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Product from "./Product";
import styled from "styled-components";
import Navbar from "./Navbar";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function CategoryProduct() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios.get(`https://avinash8654340.pythonanywhere.com/category/${id}`)
      .then((res) => {
        setProducts(res.data);
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
  }, [id]); // Add 'id' to the dependency array

  return (
    <>
      <Navbar />
      <Container>
        {products.map((item) => (
          <Product item={item} key={item.id} name={item.name} />
        ))}
      </Container>
    </>
  );
}

export default CategoryProduct;