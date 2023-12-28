import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../App.css';

const CategoryPage = () => {
  const { category } = useParams();
  const lowercaseCategory = category.toLowerCase();

  let [tempCategoryProducts, setProducts] = useState({});

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
      /* console.log(data.products); */
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


  return (
    <div>
      <h2 style={{padding: '20px 50px'}}>{category} Products</h2>
      {Array.isArray(tempCategoryProducts) ? (
      tempCategoryProducts.map((item) => (
        <div key={item.id}>
          <p style={{padding: '15px 60px', fontWeight: '700'}}>{item.title}</p>
          <div className="col-3" key={item.id}>
                <div className="card">
                    <div className="imagDiv">
                        <img
                            src=/*{item.image}*/ {item.thumbnail}
                            className="card-img-top product-image-list"
                            alt="..."
                        />
                    </div>    
                  <div className="card-body">
                    <h5 className="product-title-list">
                      {item.title}
                    </h5>
                    <p className="card-text product-description-list">
                      {item.description}
                    </p>
                    <h5 className="card-title">${item.price}</h5>
                    <Link
                      to={`/products/${item.id}`}
                      className="btn btn-primary button-buy-now"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
        </div>
      ))
      ):(
        <p className='loading-api'>Loading...</p>
      )}
    </div>  
  );
};

export default CategoryPage;
