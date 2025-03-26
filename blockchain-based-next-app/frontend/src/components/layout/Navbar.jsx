// src/components/layout/Navbar.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, Container,
  IconButton, Drawer, List, ListItem, ListItemText,
  useScrollTrigger, Slide, Avatar
} from '@mui/material';
import { FiMenu } from 'react-icons/fi'; // Feather icons
import { FaVoteYea } from 'react-icons/fa'; // Font Awesome icons
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';

// Motion components
const MotionBox = motion(Box);

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  
  // Initialize with default values
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [logout, setLogout] = useState(() => () => {});
  
  // Safely access AuthContext only on the client side
  useEffect(() => {
    try {
      const authContext = useContext(AuthContext);
      if (authContext) {
        setIsAuthenticated(authContext.isAuthenticated || false);
        setUser(authContext.user || null);
        setLogout(() => authContext.logout || (() => {}));
      }
    } catch (error) {
      console.warn("Error accessing AuthContext:", error);
    }
  }, []);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const isActive = (path) => router.pathname === path;

  // Create navigation items array - filter admin links based on user role
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Register", path: "/register" },
    { name: "Vote", path: "/vote" },
    { name: "Results", path: "/results" }
  ];
  
  // Add admin-specific links
  const allNavItems = isAuthenticated && user?.role === 'admin' 
    ? [...navItems, { name: "Admin", path: "/admin/dashboard" }]
    : navItems;

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        background: 'linear-gradient(to right, #9d4edd, #48cae4)',
        color: 'white'
      }}>
        <FaVoteYea style={{ marginRight: '12px', fontSize: '24px' }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Vote Himachal
        </Typography>
      </Box>
      
      <List sx={{ pt: 2 }}>
        {allNavItems.map((item) => (
          <ListItem 
            button 
            key={item.name}
            component={Link}
            href={item.path}
            selected={isActive(item.path)}
            sx={{
              my: 0.5,
              mx: 1,
              borderRadius: 1,
              backgroundColor: isActive(item.path) ? 'rgba(157, 78, 221, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(157, 78, 221, 0.05)'
              }
            }}
          >
            <ListItemText 
              primary={item.name} 
              primaryTypographyProps={{ 
                fontWeight: isActive(item.path) ? 600 : 400 
              }}
            />
          </ListItem>
        ))}
        
        {isAuthenticated ? (
          <ListItem button onClick={logout} sx={{ color: '#f44336', mt: 2 }}>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem 
            button 
            component={Link} 
            href="/admin/login" 
            sx={{ mt: 2 }}
          >
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="fixed" 
          sx={{ 
            backgroundColor: 'rgba(157, 78, 221, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ py: 0.5 }}>
              <MotionBox 
                sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  mr: 1,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                }}>
                  <FaVoteYea style={{ fontSize: '24px' }} />
                </Box>
                <Typography
                  variant="h6"
                  component={Link}
                  href="/"
                  sx={{
                    fontWeight: 700,
                    color: 'white',
                    textDecoration: 'none',
                    letterSpacing: '0.5px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  Vote Himachal
                </Typography>
              </MotionBox>

              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                {allNavItems.map((item, index) => (
                  <MotionBox
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Button
                      component={Link}
                      href={item.path}
                      color="inherit"
                      sx={{
                        fontWeight: isActive(item.path) ? 700 : 400,
                        position: 'relative',
                        px: 2,
                        py: 1,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: isActive(item.path) ? '100%' : '0',
                          height: '3px',
                          bottom: '6px',
                          left: '0',
                          background: 'linear-gradient(90deg, rgba(255,235,59,1) 0%, rgba(255,193,7,1) 100%)',
                          borderRadius: '3px',
                          transition: 'width 0.3s ease'
                        },
                        '&:hover::after': {
                          width: '100%'
                        }
                      }}
                    >
                      {item.name}
                    </Button>
                  </MotionBox>
                ))}

                <MotionBox
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {isAuthenticated ? (
                    <Button 
                      variant="contained"
                      onClick={logout}
                      sx={{ 
                        ml: 2, 
                        backgroundColor: '#fff',
                        color: '#9d4edd',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.9)'
                        },
                        borderRadius: '50px',
                        px: 2
                      }}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button 
                      variant="contained"
                      component={Link}
                      href="/admin/login"
                      sx={{ 
                        ml: 2, 
                        backgroundColor: '#fff',
                        color: '#9d4edd',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.9)'
                        },
                        borderRadius: '50px',
                        px: 2
                      }}
                    >
                      Login
                    </Button>
                  )}
                </MotionBox>
              </Box>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ 
                  display: { md: 'none' },
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  p: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <FiMenu />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      
      <Toolbar id="back-to-top-anchor" />

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}