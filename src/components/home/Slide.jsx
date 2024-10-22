import React from 'react';
import Carousel from 'react-multi-carousel';
import { Box, Button, Divider, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
//for react countdown
/* import Countdown from 'react-countdown'; */
import { useSelector } from 'react-redux';

// Carousel breakpoints
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 5
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const Component = styled(Box)`
    margin-top: 10px;
    background: #fff;
`;
const Deal = styled(Box)`
    padding: 15px 20px;
    display: flex;
`;
const Timer = styled(Box)`
    &:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
    }
`;
const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    margin-right: 25px;
`
const ViewAllButton = styled(Button)`
    margin-left: auto;                      //aligning the button to the left
    background-color: green /* #2874f0 */;
    border-radius: 2px;
    font-size: 13px;
    font-weight:600;
    color:#fff;
`;

const Image = styled('img')({
    width: '160px',
    height: '120px',
})

const Text = styled(Typography)`
    font-size: 13px;
    margin-top: 5px
`;

// //=============================================================== function starts===================================================

const Slide = (props) => {
    const { title } = props
    let items = useSelector((state) => state.allCart.item);
    
    if (props.filterText) {
        if (props.filterText === "smartphones"){
            let test = items.filter((item) => {
                return item.category.toLowerCase().includes(props.filterText.toLowerCase())
            })
            items = [...test]
        }
        if (props.filterText === "laptops"){
            let test = items.filter((item) => {
                return item.category.toLowerCase().includes(props.filterText.toLowerCase())
            })
            items = [...test]
        }
    }
    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                <ViewAllButton variant='container' color="primary">View All</ViewAllButton>
            </Deal>
            <Divider />
            <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                slidesToSlide={1}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {
                    items.map(item => (
                        <Link to={`/products/${item.id}`} style={{ textDecoration: 'none' }} key="{slide}" >
                            <Timer textAlign='center' style={{ padding: '25px 10px' }}>
                                <Image src=/* {item.images} */{item.thumbnail} alt="banner" />
                                <Text style={{ /* fontWeight: 600, */ color: '#212121' }}>{item.title}</Text>
                                <Text style={{ /* color: 'green' */ color: 'black', fontWeight: 600, }}>₹ {Math.round(50 * item.price)}</Text>
                                {/* <Text style={{}}>{item.category}</Text> */}
                            </Timer>
                        </Link>
                    ))
                }
            </Carousel>
        </Component>
    )
}

export default Slide;