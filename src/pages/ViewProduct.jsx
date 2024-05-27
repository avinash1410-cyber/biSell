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
  align-items: flex-start;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
`;

const ImgContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 400px;
  background-color: #f8f8f8;
  border-radius: 10px;
  overflow: hidden;
  ${mobile({ width: "100%", height: "300px" })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  ${mobile({ height: "100%" })}
`;

const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

const ZoomedImageContainer = styled.div`
  position: absolute;
  display: none;
  border: 2px solid #000;
  overflow: hidden;
  z-index: 10;
  width: 150px;
  height: 150px;
  pointer-events: none;
`;

const ZoomedImage = styled.img`
  position: absolute;
  width: 400%;
  height: 400%;
  object-fit: cover;
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
  margin-bottom: 10px;

  &:hover {
    background-color: #f8f4f4;
    color: teal;
  }
`;

function ViewProduct() {
  const [Item, setItem] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [defaultImage, setDefaultImage] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });

  useEffect(() => {
    axios
      .get(`https://avinash8654340.pythonanywhere.com/${id}`)
      .then((res) => {
        setProduct(res.data);
        setDefaultImage(res.data.image);
        setThumbnails([
          res.data.image1,
          res.data.image2,
          res.data.image3,
          res.data.image4
        ]);
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
    navigate("/cart");
  }

  function addPay() {
    navigate(`/pay/${id}`, {
      state: { productid: id, amount: product.price, product_name: product.name },
    });
  }

  function changeMainImage(src) {
    setDefaultImage(src);
  }

  function handleMouseMove(e) {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      display: "block",
      left: `${e.clientX + 20}px`,
      top: `${e.clientY + 20}px`,
      transform: `translate(-50%, -50%)`,
      backgroundPosition: `${x}% ${y}%`,
    });
  }

  function handleMouseLeave() {
    setZoomStyle({ display: "none" });
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ContentContainer>
          <ThumbnailsContainer>
            {thumbnails.map((src, index) => (
              <Thumbnail
                key={index}
                src={`https://res.cloudinary.com/dh9lxhvqt/${src}`}
                alt={`Thumbnail ${index}`}
                onClick={() => changeMainImage(src)}
              />
            ))}
          </ThumbnailsContainer>
          <ImgContainer>
            <ZoomedImageContainer style={zoomStyle}>
              <ZoomedImage src={`https://res.cloudinary.com/dh9lxhvqt/${defaultImage}`} />
            </ZoomedImageContainer>
            <Image
              src={`https://res.cloudinary.com/dh9lxhvqt/${defaultImage}`}
              alt="Product Image"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          </ImgContainer>
          <InfoContainer>
            <Title>{product === null ? "loading" : product.name}</Title>
            <Desc>
              About: {product && product.description ? product.description : "N/A"}
            </Desc>
            <Desc>
              Artist: {product && product.artist ? product.artist.id : "N/A"}
            </Desc>
            <Desc>
              Design: {product && product.design ? product.design.id : "N/A"}
            </Desc>
            <Desc>
              Category: {product && product.cat ? product.cat.id : "N/A"}
            </Desc>
            <Desc>
              Size: {product === null ? "loading" : product.size}
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