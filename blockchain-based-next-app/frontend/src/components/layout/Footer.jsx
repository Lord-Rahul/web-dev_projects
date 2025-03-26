// src/components/layout/Footer.jsx
import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider, Paper, Button } from '@mui/material';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaGithub, 
  FaVoteYea,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone
} from 'react-icons/fa';
import { IconContext } from 'react-icons';
import NextLink from 'next/link';
import { motion } from 'framer-motion';

// Motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Create a separate component for linked social icons
  const LinkableIcon = ({ href, children }) => (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.2)',
          transform: 'translateY(-3px)'
        },
        color: 'inherit',
        textDecoration: 'none'
      }}
    >
      {children}
    </Box>
  );
  
  // Regular social icon button without link
  const ContactItem = ({ icon, children }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)',
          mr: 2
        }}
      >
        {icon}
      </Box>
      <Typography variant="body2" sx={{ opacity: 0.9 }}>
        {children}
      </Typography>
    </Box>
  );
  
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Footer Top with Subscribe - Gradient Background */}
      <Box sx={{ 
        background: 'linear-gradient(to right, #9d4edd, #48cae4)',
        py: 6,
        position: 'relative'
      }}>
        {/* Decorative elements */}
        <Box sx={{ 
          position: 'absolute', 
          top: -30, 
          left: -30, 
          width: 120, 
          height: 120, 
          borderRadius: '50%', 
          background: 'rgba(255,255,255,0.05)',
          zIndex: 0 
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: -20, 
          right: '30%', 
          width: 80, 
          height: 80, 
          borderRadius: '50%', 
          background: 'rgba(255,255,255,0.05)',
          zIndex: 0 
        }} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <MotionTypography 
                variant="h4" 
                sx={{ fontWeight: 700, mb: 1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Ready to be a part of democratic change?
              </MotionTypography>
              <MotionTypography 
                variant="body1" 
                sx={{ opacity: 0.9, mb: 2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Join thousands of citizens who are participating in elections through our secure blockchain platform.
              </MotionTypography>
            </Grid>
            <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Button 
                  component={NextLink} 
                  href="/register" 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: '#ffeb3b', 
                    color: 'black', 
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: '#fdd835' },
                    px: 4,
                    py: 1.5,
                    borderRadius: '50px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                  }}
                >
                  Register Today
                </Button>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Main Footer Content - Dark Background */}
      <Box sx={{ 
        backgroundColor: '#1a1a2e', 
        py: 6
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.1)',
                  mr: 2
                }}>
                  <FaVoteYea style={{ fontSize: '1.5rem' }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Vote Himachal
                </Typography>
              </Box>
              <Typography variant="body2" paragraph sx={{ opacity: 0.8, mb: 3 }}>
                A secure blockchain-based voting solution that ensures transparency, 
                security, and convenience for all voters in Himachal Pradesh.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <IconContext.Provider value={{ color: "white", size: "18px" }}>
                  <LinkableIcon href="https://facebook.com/">
                    <FaFacebookF />
                  </LinkableIcon>
                  <LinkableIcon href="https://x.com/Rahul717321">
                    <FaTwitter />
                  </LinkableIcon>
                  <LinkableIcon href="https://www.linkedin.com/in/rahul-verma-532095280/">
                    <FaLinkedinIn />
                  </LinkableIcon>
                  <LinkableIcon href="https://github.com/Lord-Rahul">
                    <FaGithub />
                  </LinkableIcon>
                </IconContext.Provider>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Link 
                  component={NextLink} 
                  href="/" 
                  color="inherit" 
                  underline="none"
                  sx={{ 
                    opacity: 0.8, 
                    transition: 'all 0.3s',
                    '&:hover': { 
                      opacity: 1,
                      pl: 1,
                    } 
                  }}
                >
                  Home
                </Link>
                <Link 
                  component={NextLink} 
                  href="/register" 
                  color="inherit" 
                  underline="none"
                  sx={{ 
                    opacity: 0.8, 
                    transition: 'all 0.3s',
                    '&:hover': { 
                      opacity: 1,
                      pl: 1,
                    } 
                  }}
                >
                  Register to Vote
                </Link>
                <Link 
                  component={NextLink} 
                  href="/vote" 
                  color="inherit" 
                  underline="none"
                  sx={{ 
                    opacity: 0.8, 
                    transition: 'all 0.3s',
                    '&:hover': { 
                      opacity: 1,
                      pl: 1,
                    } 
                  }}
                >
                  Cast Your Vote
                </Link>
                <Link 
                  component={NextLink} 
                  href="/results" 
                  color="inherit" 
                  underline="none"
                  sx={{ 
                    opacity: 0.8, 
                    transition: 'all 0.3s',
                    '&:hover': { 
                      opacity: 1,
                      pl: 1,
                    } 
                  }}
                >
                  Election Results
                </Link>
                <Link 
                  component={NextLink} 
                  href="/privacy-policy" 
                  color="inherit" 
                  underline="none"
                  sx={{ 
                    opacity: 0.8, 
                    transition: 'all 0.3s',
                    '&:hover': { 
                      opacity: 1,
                      pl: 1,
                    } 
                  }}
                >
                  Privacy Policy
                </Link>
                <Link 
                  component={NextLink} 
                  href="/terms-of-service" 
                  color="inherit" 
                  underline="none"
                  sx={{ 
                    opacity: 0.8, 
                    transition: 'all 0.3s',
                    '&:hover': { 
                      opacity: 1,
                      pl: 1,
                    } 
                  }}
                >
                  Terms of Service
                </Link>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Contact Us
              </Typography>
              <Box sx={{ mb: 3 }}>
                <ContactItem icon={<FaEnvelope size={16} />}>
                  rahul.23ucs087.btcs@baddiuniv.ac.in
                </ContactItem>
                <ContactItem icon={<FaMapMarkerAlt size={16} />}>
                  Baddi University of Emerging Sciences and Technologies Baddi, Himachal Pradesh
                </ContactItem>
                <ContactItem icon={<FaPhone size={16} />}>
                  +91-6230525430
                </ContactItem>
              </Box>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap', 
            gap: 2
          }}>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              © {currentYear} Vote Himachal. All rights reserved.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              Made with ❤️ for the citizens of Himachal Pradesh
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}