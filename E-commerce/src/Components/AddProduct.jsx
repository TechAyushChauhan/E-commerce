import { useEffect, useRef, useState } from "react"
import imageicon from '../assets/upload-icon.svg'
import "../Components/addproduct.css";
import { BrowserRouter, Routes, Route,Navigate, Outlet,Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Header } from "./Header";




export function AddProduct() {
  
  const { id } = useParams();

  const navigate = useNavigate();
  let dataset={
    "name":"",
    "desc":"",
    "img":"",
    "price":""
  }
  const [inputdata,setinputdata]=useState( {...dataset })
    const [image, setimage]=useState(imageicon)
    const imgRef=useRef() 
    const  imgclick=  ()=> {
       imgRef.current.click()
     }  

     const uploadImg = async (file) => {
      const formData = new FormData();
      formData.append('image', file);
    
      try {
          let uploadUrl = "http://localhost:3000/upload"
          const response = await axios.post(uploadUrl, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          let url= response.data.url
          setinputdata({
            ...inputdata,  
            img: url,  
          })
          

        
      } catch (error) {
          console.error('Error uploading file:', error);
      }
  };                                                                  
   async function handleImgSelect(e) {
    await uploadImg(e.target.files[0])

       setimage(URL.createObjectURL(e.target.files[0]))
    }
    const handleinputs=(e)=>{
        setinputdata({
          ...inputdata,  
          [e.target.id]: e.target.value,  
        })
        console.log(inputdata)
    }
    async function handleImgSelect(e) {
      await uploadImg(e.target.files[0])
  
         setimage(URL.createObjectURL(e.target.files[0]))
      }
      const handleClear=()=>{
        setinputdata({...dataset })
        setimage(imageicon)
      }
      const handleEdit=async()=>{
         let addUrl = "http://localhost:3000/edit/"+id
      let Added = await fetch(addUrl,{
          method:'PUT',
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body:JSON.stringify(inputdata)
      })
      let json=await Added.json();
      console.log(json)
      if (json.status=="success") {
        alert("Changes Saved Successfully");
        navigate("/")
      }else{
        alert("Something went wrong");
        
      }
    
          }
      
     
      
const handlesave=async()=>{
  if (id) {
    handleEdit();
    return
  }
  let addUrl = "http://localhost:3000/add"
  let Added = await fetch(addUrl,{
      method:'POST',
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body:JSON.stringify(inputdata)
  })
  navigate("/")
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
          
          setinputdata(json.data)
          
        } catch (error) {
          console.error('Error', error);
        
         
        }
      };
      if(id)  {fetchProduct(); }
        
      },[])
      

    return ( <>
    <Header/>
    
    <div className="add-image-con">
    <img onClick={imgclick} className='image-select' src={(!id)?image:(inputdata.img=="")?image:"http://localhost:3000/"+inputdata.img} alt="Cart" />
    <input className="img-select" type="file"  ref={imgRef} onChange={handleImgSelect}  name="image" accept="image/*"/>
    </div>
    <section className="add-ti">
    <div className="title-in">
      
    <label htmlFor="name">name of Product</label>
    <input value={inputdata.name} onChange={handleinputs} type="text" id="name"/>
    </div>
    <div className="title-in">
    <label  htmlFor="price">Price</label>

    <input value={parseInt(inputdata.price)} onChange={handleinputs} type="number" id="price"/>
    
    </div></section>
   
    <div className="desc-con">
    <label  htmlFor="desc">Description</label>
    <textarea value={inputdata.desc} onChange={handleinputs}  id="desc"/>
    </div>
    <div className="add-product-con">
      <button onClick={handleClear} className="add-product-clear">
        Clear
      </button>
      <button onClick={handlesave} className="add-product-save">
        Save
      </button>
    </div>
   
    
    </>

    )}