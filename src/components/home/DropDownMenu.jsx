import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { navData } from '../../constants/data';
/* import { Box, styled } from '@mui/material'; */


const DropDownMenu = ({onSelect}) => {
  const [isClicked, setIsClicked] = useState(false);
  /* const [isHovered, setIsHovered] = useState(false); */
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategoryItems, setSubCategoryItems] = useState([]);

  const validCategories = [
    "fashion",
    "electronics",
    "beauty",
    "auto",
    "home",
    "accessories"
  ];

  const subcategories = {
    'fashion': ["women's dresses", "men's fashion", "men's Shoes", "men's watches", "tops", "women's shoes", 'womens bags'],
    'electronics': ["laptops", "tablets"],
    "beauty": ['fragrances', 'skincare', 'automotive'],
    "auto": ['vehicle', "motorcycle"],
    "home": ['home decoration', 'furniture'],
    "accessories": ['kitchen accessories', 'sports accessories', 'sunglasses', 'womens jewellery' , 'womens watches']
  };

  /* useEffect(() => {
    // Set the initial sub-category items based on the initial category
    setSubCategoryItems(subcategories[selectedCategory] || []);
     console.log(subcategories[selectedCategory]); 
  }, [selectedCategory]); */

  useEffect(() => {
    if (selectedCategory) {
      setSubCategoryItems(subcategories[selectedCategory]);
    } else {
      setSubCategoryItems([]);
    }
  }, [selectedCategory]);

 /*  const handleMouseEnter = (category) =>{
    setSelectedCategory(category);
    setIsClicked(true);
    }; */

  const handleMouseLeave = () => {
    setSelectedCategory('');
    setIsClicked(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    /* if(category === subcategories[selectedCategory])*/
    onSelect(category);
    setIsClicked(true);
    console.log(category);
  };

  return (
    <>
    {navData.map((data, index) => (
    <div className="dropDown_div" onClick={()=> setIsClicked(true)} onMouseLeave={handleMouseLeave}>
      <Link style={{textDecoration: 'none', color: 'inherit'}}
       to={`/products/category/${encodeURIComponent(data.text)}`}>
        <div className={`dropDown_span ${isClicked ? 'active' : ''}`}>
          <div className={`listItems ${isClicked ? 'show' : ''}`}>
          <ul>
          {subCategoryItems.map((item, index) => (
              <li className='navbar_items' key={index}>{item}</li>
            ))}
          </ul>
          </div>
          
        </div>
        {isClicked && (
        <ul>
          {validCategories.map((category, index) => (
            <li
              className='navbar_items'
              key={index}
               /* onMouseEnter={() => handleMouseEnter(category)} */
              onClick={() => handleCategoryClick(category)}
            ><Link className='link' to=''>{category}</Link>
              
            </li>
          ))}
        </ul>
      )}
      
      </Link>
      
    </div>
    ))}
    </>
  )
}

export default DropDownMenu;