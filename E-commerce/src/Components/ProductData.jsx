import { useRef, useState,useEffect } from "react";
import "../Components/addproduct.css";
import { BrowserRouter, Routes, Route,Navigate, Outlet,Link, useNavigate, json } from "react-router-dom";

import './productdata.css'
import { useParams } from 'react-router-dom';
import { Header } from "./Header";




export function ProductData() {
  const [response,setresponse]=useState("");
  const [error,seterror]=useState(null)
  const navigate=useNavigate(); 
  const { id } = useParams();
   const handleError= () =>{
    seterror("Sorry, this feature is not available yet");
    setTimeout(() => {
      seterror(null)
    }, 2000);
    }
  const editHandle= () => {
    navigate(`/edit/${id}`);
   
  }
  useEffect(()=>{
    let producturl="http://localhost:3000/item/"+id;
     
    const fetchProduct = async () => {
        try {
      const response = await fetch(producturl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',},
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      
      setresponse(json.data)
      
    } catch (error) {
      console.error('Error', error);
    
     
    }
  };
    fetchProduct(); 
  },[])

  const handleDelete=async()=>{
    let delUrl = "http://localhost:3000/delete/"+id
    let del=await fetch(delUrl,{
      method:'Delete',
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
  })
  let json=await del.json()
  if (json.status=="success") {
    alert("Product Deleted");
    navigate("/")
  }else{
    alert("Something went wrong");
    
  }
  }


    return <>
    <Header/>
     
      <div className="product-data-con">
        <div><img src={(!response.img)?"":"http://localhost:3000/"+response.img} className="product-img"/></div>
      
      <div className="product-data ">
          <p>{(!response.name)?"":response.name}</p>
          <p>$ {(!response.price)?"":response.price}</p>
          <p> {(!response.desc)?"":response.desc}</p>
      </div>
      </div>
      {
         error&&<div style={{color:"red",textAlign:"center"}}>{error}</div>}

      <div className="productdata-buttons-con">

        <button onClick={handleError}>Add to Cart</button>
      <button onClick={handleError}>Checkout the product</button>
      <button onClick={editHandle}>Edit </button>
      <button onClick={handleDelete}>Delete </button>

      </div>
    
    </>
}