import React, { useState, useEffect } from 'react'
import { InputBase, List, ListItem, Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// importing icon from mui
import SearchIcon from '@mui/icons-material/Search';

const SearchContainer = styled(Box)`
  border-radius: 5px;
  margin-left: 35px;
  width: 40%;
  background-color: #fff;
  display: flex;
`;
const SearchIconWrapper = styled(Box)`
  margin-left: auto;
  padding: 5px;
  display: flex;
  color: blue;
`;
const InputSearchBase = styled(InputBase)`
  font-size: unset;
  width: 100%;
  padding-left: 20px;
`;

const ListWrapper = styled(List)`
  position: absolute;
  color: #000;
  background: #FFFFFF;
  margin-top: 36px;
`;

// function starts
const Search = () => {

  const [text, setText] = useState('');
  const [productData, setProductData] = useState([]);
  const items =  useSelector((state) => state.allCart.item);
  useEffect(() => {
    setProductData(items);
  }, [items]);

  const getText = (text) => {
    setText(text);
  }

  return (
    <SearchContainer>

      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      
      <InputSearchBase
        placeholder="Search for products, brands and more"
        onChange={(e) => getText(e.target.value)}
        value={text}
      />
      
      {
        text && <ListWrapper>
          {
            productData.filter(product => product.title.toLowerCase().includes(text.toLowerCase())).map(product => (
              <ListItem>
                <Link to={`products/${product.id}`} style={{ textDecoration: 'none', color: 'initial' }} onClick={()=>setText('')}>
                  {product.title}
                </Link>
              </ListItem>
            ))
          }
        </ListWrapper>
      }

    </SearchContainer>
  )
}

export default Search;