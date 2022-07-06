import{React,useState,useEffect} from "react"
import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import axios from "axios";


const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}

`;

const Categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/category/available/")
    .then((res)=>{
      setCategories(res.data);
    }).catch((err)=>{
        console.log(err);
    })
  },[]);



  
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
