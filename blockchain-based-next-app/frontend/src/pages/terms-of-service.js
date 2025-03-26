import { useState, useEffect } from 'react';
import { Typography, Box, Container, Paper, Divider, Breadcrumbs } from '@mui/material';
import MainLayout from '../components/layout/MainLayout';
import Head from 'next/head';
import Link from 'next/link';

// For animations
import { motion } from 'framer-motion';

// Animation wrapper - Material UI component wrapped with motion
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

export default function TermsOfService() {
  return (
    <MainLayout>
      <Head>
        <title>Terms of Service | Vote Himachal</title>
        <meta name="description" content="Terms of Service for the Vote Himachal blockchain-based voting system" />
      </Head>
      
      <Box sx={{ 
        background: 'linear-gradient(to right, #9d4edd, #48cae4)',
        pt: 6, 
        pb: 1,
        color: 'white'
      }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Terms of Service
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            <Link href="/" passHref>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' }}}>
                Home
              </Typography>
            </Link>
            <Typography color="white">Terms of Service</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <MotionPaper
          elevation={3}
          sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Last Updated: March 24, 2025
          </Typography>
          
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            1. Agreement to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing or using the Vote Himachal platform ("Service"), you agree to be bound by these Terms of Service. 
            The Service is operated by the Himachal Pradesh Electoral Commission. If you disagree with any part of these terms, 
            you do not have permission to access the Service.
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            2. Voter Eligibility
          </Typography>
          <Typography variant="body1" paragraph>
            To use the Service for voting, you must:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>Be a citizen of India and a resident of Himachal Pradesh</li>
            <li>Be at least 18 years of age on the qualifying date</li>
            <li>Possess a valid Voter ID issued by the Election Commission of India</li>
            <li>Meet all other eligibility requirements under Indian electoral laws</li>
            <li>Not be disqualified from voting under any applicable laws</li>
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            3. User Registration and Verification
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Accurate Information:</strong> You must provide accurate, current, and complete information during 
            the registration process. Any misrepresentation may result in the cancellation of your registration.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Verification Process:</strong> Your registration will be subject to verification by electoral officials 
            to confirm your identity and eligibility to vote. This may include biometric verification and cross-reference 
            with the electoral roll.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your login 
            credentials and for all activities that occur under your account.
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            4. Voting Process
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>One Vote Per Person:</strong> Each eligible voter is entitled to cast only one vote in each election.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Vote Integrity:</strong> The blockchain-based system is designed to ensure the integrity of your vote. 
            Once cast, your vote cannot be altered, deleted, or modified.
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Voting Period:</strong> Votes can only be cast during the official voting period as announced by the 
            Electoral Commission.
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            5. Prohibited Activities
          </Typography>
          <Typography variant="body1" paragraph>
            You agree not to:
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
            <li>Attempt to vote multiple times or on behalf of another person</li>
            <li>Use any automated system to access the Service</li>
            <li>Attempt to bypass any security measures of the platform</li>
            <li>Transmit any malicious code or attempt to interfere with the proper functioning of the Service</li>
            <li>Engage in vote buying, coercion, or any form of electoral fraud</li>
            <li>Use the Service for any illegal purpose</li>
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            6. Intellectual Property
          </Typography>
          <Typography variant="body1" paragraph>
            The Service and its original content, features, and functionality are owned by the Himachal Pradesh Electoral 
            Commission and are protected by international copyright, trademark, and other intellectual property laws.
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            7. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            To the maximum extent permitted by law, the Himachal Pradesh Electoral Commission and its officials shall not 
            be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use 
            of or inability to use the Service.
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            8. Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to modify these Terms at any time. We will provide notice of significant changes by 
            posting the new Terms on the Service and updating the "Last Updated" date. Your continued use of the Service 
            after such changes constitutes your acceptance of the new Terms.
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
            9. Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about these Terms, please contact us at:
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Email:</strong> rahul.23ucs087.btcs@baddiuniv.ac.in<br />
            <strong>Address:</strong> Baddi University of Emerging Sciences and Technology, Solan, Himachal Pradesh, India<br />
            <strong>Phone:</strong> +91-6230525430
          </Typography>
        </MotionPaper>
      </Container>
    </MainLayout>
  );
}