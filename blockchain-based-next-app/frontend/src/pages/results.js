import { useState, useEffect } from 'react';
import {
  Typography, Box, Paper, Grid, Card, CardContent,
  LinearProgress, CircularProgress, Alert, Chip, Divider
} from '@mui/material';
import MainLayout from '../components/layout/MainLayout';
import { getResults } from '../services/resultsService';
import Head from 'next/head';

export default function Results() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getResults();
        console.log('API Response:', response);
        setResults(response);
        setError(''); // Clear any previous errors
      } catch (error) {
        console.error('Error details:', error);
        // Show more specific error message
        setError(`Failed to load election results: ${error.response?.data?.message || error.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();

    // Refresh every 30 seconds
    const interval = setInterval(fetchResults, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Alert severity="error">{error}</Alert>
      </MainLayout>
    );
  }

  // Extract stats more carefully
  const data = results?.data || {};
  const stats = {
    totalVoters: data.stats?.totalVoters || 0,
    approvedVoters: data.stats?.approvedVoters || 0,
    totalVotes: data.stats?.votedVoters || data.stats?.totalVotes || 0, // Try both field names
    turnoutPercentage: calculateTurnout(data.stats)
  };

  // Function to calculate turnout in case API doesn't provide it
  function calculateTurnout(statsData) {
    if (statsData?.turnoutPercentage) return statsData.turnoutPercentage;

    const total = statsData?.approvedVoters || statsData?.totalVoters || 0;
    const voted = statsData?.votedVoters || statsData?.totalVotes || 0;

    return total > 0 ? (voted / total) * 100 : 0;
  }

  const candidates = Array.isArray(data.candidates) ? data.candidates : [];

  // Find the candidate with the most votes (if any)
  const leadingCandidate = candidates.length > 0
    ? candidates.reduce((prev, current) => (prev.voteCount > current.voteCount) ? prev : current)
    : null;

  return (
    <MainLayout>
      <Head>
        <title>Election Results | Blockchain Voting System</title>
      </Head>

      <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Election Results
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Election Statistics
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Voters
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalVoters || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Approved Voters
                  </Typography>
                  <Typography variant="h4">
                    {stats.approvedVoters || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Votes Cast
                  </Typography>
                  <Typography variant="h4">
                    {stats.totalVotes || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Turnout
                  </Typography>
                  <Typography variant="h4">
                    {stats.turnoutPercentage ? stats.turnoutPercentage.toFixed(2) : 0}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {leadingCandidate && stats.totalVotes > 0 && (
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Current Leader
            </Typography>
            <Typography variant="h4" color="primary">
              {leadingCandidate.name} ({leadingCandidate.partyName})
            </Typography>
            <Typography variant="h6">
              with {leadingCandidate.voteCount} votes
              ({((leadingCandidate.voteCount / stats.totalVotes) * 100).toFixed(2)}%)
            </Typography>
          </Box>
        )}

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Candidate Results
          </Typography>

          {candidates.length === 0 ? (
            <Typography align="center">No candidates available</Typography>
          ) : (
            <Grid container spacing={3}>
              {candidates.map((candidate) => {
                // Make sure we handle division by zero
                const votePercentage = stats.totalVotes > 0
                  ? (candidate.voteCount / stats.totalVotes) * 100
                  : 0;

                return (
                  <Grid item xs={12} key={candidate._id}>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle1">
                          {candidate.name} ({candidate.partyName})
                        </Typography>
                        <Typography variant="subtitle1">
                          {candidate.voteCount} votes ({votePercentage.toFixed(2)}%)
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={Math.min(votePercentage, 100)} // Ensure value doesn't exceed 100
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          )}

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Chip
              label="Results update automatically every 30 seconds"
              color="primary"
              variant="outlined"
            />
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}