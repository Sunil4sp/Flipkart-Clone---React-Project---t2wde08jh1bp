import React from 'react';
import { Link } from 'react-router-dom';
import { Box, styled, Typography } from '@mui/material'
import { navData } from '../../constants/data';

const Component = styled(Box)(
    ({ theme }) => (
        {
            display: 'flex',
            margin: '55px 130px 0 130px',
            justifyContent: 'space-between',
            overflow: 'hidden',
            [theme.breakpoints.down('lg')]: {
                margin: 0
            }
        })
);

const Container = styled(Box)`
    padding: 12px 8px;
    text-align: center;
`;
const Text = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
`;
// function starts
const NavBar = (event) => {

    /* const [tempCategoryProducts, setProducts] = useState([]);

    const callApi = async (category) => {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products?category/${category}`) *//* (`https://fakestoreapi.com/products/category/${category}`) */
      /* const data = await response.json();
      console.log(data);
      setProducts(data);
    }*/

    const handleItemClick = (category) => {
        console.log('Clicked Text:', category);
        /* callApi(category); */
      }; 
    
    return (
      <Component>
        {navData.map((data) => (
          <Container key={data.text} onClick={() => handleItemClick(data.text)}>
            <Link style={{textDecoration: 'none', color: 'inherit'}} to={`/products/category/${encodeURIComponent(data.text)}`}>
            <img src={data.url} alt="nav" style={{ width: 64, height: 64 }} />
            <Text key="{txt}">{data.text}</Text>
            </Link>
          </Container>
        ))}
      </Component>
    );
}

export default NavBar