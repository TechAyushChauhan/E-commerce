import { BrowserRouter, Routes, Route,Navigate, Outlet,Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { AddProduct } from "./AddProduct";
import Cart from "./Cart";
import { ProductData } from "./ProductData";
import { useEffect, useState } from "react";
import { Header } from "./Header";
import { useLocation } from 'react-router-dom';




export default function Main(){
    
    

    return <>
    <BrowserRouter>
        <Routes>
            
            
            <Route path="/" element={<Home />}/>
            <Route path="/search" element={<Home />} />
            <Route path="/add" element={<AddProduct/>}/>
            <Route path="/viewcart" element={<Cart/>}/>
            <Route path="/vieworders" element={<Cart/>}/>
            <Route path="/item/:id" element={<ProductData/>}/>
            <Route path="/edit/:id" element={<AddProduct/>}/>
        </Routes>
    </BrowserRouter>
    </>
}
function Home() {
  const [response,setresponse]=useState([])
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const search = query.get('query'); 
  const handleQuery=async()=>{
  
    let queryUrl = "http://localhost:3000/search?query="+search;
    let sugg=await fetch(queryUrl,{
      method:'get',
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
       

  }

 
  )
  
  const json = await sugg.json();
  
  setresponse(json.data)
   
  
}
 

  useEffect(()=>{
    let producturl="http://localhost:3000/";
     
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
  if(search){
    handleQuery()
    return;
  }
    fetchProduct(); 
  },[location])

    return <>
    <Header/>
     
      <div className='product-con'>
      {response.map(data => (
          <ProductCard key={data._id}  {...data}/>
        ))}
     
      
    </div>
    </>
}