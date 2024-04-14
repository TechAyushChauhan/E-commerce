import './productcard.css'
import { useNavigate } from 'react-router'

export function ProductCard(response) {
 
  const navigate = useNavigate();
  const handleProduct=(id)=>{
    
    navigate(`/item/${id}`);
  }

    return (
        <>
          <div onClick={()=>handleProduct(response._id)} className='product-card'>
          <img className='product-card-img' src={"http://localhost:3000/"+response.img} alt="Product" />
          <section className='product-card-details'>
          <p className='product-card-tittle'>
          {response.name}
          </p>
          <p className='product-card-price'>
          $ <span>{response.price}</span>
          </p>
          </section>

           
          </div>
         
        </>)

}

