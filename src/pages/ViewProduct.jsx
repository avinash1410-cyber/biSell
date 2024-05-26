import { Add, Remove } from "@material-ui/icons";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import axios from "axios";
import React, { useState, useEffect } from "react";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Image = styled.img`
  width: 70%;
  margin-left: 30px;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

const BlackBoxes = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const BlackBox = styled.div`
  width: 60px;
  height: 60px;
  background-color: black;
  margin-right: 10px;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
  font-size: 24px;
`;

const Desc = styled.p`
  margin: 10px 0px;
  font-size: 14px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 30px;
`;

const AddContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
`;

const Amount = styled.span`
  width: 25px;
  height: 25px;
  border-radius: 8px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
  font-size: 14px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  width: 100%;

  &:hover {
    background-color: #f8f4f4;
    color: teal;
  }
`;

function ViewProduct() {
  const [Item, setItem] = useState(0);
  const { id } = useParams();
  const nav = useNavigate();
  const [product, setProduct] = useState(null);
  const [defaultImage, setDefaultImage] = useState(null);

  useEffect(() => {
    axios
      .get(`https://avinash8654340.pythonanywhere.com/${id}`)
      .then((res) => {
        setProduct(res.data);
        setDefaultImage(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  function incr() {
    let item = Item + 1;
    setItem(item);
  }

  function dcr() {
    let item = Math.max(Item - 1, 0);
    setItem(item);
  }

  function addcart() {
    nav("/cart");
  }

  function addPay() {
    nav(`/pay/${id}`, {
      state: { productid: id, amount: product.price, product_name: product.name },
    });
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ContentContainer>
          <ImgContainer>
            <Image src={`https://res.cloudinary.com/dh9lxhvqt/${defaultImage}`} alt="Product Image" />
            <BlackBoxes>
              <BlackBox />
              <BlackBox />
              <BlackBox />
              <BlackBox />
            </BlackBoxes>
          </ImgContainer>
          <InfoContainer>
            <Title>{product === null ? "loading" : product.name}</Title>
            <Desc>
              <Price>About: {product && product.description ? product.description : "N/A"}</Price>
            </Desc>
            <Desc>
              <Price>Artist: {product && product.artist ? product.artist.id : "N/A"}</Price>
            </Desc>
            <Desc>
              <Price>Design: {product && product.design ? product.design.id : "N/A"}</Price>
            </Desc>
            <Desc>
              <Price>Category: {product && product.cat ? product.cat.id : "N/A"}</Price>
            </Desc>
            <Desc>
              <Price>Size: {product === null ? "loading" : product.size}</Price>
            </Desc>
            <Price>$ {product === null ? "loading" : product.price}</Price>
            <AddContainer>
              <AmountContainer>
                <Remove onClick={dcr} />
                <Amount>{Item}</Amount>
                <Add onClick={incr} />
              </AmountContainer>
              <Button onClick={addcart}>ADD TO CART</Button>
              <Button onClick={addPay}>Order Now</Button>
            </AddContainer>
          </InfoContainer>
        </ContentContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default ViewProduct;