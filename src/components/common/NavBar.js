import brand from '../../assets/hackerlogo.png'
import React from 'react';
import { AppBar,Container,Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const NavBar = ({ onBrandClick }) => {
  const navigate = useNavigate()

  const handleBrandClick = () => {
    if (onBrandClick && typeof onBrandClick === 'function') {
      onBrandClick();
    }
    navigate('/');
  };

  return (
    <AppBar position="static" style={{ backgroundColor:'white', boxShadow:'none', borderBottom: '1px solid #ccc'}}>
      <Container maxWidth="xl" style={{ marginLeft: '1vw' }}>
        <Toolbar disableGutters>
          <img src={brand} onClick={handleBrandClick} alt="Brand Logo" style={{ width: '15vw', marginRight: '2px', marginTop:'5px',marginBottom:'2px', cursor: 'pointer' }} />
        </Toolbar>
        </Container>
    </AppBar>
  );
};

export default NavBar