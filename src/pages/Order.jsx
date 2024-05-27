import React, { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import OrderItems from './OrderItems';
import styled from "styled-components";
import Navbar from '../components/Navbar';

// Styled components
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Heading = styled.h1`
  margin: 20px;
  text-align: center;
`;

const OrderContainer = styled.div`
  padding: 20px;
`;

export default function Order() {
  const api = useAxios();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/order/");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [api]); // Removed 'products' from dependency array to prevent infinite loop

  return (
    <OrderContainer>
      <Navbar />
      <Heading>Your Orders</Heading>
      <Container>
        {products.map((item) => (
          <OrderItems item={item} key={item.id} name={item.name} />
        ))}
      </Container>
    </OrderContainer>
  );
}