import React from 'react';
import {
  SearchOutlined,
  LocalShipping,
  RemoveShoppingCart,
} from "@material-ui/icons";
import styled from "styled-components";
import useAxios from '../utils/useAxios';
import { useNavigate } from "react-router-dom";

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

  &:hover ${Info}{
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

export default function CartItems({ item }) {
  const api = useAxios();
  const nav = useNavigate();

  async function handleLinkClick() {
    const res=await api.get(`/cart/remove/${item.id}/`);
    alert(res.data.message);
    nav("/cart");
    window.location.reload();
  }

  return (
    <Container>
      <Circle />
      <Image src={`https://res.cloudinary.com/dh9lxhvqt/${item.product === null ? 'loading' : item.product.image}`} alt="Product Image"/>
      <Info>
        <Icon onClick={handleLinkClick}>
          <RemoveShoppingCart />
        </Icon>      
        <Icon>
          <SearchOutlined />
        </Icon>
        <Icon>
          <LocalShipping />
        </Icon>
      </Info>
    </Container>
  );
}