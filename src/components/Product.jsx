import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import useAxios from '../utils/useAxios';
import { SearchOutlined, LocalShipping, ShoppingCartOutlined } from "@material-ui/icons";



const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const ProductName = styled.span`
  color: white;
  font-size: 18px;
`;

const Product = ({ item }) => {
  const api = useAxios();
  const nav = useNavigate();

  async function addToCart() {
    const res = await api.get(`/cart/addData/${item.id}/`);
    console.log(res)
    alert(res.data.message);
    nav("/cart");
    window.location.reload();
  }

  async function bookOrder() {
    const res = await api.get(`/order/addData/${item.id}/`);
    console.log(res)
    alert(res.Message);
    nav("/order");
    window.location.reload();
  }

  return (
    <Link to={`/product/${item.id}`}>
      <Container>
        <Circle />
        <Image src={`https://res.cloudinary.com/dh9lxhvqt/${item === null ? 'loading' : item.image}`} alt="Product Image"/>
        <Info>
          <ProductName>{item.name}</ProductName>
          <Icon onClick={addToCart}>
            <ShoppingCartOutlined/>
          </Icon>
          <Icon>
            <SearchOutlined/>
          </Icon>
          <Icon onClick={bookOrder}>
            <LocalShipping/>
          </Icon>
        </Info>
      </Container>
    </Link>
  );
};

export default Product;