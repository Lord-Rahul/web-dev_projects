import { useState } from 'react';
import {
  Box, TextField, Button, Grid, Typography, Paper, CircularProgress, Alert
} from '@mui/material';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addCandidate } from '../../services/candidateService';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const schema = z.object({
  name: z.string().min(1, 'Candidate name is required'),
  partyName: z.string().min(1, 'Party name is required'),
  blockchainId: z.string().min(1, 'Blockchain ID is required'),
  logo: z.any()
    .refine((file) => file?.length > 0, "Party logo is required")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
  photo: z.any()
    .refine((file) => file?.length > 0, "Candidate photo is required")
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    )
});

export default function AddCandidateForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('partyName', data.partyName);
      formData.append('blockchainId', data.blockchainId);
      formData.append('logo', data.logo[0]);
      formData.append('photo', data.photo[0]);

      await addCandidate(formData);
      setSuccess(true);
      toast.success('Candidate added successfully!');
      reset();
    } catch (error) {
      console.error('Error adding candidate:', error);
      const errorMsg = error.response?.data?.msg || 'Failed to add candidate. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Candidate added successfully!
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Candidate Name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Party Name"
              {...register('partyName')}
              error={!!errors.partyName}
              helperText={errors.partyName?.message}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              Party Logo
            </Typography>
            <input
              type="file"
              accept="image/*"
              {...register('logo')}
              disabled={loading}
            />
            {errors.logo && (
              <Typography color="error" variant="caption" display="block">
                {errors.logo?.message?.toString()}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" gutterBottom>
              Candidate Photo
            </Typography>
            <input
              type="file"
              accept="image/*"
              {...register('photo')}
              disabled={loading}
            />
            {errors.photo && (
              <Typography color="error" variant="caption" display="block">
                {errors.photo?.message?.toString()}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Blockchain ID"
              type="number"
              {...register('blockchainId')}
              error={!!errors.blockchainId}
              helperText={errors.blockchainId?.message || "Unique numeric ID for blockchain identification"}
              disabled={loading}
              margin="normal"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Add Candidate'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

