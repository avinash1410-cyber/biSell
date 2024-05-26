import { React, useState, useEffect, useContext } from 'react';
import useAxios from '../utils/useAxios';
import CartItems from './CartItems';
import AuthContext from '../context/AuthContext';
import Navbar from '../components/Navbar';
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export default function Cart() {
  const api = useAxios();
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/cart/");
        console.log(res);
        console.log(user);
        setProducts(res.data);
        console.log(products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [api, products, user]); // Include dependencies in the dependency array

  return (
    <div>
      <Navbar />
      <h1>Your Products</h1>
      <Container>
        {products.map((item) => (
          <CartItems item={item} key={item.id} name={item.name} />
        ))}
      </Container>
    </div>
  );
};