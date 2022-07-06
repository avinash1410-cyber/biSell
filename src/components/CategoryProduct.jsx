import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import ProductList from '../pages/ProductList';
import CategoryProductList from './CategoryProductList';


export default function CategoryProduct() {
    const{ id }=useParams();
    return (
    <div>
        <CategoryProductList id={id}/>
    </div>

  )
}