import { useState } from 'react'
import './App.css'

import { ProductCard } from './Components/ProductCard';
import { AddProduct } from './Components/AddProduct';
import Main from '../src/Components/Main.jsx';
import React from 'react';

function App() {
  const [page , setpage]=useState({add:false,cart:false})

  return (
    <>
    
    
     
      <Main  />
      
      <footer className='footer'>

        </footer> 
     
    </>
  )
}

export default App
