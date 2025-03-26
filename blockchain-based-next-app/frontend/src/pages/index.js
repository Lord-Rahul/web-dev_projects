import { useState, useEffect } from 'react';
import { Typography, Box, Button, Card, Avatar, Grid, Paper, Chip, Divider, useTheme, useMediaQuery } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';
import Link from 'next/link';
import Head from 'next/head';

// For animations
import { motion } from 'framer-motion';

// Animation wrapper - Material UI component wrapped with motion
const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionPaper = motion(Paper);
const MotionChip = motion(Chip);

// Hardcoded candidates as in the reference
const candidates = [
  {
    id: 1,
    name: "Jai Ram Thakur",
    party: "Bharatiya Janta Party",
    partyLogo: "/party-logos/bjp.png",
    photo: "/candidate-photos/jrt.avif",
    position: "Former Chief Minister"
  },
  {
    id: 2,
    name: "Sukhvinder Singh Sukhu",
    party: "Indian National Congress",
    partyLogo: "/party-logos/congress.png",
    photo: "/candidate-photos/sss.jpg",
    position: "Current Chief Minister"
  },
  {
    id: 3,
    name: "Anurag Thakur",
    party: "Bharatiya Janta Party",
    partyLogo: "/party-logos/bjp.png",
    photo: "/candidate-photos/at5.avif",
    position: "Union Minister"
  },
];

// Features of the voting system (using Unicode symbols instead of MUI icons)
const features = [
  {
    icon: "🔒",
    title: "Secure Blockchain Technology",
    description: "Your vote is encrypted and securely stored on an immutable blockchain ledger"
  },
  {
    icon: "✓",
    title: "Verified Identity",
    description: "Advanced biometric verification ensures only eligible voters can participate"
  },
  {
    icon: "🗳️",
    title: "Vote Anywhere",
    description: "Cast your vote remotely from any authorized device with internet connection"
  },
  {
    icon: "👥",
    title: "Transparent Results",
    description: "Real-time vote counting with public verification of election integrity"
  }
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [electionResults, setElectionResults] = useState([
    { year: 2022, winner: "Indian National Congress", votes: "40", color: "#0078d7" },
    { year: 2017, winner: "Bharatiya Janta Party", votes: "44", color: "#ff9f1c" },
  ]);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MainLayout>
      <Head>
        <title>Vote Himachal | Blockchain Based Voting System</title>
        <meta name="description" content="A secure, transparent, and decentralized voting system for Himachal Pradesh" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(to right, #9d4edd, #48cae4)',
        color: 'white',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        {/* Hero Section with Animated Background */}
        <Box sx={{
          position: 'relative',
          width: '100%',
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 8 },
          px: { xs: 2, sm: 4, md: 6 },
          textAlign: 'center',
          overflow: 'hidden',
        }}>
          {/* Animated circles in background */}
          <Box sx={{ position: 'absolute', top: -100, left: -100, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', zIndex: 0 }} />
          <Box sx={{ position: 'absolute', bottom: -50, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', zIndex: 0 }} />
          
          <MotionBox
            sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1200px', mx: 'auto', mb: 8 }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MotionBox
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Typography variant="h1" component="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  fontWeight: 800,
                  mb: 2,
                  textShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              >
                Welcome to <span style={{ color: '#ffeb3b', display: 'inline-block' }}>Vote Himachal</span>
              </Typography>
            </MotionBox>
            
            <Typography variant="h6" paragraph 
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto', 
                mb: 6,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                opacity: 0.9
              }}
            >
              A secure, transparent, and decentralized voting system designed to empower the citizens of Himachal Pradesh.
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, justifyContent: 'center' }}>
              <MotionBox 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/register" passHref>
                  <Button 
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
                      width: { xs: '100%', sm: 'auto' },
                      boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                    }}
                  >
                    Register to Vote
                  </Button>
                </Link>
              </MotionBox>
              <MotionBox 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/vote" passHref>
                  <Button 
                    variant="contained" 
                    size="large"
                    endIcon={<span>→</span>}
                    sx={{ 
                      bgcolor: '#4caf50', 
                      color: 'white',
                      fontWeight: 'bold',
                      '&:hover': { bgcolor: '#43a047' },
                      px: 4,
                      py: 1.5,
                      borderRadius: '50px',
                      width: { xs: '100%', sm: 'auto' },
                      boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                    }}
                  >
                    Vote Now
                  </Button>
                </Link>
              </MotionBox>
            </Box>
          </MotionBox>
        </Box>
        
        {/* Features Section */}
        <Box sx={{ width: '100%', background: 'rgba(255,255,255,0.05)', py: 6 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom align="center" sx={{ mb: 6 }}>
              Why Choose Our Voting Platform
            </Typography>
            
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <MotionCard
                    sx={{ 
                      height: '100%', 
                      p: 3, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      textAlign: 'center',
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      borderRadius: 3
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  >
                    <Box sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      p: 2,
                      borderRadius: '50%',
                      mb: 2,
                      color: 'white',
                      fontSize: '2rem',
                      width: 60,
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {feature.description}
                    </Typography>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        
        {/* Past Election Results */}
        <MotionPaper
          sx={{ 
            width: '100%', 
            maxWidth: '1200px', 
            mx: 'auto', 
            my: 8, 
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            bgcolor: 'white',
            color: 'text.primary',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Box sx={{ 
              fontSize: '1.8rem', 
              color: '#ffc107', 
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              🏆
            </Box>
            <Typography variant="h4" component="h2" fontWeight="bold">
              Past Election Results
            </Typography>
          </Box>
          <Divider sx={{ mb: 4 }} />
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {electionResults.map((result, index) => (
              <MotionPaper
                key={index}
                sx={{ 
                  p: 4, 
                  bgcolor: 'grey.50',
                  borderRadius: 3,
                  border: '1px solid rgba(0,0,0,0.05)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <MotionChip 
                  label={result.year} 
                  sx={{ 
                    position: 'absolute', 
                    top: 16, 
                    right: 16, 
                    fontWeight: 'bold',
                    bgcolor: result.color,
                    color: 'white'
                  }}
                />
                <Typography variant="h5" sx={{ mb: 1, pr: 12 }}>
                  <span style={{ color: result.color, fontWeight: 'bold' }}>{result.winner}</span> 
                </Typography>
                <Typography variant="body1">
                  Won with <span style={{ color: '#4caf50', fontWeight: 'bold' }}>{result.votes}</span> Seats
                  in the Himachal Pradesh Assembly Elections.
                </Typography>
              </MotionPaper>
            ))}
          </Box>
        </MotionPaper>
        
        {/* Candidate List */}
        <MotionBox
          sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', mb: 10 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 5 }}>
            <Box sx={{ 
              fontSize: '1.8rem', 
              color: 'white', 
              mr: 2, 
              opacity: 0.9,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              👥
            </Box>
            <Typography variant="h4" component="h2" fontWeight="bold" gutterBottom>
              Meet the Candidates
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {candidates.map((candidate, index) => (
              <Grid item xs={12} sm={6} md={4} key={candidate.id}>
                <MotionCard
                  raised
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    p: 4,
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    color: 'text.primary',
                    height: '100%',
                    borderRadius: 4,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      right: 0, 
                      height: 6, 
                      background: candidate.party.includes('Congress') ? '#0078d7' : '#ff9f1c'
                    }} 
                  />
                  
                  <Avatar
                    src={candidate.photo}
                    alt={candidate.name}
                    sx={{ 
                      width: 140, 
                      height: 140, 
                      mb: 3,
                      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                      border: '4px solid white'
                    }}
                  />
                  <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                    {candidate.name}
                  </Typography>
                  <Chip 
                    label={candidate.position}
                    size="small"
                    sx={{ mb: 2, bgcolor: 'rgba(0,0,0,0.05)' }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 1 }}>
                    <Box
                      component="img"
                      src={candidate.partyLogo}
                      alt={`${candidate.party} logo`}
                      sx={{ width: 24, height: 24 }}
                    />
                    <Typography variant="body1" color="text.secondary" fontWeight="medium">
                      {candidate.party}
                    </Typography>
                  </Box>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </MotionBox>
        
        {/* Call to Action */}
        <Box sx={{ 
          width: '100%', 
          background: 'rgba(0,0,0,0.2)',
          py: 8,
          textAlign: 'center'
        }}>
          <Container maxWidth="md">
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Ready to Make Your Voice Heard?
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4, opacity: 0.9, maxWidth: 700, mx: 'auto' }}>
              Join thousands of citizens who are already using our blockchain-based platform to securely cast their votes and shape the future of Himachal Pradesh.
            </Typography>
            <MotionBox 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/register" passHref>
                <Button 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: '#ffeb3b', 
                    color: 'black', 
                    fontWeight: 'bold',
                    '&:hover': { bgcolor: '#fdd835' },
                    px: 6,
                    py: 1.5,
                    borderRadius: '50px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                  }}
                >
                  Get Started Today
                </Button>
              </Link>
            </MotionBox>
          </Container>
        </Box>
        
        {/* Additional Floating Elements */}
        <Box sx={{ 
          position: 'absolute', 
          top: '20%', 
          left: '8%', 
          width: 40, 
          height: 40, 
          borderRadius: '50%', 
          background: 'rgba(255,255,255,0.1)',
          animation: 'float 8s ease-in-out infinite'
        }} />
        
        <Box sx={{ 
          position: 'absolute', 
          top: '60%', 
          right: '5%', 
          width: 60, 
          height: 60, 
          borderRadius: '50%', 
          background: 'rgba(255,255,255,0.1)',
          animation: 'float 12s ease-in-out infinite',
          animationDelay: '2s'
        }} />
        
        <style jsx global>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
        `}</style>
      </Box>
    </MainLayout>
  );
}

// Helper component for Container
const Container = ({ children, maxWidth = 'lg', sx = {} }) => (
  <Box sx={{ 
    width: '100%', 
    maxWidth: 
      maxWidth === 'xs' ? '600px' :
      maxWidth === 'sm' ? '768px' :
      maxWidth === 'md' ? '960px' :
      maxWidth === 'lg' ? '1200px' : 
      maxWidth === 'xl' ? '1536px' : 
      maxWidth,
    mx: 'auto', 
    px: { xs: 2, sm: 3, md: 4 },
    ...sx 
  }}>
    {children}
  </Box>
);