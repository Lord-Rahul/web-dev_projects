import { useEffect, useState } from 'react';
import { 
  Typography, Box, Paper, Tabs, Tab, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Chip, CircularProgress
} from '@mui/material';
import { toast } from 'react-toastify';
import MainLayout from '../../components/layout/MainLayout';
import ProtectedRoute from '../../components/auth/ProtectedRoute';
import { getAllVoters } from '../../services/voterService';
import { approveVoter, rejectVoter } from '../../services/adminService';
import AddCandidateForm from '../../components/admin/AddCandidateForm';
import Head from 'next/head';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AdminDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    fetchVoters();
  }, []);

  const fetchVoters = async () => {
    try {
      const response = await getAllVoters();
      setVoters(response.data);
    } catch (error) {
      console.error('Error fetching voters:', error);
      toast.error('Failed to load voter data');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleApprove = async (id) => {
    setProcessingId(id);
    try {
      await approveVoter(id);
      toast.success('Voter approved successfully');
      fetchVoters(); // Refresh the list
    } catch (error) {
      console.error('Approval error:', error);
      toast.error('Failed to approve voter');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id) => {
    setProcessingId(id);
    try {
      await rejectVoter(id);
      toast.success('Voter rejected');
      fetchVoters(); // Refresh the list
    } catch (error) {
      console.error('Rejection error:', error);
      toast.error('Failed to reject voter');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <Head>
          <title>Admin Dashboard | Blockchain Voting System</title>
        </Head>
        
        <Box sx={{ width: '100%', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Dashboard
          </Typography>
          
          <Paper sx={{ width: '100%' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin tabs">
              <Tab label="Voter Requests" />
              <Tab label="Add Candidate" />
              <Tab label="Manage Candidates" />
            </Tabs>
            
            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" gutterBottom>
                Voter Registration Requests
              </Typography>
              
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Registered On</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {voters.length > 0 ? (
                        voters.map((voter) => (
                          <TableRow key={voter._id}>
                            <TableCell>{voter.name}</TableCell>
                            <TableCell>{voter.email}</TableCell>
                            <TableCell>{voter.address}</TableCell>
                            <TableCell>
                              <Chip
                                label={voter.status}
                                color={
                                  voter.status === 'approved' ? 'success' : 
                                  voter.status === 'rejected' ? 'error' : 'warning'
                                }
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              {new Date(voter.dateRegistered).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {voter.status === 'pending' && (
                                <>
                                  <Button
                                    size="small"
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleApprove(voter._id)}
                                    disabled={processingId === voter._id}
                                    sx={{ mr: 1 }}
                                  >
                                    {processingId === voter._id ? <CircularProgress size={20} /> : 'Approve'}
                                  </Button>
                                  <Button
                                    size="small"
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleReject(voter._id)}
                                    disabled={processingId === voter._id}
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            No voter registration requests found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Add New Candidate
              </Typography>
              <AddCandidateForm />
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>
                Manage Candidates
              </Typography>
              {/* Candidate management content will go here */}
              <Typography>Coming soon...</Typography>
            </TabPanel>
          </Paper>
        </Box>
      </MainLayout>
    </ProtectedRoute>
  );
}