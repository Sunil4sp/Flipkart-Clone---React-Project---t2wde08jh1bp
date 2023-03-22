import React from 'react'
import { Box, Typography, Table, TableBody, TableRow, TableCell, styled } from '@mui/material';
import { LocalOffer as Badge } from '@mui/icons-material';

const SmallText = styled(Box)`
    font-size: 14px;
    vertical-align: baseline;
    & > p {
        font-size: 14px;
        margin-top: 10px;
    }
`

const ColumnText = styled(TableRow)`
    font-size: 14px;
    vertical-align: baseline;
    & > td {
        font-size: 14px;
        margin-top: 10px;
        border-bottom: 0;
    }
`

const StyledBadge = styled(Badge)`
    margin-right: 10px;
    color: #00CC00;
    font-size: 15px;
`;

const ProductDetail = (props) => {

  const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
  const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'
  const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));

  return (
    <>
      <Typography>{props.itemData.title}</Typography>
      <Typography style={{ marginTop: 5, color: '#878787', fontSize: 14 }}>
        28 Ratings & 1 Reviews
        <Box component="span"><img src={fassured} style={{ width: 77, marginLeft: 20 }} /></Box>
      </Typography>
      <Typography>
        <Box style={{ fontSize: 28 }}>${props.itemData.price}</Box>&nbsp;&nbsp;&nbsp;
        <Box style={{ color: '#878787' }}><strike>${props.itemData.price}</strike></Box>&nbsp;&nbsp;&nbsp;
        <Box style={{ color: '#388E3C' }}>{props.itemData.price} off</Box>
      </Typography>

      <Typography>Available offers</Typography>
      <SmallText>
        <Typography><StyledBadge />Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card</Typography>
        <Typography><StyledBadge />Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply</Typography>
        <Typography><StyledBadge />Purchase this Furniture or Appliance and Get Extra ₹500 Off on Select ACs</Typography>
        <Typography><StyledBadge />Partner OfferExtra 10% off upto ₹500 on next furniture purchase</Typography>
      </SmallText>

      <Table>
        <TableBody>
          <ColumnText>
            <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
            <TableCell style={{ fontWeight: 600 }}>Delivery by {date.toDateString()} | ₹40</TableCell>
          </ColumnText>
          <ColumnText>
            <TableCell style={{ color: '#878787' }}>Warranty</TableCell>
            <TableCell>No Warranty</TableCell>
          </ColumnText>
          <ColumnText>
            <TableCell style={{ color: '#878787' }}>Seller</TableCell>
            <TableCell>
              <span style={{ color: '#2874f0' }}>SuperComNet</span>
              <Typography>GST invoice available</Typography>
              <Typography>View more sellers starting from ₹329</Typography>
            </TableCell>
          </ColumnText>
          <ColumnText>
            <TableCell colSpan={2}>
              <img src={adURL} style={{ width: 390 }} />
            </TableCell>
          </ColumnText>
          <ColumnText>
            <TableCell style={{ color: '#878787' }}>Description</TableCell>
            <TableCell>{props.itemData.description}</TableCell>
          </ColumnText>
        </TableBody>
      </Table>

    </>
  )
}

export default ProductDetail;