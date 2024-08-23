import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../App.css';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
/* import DetailView from '../details/DetailView'; */
import { addToCart } from '../../feature/cartSlice';

const CategoryPage = () => {
  const { category } = useParams();
  const lowercaseCategory = category.toLowerCase();

  let [tempCategoryProducts, setProducts] = useState([]);
  const dispatch = useDispatch();

  /* useEffect(() => {
    try{
    // Check if the lowercase category is valid
    if ((validCategories.includes(lowercaseCategory))/* || (fashion.includes(lowercaseCategory))*/ /*) {
      const callApi = async (category) => {
        const response = await fetch */ /* (`https://dummyjson.com/products/category/${lowercaseCategory}`); */ /*(`https://fakestoreapi.com/products/category/${lowercaseCategory}`);
        /* if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setProducts(data);
        console.log('API Response:', tempCategoryProducts);
      };
      callApi(lowercaseCategory);
    } 
    else 
    {
      console.error('Invalid category:', lowercaseCategory);
    }
  } catch (error){
      console.error('Error fetching data:', error);
    }
  }, [lowercaseCategory, tempCategoryProducts]); */

  /* useEffect(() => {
    console.log('Updated tempCategoryProducts:', tempCategoryProducts);
  }, [tempCategoryProducts]); */

  const callApi = async (lowercaseCategory) => {
    try{
    const response = await fetch (`https://dummyjson.com/products/category/${lowercaseCategory}`); /* (`https://fakestoreapi.com/products/category/${lowercaseCategory}`); */
    const data = await response.json();
    if (data && data.products && Array.isArray(data.products)) {
      setProducts(data.products);
      } else{
        console.error('Invalid data format:', data);
      }
    } catch(error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    callApi(lowercaseCategory);
  }, [lowercaseCategory]);

  const handleAddToCart = (item) =>{
    dispatch(addToCart(item));
  }

  return (
    <div>
      <h2 style={{padding: '15px 50px'}}>{category} Products</h2>
      {/* {Array.isArray(tempCategoryProducts) ? ( */}
      {tempCategoryProducts.length > 0 ? (
      tempCategoryProducts.map((item) => (
        <div key={item.id}>
          <div style={{padding: '20px 60px', fontWeight: '700'}}>{item.title}</div>
          <div className="col-3" key={item.id}>
                <div className="card">
                    <div className="imagDiv">
                        <img
                            src=/*{item.image}*/ {item.thumbnail}
                            className="card-img-top product-image-list"
                            alt={item.title}
                        />
                    </div>    
                  <div className="card-body">
                    <h5 className="product-title-list">
                      {item.title}
                    </h5>
                    <span className="card-text product-description-list">
                      {item.description}
                    </span>
                    <h5 className="card-title">₹{Math.round(30 * item.price)}</h5>
                    <Button
                      /*to={DetailView} {`/products/${item.id}`} */
                      onClick={() => handleAddToCart(item)}
                      className="btn btn-primary button-buy-now"
                    >
                      Buy Now
                    </Button>
                    <Link
                      to={`/products/${item.id}`}
                      className="btn btn-primary button-add-to-cart"
                    >
                      Add to Cart
                    </Link>
                  </div>
                </div>
              </div>
        </div>
      ))
      ):(
        <span className='loading-api'>Loading...</span>
      )}
    </div>  
  );
};

export default CategoryPage;
