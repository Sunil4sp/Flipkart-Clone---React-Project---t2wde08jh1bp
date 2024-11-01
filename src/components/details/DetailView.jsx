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
    
    const { id }= useParams();
    
    const [itemData, setItemData] = useState(null);
    
    const items = useSelector((state) => state.cart.item);

    useEffect(() => {
        if(items && items.length > 0){
            const item = items.find((item) => item.id === parseInt(id));
            console.log("Found Item.",item);
            setItemData(item);
        }
    }, [items, id]);

    useEffect(() => {
        console.log("itemData in DetailView:", itemData);
    }, [itemData]);
        /* setItemData(items[fetchId.id]);
    }, [items,fetchId]); */

    return (
        <Component>
            <Grid container>

                <Container item lg={4} md={4} sm={8} xs={12}>
                    {itemData ? <ActionItem itemData= {itemData} /> : <div>Loading...</div>}
                </Container>

                <RightContainer item lg={8} md={8} sm={8} xs={12}>
                    {/* {console.log(itemData.title)} */}
                    {itemData ? <ProductDetail itemData= {itemData} /> : <div>Loading...</div>}
                </RightContainer>

            </Grid>
        </Component>
    )
}

export default DetailView;