import { useState } from 'react';
import { Typography, Menu, MenuItem, Box, styled } from '@mui/material';
import { PowerSettingsNew } from '@mui/icons-material';

const Component = styled(Menu)`
    margin-top: 5px;
`;

const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 5px;
`;

const Profile = ({ localUserName, setAccountPresent }) => {
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const logout = () => {
        sessionStorage.removeItem('signup');
        setAccountPresent(false);
        alert("Logged Out ✈ Successfully!")
    }

    return (
        <>
            <Box onClick={handleClick}><Typography style={{ marginTop: 2 }}>{localUserName}</Typography></Box>
            <Component
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => { handleClose(); logout(); }}>
                    <PowerSettingsNew fontSize='small' color='primary' />
                    <Logout>Logout</Logout>
                </MenuItem>
            </Component>
        </>
    )
}

export default Profile;