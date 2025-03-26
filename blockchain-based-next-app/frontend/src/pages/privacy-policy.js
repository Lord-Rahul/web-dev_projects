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

export default function PrivacyPolicy() {
    return (
        <MainLayout>
            <Head>
                <title>Privacy Policy | Vote Himachal</title>
                <meta name="description" content="Privacy Policy for the Vote Himachal blockchain-based voting system" />
            </Head>

            <Box sx={{
                background: 'linear-gradient(to right, #9d4edd, #48cae4)',
                pt: 6,
                pb: 1,
                color: 'white'
            }}>
                <Container maxWidth="lg">
                    <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                        Privacy Policy
                    </Typography>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        <Link href="/" passHref>
                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                                Home
                            </Typography>
                        </Link>
                        <Typography color="white">Privacy Policy</Typography>
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
                        1. Introduction
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Welcome to Vote Himachal, a blockchain-based voting system. We are committed to protecting your privacy
                        and handling your data with transparency and care. This Privacy Policy explains how we collect, use,
                        and safeguard your information when you use our platform.
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                        2. Information We Collect
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Personal Information:</strong> When you register as a voter, we collect necessary identification
                        information as required by electoral regulations, including your name, voter ID, residential address,
                        and contact information.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Biometric Data:</strong> To ensure the integrity of the voting process, we may collect biometric
                        data such as fingerprints or facial recognition data, which is encrypted and securely stored.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Blockchain Data:</strong> Your voting activity is recorded on the blockchain. This includes
                        timestamps and encrypted voting choices, but does not contain personally identifiable information.
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                        3. How We Use Your Information
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Voter Verification:</strong> To validate your identity and voting eligibility.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Election Process:</strong> To facilitate the secure casting and counting of votes.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Security Measures:</strong> To detect and prevent fraud, unauthorized access, and other security threats.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        <strong>Analytics:</strong> For statistical analysis and improvement of our voting system.
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                        4. Blockchain Data Security
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Our blockchain implementation ensures that:
                    </Typography>
                    <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
                        <li>Your vote is encrypted and cannot be traced back to your identity</li>
                        <li>The integrity of the voting data is maintained through decentralized verification</li>
                        <li>Once recorded, voting data cannot be altered or deleted</li>
                        <li>Your personal identification details are stored separately from your voting record</li>
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                        5. Data Retention
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Personal identification data is retained only for the duration necessary to complete the electoral process
                        and address any potential disputes. Anonymized voting data on the blockchain is maintained permanently as
                        part of the public record.
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                        6. Your Rights
                    </Typography>
                    <Typography variant="body1" paragraph>
                        You have the right to:
                    </Typography>
                    <Typography variant="body1" component="ul" sx={{ pl: 4 }}>
                        <li>Access the personal information we hold about you</li>
                        <li>Request correction of inaccurate information</li>
                        <li>Request deletion of your data (subject to legal requirements)</li>
                        <li>Object to processing of your data</li>
                        <li>Request restriction of processing</li>
                    </Typography>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                        7. Contact Us
                    </Typography>
                    <Typography variant="body1" paragraph>
                        If you have any questions about this Privacy Policy or our data practices, please contact us at:
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