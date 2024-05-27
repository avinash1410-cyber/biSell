import styled from "styled-components";
import { Link } from "react-router-dom";

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
  flex-direction: column; /* Added */
  align-items: center; /* Added */
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

const ProductName = styled.span`
  color: white; /* Added */
  font-size: 18px; /* Added */
  text-align: center; /* Added */
  background-color: rgba(0, 0, 0, 0.5); /* Added */
  padding: 10px; /* Added */
  border-radius: 10px; /* Added */
`;

const DesignItemSort = ({ designs }) => {
  const displayDesigns = designs.slice(0, 3); // Display only the first three designs

  return (
    <>
      {displayDesigns.map((item) => (
        <Link key={item.id} to={`/design/${item.id}`}>
          <Container>
            <Circle />
            <Image src={`https://res.cloudinary.com/dh9lxhvqt/${item === null ? 'loading' : item.image}`} alt="Product Image"/>
            <Info>
              <ProductName>{item.name}</ProductName> {/* Show the product name */}
            </Info>
          </Container>
        </Link>
      ))}
    </>
  );
};

export default DesignItemSort;