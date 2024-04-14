import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import cartIcon from '../assets/cart-icon.svg'
import searchIcon from '../assets/search-icon.svg'
import menuicon from '../assets/menu-icon.svg'
import { useState } from "react";

function Suggest({setinput, setSuggestions, ...params }) {
 let navigate=useNavigate()
 
  const location=useLocation();
  const handlesuggest=(name)=>{
    setinput(name)
      setSuggestions([])
      console.log(setSuggestions,"jsj")
   
    let val=name;
  
    
  console.log("State before navigation:", { name: val });
    
    navigate('/search/?query='+name);
   
  }
  console.log(location.pathname) 
  return   <div onClick={()=>handlesuggest(params.name)}>
        
        {params.name}
    </div>
    
}

export function Header() {
    
  const [suggestions, setSuggestions] = useState([]);
  const [input, setinput] = useState("");
  const [navresp, setnavresp] = useState(false);
  let headerstyle= { display:"flex" }

  const handlesugg=async(input)=>{
    if(input.trim()==""){
      setSuggestions([])
        return;
    }
    let suggUrl = "http://localhost:3000/api/search?query="+input;
    let sugg=await fetch(suggUrl,{
      method:'get',
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
       

  }
 
  )
  
  const json = await sugg.json();
  console.log(json.data)
   setSuggestions(json.data)
  
}
const handleinput=(e)=>{
    handlesugg(e.target.value )
    setinput(e.target.value )
       }
    return <>
    <div className='header'>
        <span className='header-logo'>E-COMMERCE</span>
        <div className='search-con'>
        { (!suggestions.length==0)&&
            <div className="header-sugg">
                
                      {suggestions.map(data => (
                        <Suggest key={data._id}  setinput={setinput}   setSuggestions={setSuggestions} {...data}/>))}    
      
            </div>} 
          <input value={input} onChange={handleinput} className='search-input' type="text" />
          <Link to={"/search/?query="+input}><img onClick={()=>setSuggestions([])} className='header-cart' src={searchIcon} alt="Cart" /></Link>
      
        </div>
        <button  className="menu-icon-button" onClick={() => setnavresp(!navresp)}><img className='header-cart menu' src={menuicon} alt="menu"/></button>
        
        <div style={(!navresp)?{}:headerstyle} className="header-response">
          <Link className="cart-con" to="/"><li>Home</li></Link>
          <Link className="cart-con" to="/vieworders"><li>Orders</li></Link>

        
        <Link style={{display:"block"}}  to='/add'><button className="add-product">
          add Product
        </button></Link>
        
        <Link className="cart-con" to="/viewcart"><img className='header-cart' src={cartIcon} alt="Cart"/></Link>
        </div>
      </div>
    </>
}