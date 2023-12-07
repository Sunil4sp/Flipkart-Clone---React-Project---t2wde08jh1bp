import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
/* import { Box, styled } from '@mui/material'; */


const DropDownMenu = ({onSelect}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategoryItems, setSubCategoryItems] = useState([]);

  const validCategories = [
    "fashion",
    "electronics",
    "beauty, toys & more",
    "two wheelers",
    "home & furniture",
  ];

  const subcategories = {
    'fashion': ["women's fashion", "men's fashion"],
    'electronics': ["laptops", "lighting"],
    "beauty, toys & more": ['fragrances', 'skincare', 'automotive'],
    "home & furniture": ['home-decoration', 'furniture']
  };

  useEffect(() => {
    // Set the initial sub-category items based on the initial category
    setSubCategoryItems(subcategories[selectedCategory] || []);
    console.log(subcategories[selectedCategory]);
  }, [selectedCategory]);

  /* const handleMouseEnter = (category) =>{
    setSelectedCategory(category);
    setIsClicked(true);
  };
 */
  /* const handleMouseLeave = () => {
    setSelectedCategory('');
    setIsClicked(false);
  }; */

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if(category === subcategories[selectedCategory])
    setIsClicked(true);
    onSelect(category);
  };

  return (
    <div className="dropDown_div" /* onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} */>
        <span className={`dropDown_span ${isClicked ? 'active' : ''}`}>
          <div className={`listItems ${isClicked ? 'show' : ''}`}>
          <ul>
          {subCategoryItems.map((item, index) => (
              <li className='navbar_items' key={index}>{item}</li>
            ))}
          </ul>
          </div>
        </span>
        {isClicked && (
        <ul>
          {validCategories.map((category, index) => (
            <li
              className='navbar_items'
              key={index}
              /* onMouseEnter={() => handleMouseEnter(category)} */
              onClick={() => handleCategoryClick(category)}
            ><Link to=''>{category}</Link>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropDownMenu;