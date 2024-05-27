import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div`
  background-color: #f5f5f5; /* Light background for better contrast */
`;

const Title = styled.h1`
  margin: 20px;
  font-size: 36px;
  font-weight: bold;
  color: #333; /* Darker color for the title */
  text-align: center; /* Center the title */
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff; /* White background for filter section */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
  ${mobile({ flexDirection: "column" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  ${mobile({ width: "100%", justifyContent: "space-between" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  color: #555; /* Softer color for filter text */
  ${mobile({ marginRight: "10px", fontSize: "18px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border: 1px solid #ddd; /* Light border */
  background-color: #fff; /* White background for select */
  color: #555; /* Softer color for select text */
  ${mobile({ margin: "10px 0px", width: "100%" })}
`;
const Option = styled.option`
  color: #333; /* Darker color for options */
`;

const ProductList = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>Dresses</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select>
            <Option disabled selected>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;