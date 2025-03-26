import { useState, useEffect } from 'react';
import { 
  Typography, Box, Button, TextField, Paper, Grid, 
  Card, CardContent, CircularProgress, Radio, 
  RadioGroup, FormControlLabel, FormControl, FormLabel, Alert,
  Chip, Container
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import Head from 'next/head';
import MainLayout from '../components/layout/MainLayout';
import { getVoterById, submitVote } from '../services/voterService';
import { getAllCandidates } from '../services/candidateService';
import { FaCheckCircle, FaVoteYea, FaIdCard } from 'react-icons/fa';

// Form validation schema using Zod for strong type checking
const schema = z.object({
  voterID: z.string().min(1, 'Voter ID is required'),
  candidateId: z.string().min(1, 'Please select a candidate')
});

export default function Vote() {
  // State variables to control component behavior and store data
  const [loading, setLoading] = useState(false); // Tracks API request loading state
  const [success, setSuccess] = useState(false); // Indicates successful vote submission
  const [verifying, setVerifying] = useState(false); // Tracks voter verification state
  const [voterVerified, setVoterVerified] = useState(false); // Indicates if voter is verified
  const [voter, setVoter] = useState(null); // Stores verified voter data
  const [candidates, setCandidates] = useState([]); // Stores available candidates

  // Initialize form handling with React Hook Form and Zod validation
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: zodResolver(schema)
  });

  // Watch form fields for real-time access
  const voterID = watch('voterID');
  const selectedCandidateId = watch('candidateId');

  useEffect(() => {
    // Fetches candidates from the API when component mounts
    // This ensures the list is always up-to-date when the page loads
    const loadCandidates = async () => {
      try {
        const data = await getAllCandidates();
        // Process API response and handle different data structures
        if (Array.isArray(data)) {
          setCandidates(data);
        } else if (data && Array.isArray(data.data)) {
          setCandidates(data.data);
        } else {
          console.error('Unexpected data format from API:', data);
          setCandidates([]);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
        toast.error('Failed to load candidates');
        setCandidates([]);
      }
    };

    loadCandidates();
  }, []);

  /**
   * Verifies voter identity using their voter ID
   * Validates eligibility and checks if they've already voted
   * Sets the voter state if verification succeeds
   */
  const verifyVoter = async () => {
    if (!voterID) {
      toast.error('Please enter your Voter ID');
      return;
    }
    
    setVerifying(true);
    try {
      const response = await getVoterById(voterID);
      const voterData = response.data;
      
      // Check if voter exists in the system
      if (!voterData) {
        toast.error('Voter not found');
        return;
      }
      
      // Check if voter registration is approved
      if (voterData.status !== 'approved') {
        toast.error('Your registration has not been approved yet');
        return;
      }
      
      // Check if voter has already voted
      if (voterData.hasVoted) {
        toast.error('You have already voted');
        return;
      }
      
      setVoter(voterData);
      setValue('voterID', voterData.voterID); // Update form with validated voter ID
      setVoterVerified(true);
      toast.success('Voter verified successfully');
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Voter verification failed');
    } finally {
      setVerifying(false);
    }
  };

  /**
   * Handles vote submission after form validation
   * Sends vote data to the API and updates UI state
   * @param {object} data - Form data containing voterID and candidateId
   */
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log('Submitting vote with data:', data); // Debug logging
      
      const result = await submitVote({
        voterID: data.voterID,  // Send voterID, not _id
        candidateId: data.candidateId
      });
      
      setSuccess(true);
      toast.success('Your vote has been recorded successfully!');
    } catch (error) {
      console.error('Voting error:', error);
      const errorMessage = error.response?.data?.msg || 'Failed to submit vote';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Determines the color to use for party representation
   * Maps party names to consistent colors for visual identification
   * @param {string} partyName - Name of the political party
   * @returns {string} Hex color code for the party
   */
  const getPartyColor = (partyName) => {
    const partyColors = {
      'Bharatiya Janta Party': '#FF9F1C',
      'BJP': '#FF9F1C',
      'Indian National Congress': '#0078D7',
      'Congress': '#0078D7'
    };
    
    return partyColors[partyName] || '#757575'; // Return default gray if party not found
  };

  return (
    <MainLayout>
      <Head>
        <title>Cast Your Vote | Blockchain Voting System</title>
      </Head>
      
      <Box 
        sx={{ 
          py: 8, 
          background: 'linear-gradient(to right, #9d4edd, #48cae4)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Cast Your Vote
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', opacity: 0.9 }}>
            Your voice matters. Securely give your vote in the election.
          </Typography>
        </Container>
      </Box>
      
      {/* Added space between sections */}
      <Box sx={{ height: 40 }} />
      
      <Container maxWidth="md" sx={{ mb: 8 }}>
        {success ? (
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              borderRadius: 3, 
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
            }}
          >
            <Box sx={{ fontSize: '4rem', color: 'success.main', mb: 2 }}>
              <FaCheckCircle />
            </Box>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Vote Recorded Successfully!
            </Typography>
            <Typography variant="body1" paragraph>
              Thank you for participating in the democratic process. Your vote has been securely recorded on the blockchain.
            </Typography>
            <Button 
              variant="contained" 
              color="primary"
              href="/"
              sx={{ mt: 2, borderRadius: '50px', px: 4 }}
            >
              Return Home
            </Button>
          </Paper>
        ) : (
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 3, md: 4 }, 
              borderRadius: 3,
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
            }}
          >
            {!voterVerified ? (
              <Box>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Verify Your Identity
                </Typography>
                <Typography variant="body2" paragraph color="text.secondary">
                  Please enter your Voter ID to verify your eligibility to vote.
                </Typography>
                
                <TextField
                  fullWidth
                  label="Enter Voter ID"
                  {...register('voterID')}
                  error={!!errors.voterID}
                  helperText={errors.voterID?.message}
                  disabled={voterVerified || verifying}
                  margin="normal"
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
                
                <Button
                  variant="contained"
                  color="primary"
                  onClick={verifyVoter}
                  disabled={voterVerified || verifying || !voterID}
                  startIcon={verifying ? null : <FaIdCard />}
                  sx={{ 
                    px: 4, 
                    py: 1.5, 
                    borderRadius: '50px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                  }}
                >
                  {verifying ? <CircularProgress size={24} /> : 'Verify Voter ID'}
                </Button>
              </Box>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    fontWeight="bold"
                    sx={{ color: 'primary.main' }}
                  >
                    Hello, {voter?.name}
                  </Typography>
                  <Chip 
                    label="Verified" 
                    color="success" 
                    size="small" 
                    sx={{ ml: 2 }} 
                  />
                </Box>
                
                <Typography variant="body1" paragraph>
                  Please select a candidate to cast your vote. Your selection is confidential and secure.
                </Typography>
                
                <FormControl component="fieldset" sx={{ width: '100%', mb: 4 }}>
                  <FormLabel component="legend" sx={{ mb: 2, fontSize: '1.1rem', fontWeight: 500 }}>
                    Available Candidates
                  </FormLabel>
                  
                  <RadioGroup aria-label="candidates" name="candidates">
                    <Grid container spacing={2}>
                      {Array.isArray(candidates) && candidates.length > 0 ? (
                        candidates.map((candidate) => (
                          <Grid item xs={12} sm={6} key={candidate._id}>
                            <Card 
                              sx={{ 
                                display: 'flex',
                                height: '100%',
                                border: `2px solid ${selectedCandidateId === candidate._id ? 'primary.main' : 'transparent'}`,
                                borderRadius: 2,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: selectedCandidateId === candidate._id ? 3 : 1,
                                '&:hover': {
                                  transform: 'translateY(-4px)',
                                  boxShadow: 4
                                }
                              }}
                              onClick={() => setValue('candidateId', candidate._id)}
                            >
                              <Box 
                                sx={{ 
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  height: 6,
                                  background: getPartyColor(candidate.partyName)
                                }}
                              />
                              
                              <Box sx={{ display: 'flex', width: '100%', pt: 1 }}>
                                <Radio 
                                  {...register('candidateId')}
                                  value={candidate._id}
                                  checked={selectedCandidateId === candidate._id}
                                  disabled={loading}
                                  sx={{ mt: 1 }}
                                />
                                
                                <CardContent sx={{ flex: '1 0 auto', pb: '16px !important' }}>
                                  <Typography variant="h6" fontWeight="bold">
                                    {candidate.name}
                                  </Typography>
                                  
                                  <Chip 
                                    label={candidate.partyName}
                                    size="small"
                                    sx={{ 
                                      mt: 1, 
                                      bgcolor: `${getPartyColor(candidate.partyName)}20`, 
                                      color: getPartyColor(candidate.partyName),
                                      fontWeight: 500
                                    }}
                                  />
                                </CardContent>
                              </Box>
                            </Card>
                          </Grid>
                        ))
                      ) : (
                        <Grid item xs={12}>
                          <Typography align="center" sx={{ py: 4, color: 'text.secondary' }}>
                            No candidates available at this time
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  </RadioGroup>
                  
                  {errors.candidateId && (
                    <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                      {errors.candidateId.message}
                    </Typography>
                  )}
                </FormControl>
                
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={loading}
                  startIcon={loading ? null : <FaVoteYea />}
                  sx={{ 
                    py: 1.5, 
                    borderRadius: '50px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    fontSize: '1.1rem'
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Cast Your Vote'}
                </Button>
              </form>
            )}
          </Paper>
        )}
      </Container>
    </MainLayout>
  );
}