import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useUtils from '../../Utils/useUtils';

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { PAGES } = useUtils();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Box
          className="text-orange-200"
          sx={{
            flexGrow: 1,
            display: { sm: 'flex', md: 'none' },
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: {
                xs: 'block',
                md: 'none',
                backdropFilter: 'blur(2px)',
              },
            }}
          >
            {PAGES.map((page) => (
              <Link to={page === 'home' ? '/' : `/category/${page}`} key={page}>
                <MenuItem
                  sx={{
                    width: '100vw',
                  }}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">
                    <span className="font-cairo text-black">{page}</span>
                  </Typography>
                </MenuItem>
              </Link>
            ))}
          </Menu>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {PAGES.map((page) => (
            <Link to={page === 'home' ? '/' : `/category/${page}`} key={page}>
              <Button onClick={handleCloseNavMenu} sx={{ display: 'block' }}>
                <span className="font-cairo text-orange-200">{page}</span>
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </Container>
  );
};

export default NavBar;
