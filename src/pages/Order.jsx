import { React, useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import OrderItems from './OrderItems';
import styled from "styled-components";
import Navbar from '../components/Navbar';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export default function Order() {
  const api = useAxios();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/order/");
        console.log(res);
        setProducts(res.data);
        console.log(products);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [api, products]); // Include api and products in the dependency array

  return (
    <div>
      <h1>Your Orders</h1>
      <Navbar />
      <Container>
        {products.map((item) =>
        (
          <OrderItems item={item} key={item.id} name={item.name} />
        ))}
      </Container>
    </div>
  );
}