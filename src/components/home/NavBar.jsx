import React from 'react';
import { Link } from 'react-router-dom';
import { Box, styled, Typography } from '@mui/material';
import { navData } from '../../constants/data';
/* import DropDownMenu from './DropDownMenu'; */

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
    position: relative;
`;
const Text = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
`;

// function starts
const NavBar = (event) => {

    const handleItemClick = (category) => {
        console.log('Clicked Text:', category);
        /* callApi(category); */
      }; 
    
    return (
      <Component>
        {navData.map((data, index) => (
          <Container key={data.text} 
            onClick={() => handleItemClick(data.text)}
            > 
            <Link 
              style={{textDecoration: 'none', color: 'inherit'}} 
              to={`/products/category/${encodeURIComponent(data.text)}`}>
            <img src={data.url} alt="nav" style={{ width: 64, height: 64 }} />
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '2px 0'/* , width:'40px' */}}>
              <Text key="{txt}" style={{paddingRight: '5px'}}>{data.text}</Text>
              {/* <DropDownMenu items={data.text} to={`/products/category/${encodeURIComponent(data.text)}`}  />*/}
              
            </div>
            {/* <DropDownMenu items={data.text} /> */}
            </Link>
          </Container>
        ))}
      </Component>
    );
}

export default NavBar