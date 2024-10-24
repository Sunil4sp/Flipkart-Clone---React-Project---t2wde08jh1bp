import { Box, styled } from '@mui/material'
import React from 'react'
import Slide from './Slide'

const Component = styled(Box)`
    display: flex;
`;

const LeftComponent = styled(Box)(({ theme }) => ({
    width: '83%',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}))

const RightComponent = styled(Box)(({ theme }) => ({
    marginTop: 10,
    background: '#FFFFFF',
    width: '17%',
    marginLeft: 10,
    /* padding: 5, */
    textAlign: 'center',
    display: 'flex',
    justifyContent:'center',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    }
}));

const MidSlides = (props) => {
    const adURL = 'https://i.pinimg.com/originals/92/c6/0c/92c60c57459d56f10ac522bf38900ac1.jpg?q=70'/* 'https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70' */;
  return (
      <Component>
          <LeftComponent>
              <Slide
                  title={props.title}
                  timer={props.timer}
                  filterText = {"smartphones"}
              />
          </LeftComponent>
          <RightComponent>
              <img src={adURL} style={{ width: 175, height: 289 }} alt='' />
          </RightComponent>
      </Component>
  )
}

export default MidSlides;