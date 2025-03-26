import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import { IconContext } from 'react-icons';
import { FiArrowUp } from 'react-icons/fi'; // Feather icons for scroll-to-top

export default function Layout({ children }) {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  // Handle scroll events to show/hide the scroll-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <IconContext.Provider value={{ size: '1.2em' }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: (theme) => theme.palette.mode === 'dark'
          ? theme.palette.background.default
          : '#f9fafb', // Light grey background for visual interest
        position: 'relative'
      }}>
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 8,
            pb: 6,
            px: { xs: 2, sm: 3, md: 4 }, // Responsive padding
            position: 'relative',
            zIndex: 1
          }}
        >
          {children}
        </Box>
        <Footer />

        {/* Scroll to top button */}
        {showScrollTop && (
          <Box
            onClick={scrollToTop}
            sx={{
              position: 'fixed',
              bottom: 20,
              right: 20,
              backgroundColor: 'primary.main',
              color: 'white',
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 3,
              zIndex: 1000,
              transition: 'transform 0.2s, opacity 0.3s',
              opacity: 0.7,
              '&:hover': {
                transform: 'translateY(-3px)',
                opacity: 1
              }
            }}
          >
            <FiArrowUp />
          </Box>
        )}
      </Box>
    </IconContext.Provider>
  );
}