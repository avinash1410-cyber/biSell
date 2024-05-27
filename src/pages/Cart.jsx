import React, { useState, useEffect, useContext } from 'react';
import useAxios from '../utils/useAxios';
import CartItems from './CartItems';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import styled from "styled-components";

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

const CartContainer = styled.div`
  padding: 20px;
`;

export default function Cart() {
  const api = useAxios();
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        if (user) {
          const res = await api.get("/cart/");
          setProducts(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [user, api]);

  return (
    <CartContainer>
      <Navbar />
      <Heading>Your Products</Heading>
      <Container>
        {products.map((item) => (
          <CartItems item={item} key={item.id} name={item.name} />
        ))}
      </Container>
    </CartContainer>
  );
}