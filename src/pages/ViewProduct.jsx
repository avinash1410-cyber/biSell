import { Add, Remove } from "@material-ui/icons";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import React, { useState, useEffect } from "react";
import useApiRequest from '../components/useApiRequest'; // Assuming you have a custom hook for API requests

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
  height: 600px;
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
  background-color: white;
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
  const [zoomedImageStyle, setZoomedImageStyle] = useState({});
  const { hitRequest } = useApiRequest();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await hitRequest(`https://avinash8654340.pythonanywhere.com/${id}`);
        setProduct(res);
        setDefaultImage(res.image);
        setThumbnails([
          res.image1,
          res.image2,
          res.image3,
          res.image4
        ]);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }
  
    fetchData();
  }, [hitRequest, id]); // Include hitRequest and id in the dependency array
   // Include hitRequest and id in the dependency array
  


  const incr = () => setItem(Item + 1);

  const dcr = () => setItem(Math.max(Item - 1, 0));

  const addcart = async () => {
    try {
      const res = await hitRequest(`/cart/addData/${id}`, 'GET');
      alert(res.Message);
      navigate("/cart");
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const addPay = () => {
    navigate(`/pay/${id}`, {
      state: { productid: id, amount: product?.price, product_name: product?.name },
    });
  };

  const changeMainImage = (src) => setDefaultImage(src);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      display: "block",
      left: `${e.clientX + 20}px`,
      top: `${e.clientY + 20}px`,
      transform: `translate(-50%, -50%)`,
    });

    setZoomedImageStyle({
      left: `${-x * 4}%`,
      top: `${-y * 4}%`,
    });
  };


  const handleMouseLeave = () => setZoomStyle({ display: "none" });

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
              <ZoomedImage
                src={`https://res.cloudinary.com/dh9lxhvqt/${defaultImage}`}
                style={zoomedImageStyle}
              />
            </ZoomedImageContainer>
            <Image
              src={`https://res.cloudinary.com/dh9lxhvqt/${defaultImage}`}
              alt="Product Image"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          </ImgContainer>
          <InfoContainer>
            <Title>{product ? product.name : "Loading..."}</Title>
            <Desc>About: {product?.description || "N/A"}</Desc>
            <Desc>Artist: {product?.artist?.id || "N/A"}</Desc>
            <Desc>Design: {product?.design?.id || "N/A"}</Desc>
            <Desc>Category: {product?.cat?.id || "N/A"}</Desc>
            <Desc>Size: {product ? product.size : "Loading..."}</Desc>
            <Price>$ {product ? product.price : "Loading..."}</Price>
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