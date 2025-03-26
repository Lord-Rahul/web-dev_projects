import { useState } from 'react';
import { 
  Typography, Box, Button, TextField, Paper, Grid, Alert 
} from '@mui/material';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import MainLayout from '../components/layout/MainLayout';
import { registerVoter } from '../services/voterService';
import Head from 'next/head';
import Web3 from 'web3';
// Import React Icons instead of Material UI icons
import { FaSpinner, FaCheckCircle, FaWallet, FaUserPlus } from 'react-icons/fa';

// Form validation schema
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  voterID: z.string().min(1, 'Voter ID is required'),
  walletAddress: z.string().optional()
});

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        
        if (accounts.length > 0) {
          setValue('walletAddress', accounts[0]);
          setWalletConnected(true);
          toast.success('Wallet connected successfully');
        }
      } catch (error) {
        console.error('Error connecting wallet:', error);
        toast.error('Failed to connect wallet');
      }
    } else {
      toast.error('Ethereum wallet not detected. Please install MetaMask.');
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Ensure voterID is trimmed and not empty
      if (!data.voterID || !data.voterID.trim()) {
        toast.error('Voter ID is required');
        setLoading(false);
        return;
      }
      
      // Log the data being sent (for debugging)
      console.log('Submitting registration data:', data);
      
      await registerVoter({
        name: data.name,
        email: data.email,
        address: data.address,
        voterID: data.voterID,
        walletAddress: data.walletAddress || ''
      });
      
      setSuccess(true);
      toast.success('Registration request submitted successfully!');
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.msg || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Head>
        <title>Register to Vote | Blockchain Voting System</title>
      </Head>
      
      <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Register to Vote
        </Typography>
        
        {success ? (
          <Alert severity="success" sx={{ mt: 3 }}>
            <FaCheckCircle style={{ marginRight: '8px' }} />
            Your registration request has been submitted successfully. The admin will review your application.
          </Alert>
        ) : (
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={loading}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    {...register('email')}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    disabled={loading}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Residential Address"
                    multiline
                    rows={2}
                    {...register('address')}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    disabled={loading}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Voter ID"
                    variant="outlined"
                    error={!!errors.voterID}
                    helperText={errors.voterID?.message}
                    {...register('voterID')}
                    disabled={loading}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ethereum Wallet Address"
                    {...register('walletAddress')}
                    error={!!errors.walletAddress}
                    helperText={errors.walletAddress?.message}
                    disabled={loading || walletConnected}
                  />
                  <Button 
                    variant="outlined" 
                    onClick={connectWallet} 
                    sx={{ mt: 1 }}
                    disabled={loading || walletConnected}
                    startIcon={<FaWallet />}
                  >
                    Connect Wallet
                  </Button>
                </Grid>
                
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    disabled={loading}
                    sx={{ mt: 2 }}
                    startIcon={loading ? null : <FaUserPlus />}
                  >
                    {loading ? <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> : 'Submit Registration'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        )}
      </Box>
      
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </MainLayout>
  );
}