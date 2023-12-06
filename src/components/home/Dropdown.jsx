import React from 'react';
import { Box, styled } from '@mui/material';

const Dropdown = styled(Box)`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 8px;
  cursor: pointer;
`;

const DropDownMenu = () => {
  return (
    <div>
        <span class="dropDown_div">
            <span>Fashion</span>
            <span class="dropDown_span"></span>
        </span>
    </div>
  )
}

export default DropDownMenu;