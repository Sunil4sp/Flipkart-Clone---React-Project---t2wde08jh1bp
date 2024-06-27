import React, { useState, useEffect } from 'react';
import { Box, Grid, styled } from '@mui/material';
import ActionItem from './ActionItem';
import ProductDetail from './ProductDetail';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Component = styled(Box)`
    margin-top: 55px;
    // background: #F2F2F2;
    
`;

const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const RightContainer = styled(Grid)`
    margin-top: 50px;
    padding-left: 40px;
    & > p {
        margin-top: 10px;
    }
`;

const DetailView = () => {
    
    const fetchId = useParams();
    
    const [itemData, setItemData] = useState([]);
    

    const items = useSelector((state) => state.allCart.item);
    useEffect(() => {
        setItemData(items[fetchId.id]);
    }, [fetchId.id]);

    return (
        <Component>
            <Grid container>

                <Container item lg={4} md={4} sm={8} xs={12}>
                    <ActionItem itemData={itemData} />
                </Container>

                <RightContainer item lg={8} md={8} sm={8} xs={12}>
                    <ProductDetail itemData={itemData} />
                </RightContainer>

            </Grid>
        </Component>
    )
}

export default DetailView;