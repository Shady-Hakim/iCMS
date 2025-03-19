import React from 'react';
import { useWatch, Controller, useFormState } from 'react-hook-form';

import {
  Box,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  Typography,
  FormControl,
} from '@mui/material';

import type { ContentTypeFormProps } from './contentTypes.type';

export const AddTypeForm: React.FC<ContentTypeFormProps> = ({
  control,
  contentTypes,
  setValue,
}) => {
  const { errors } = useFormState({ control });
  const formValues = useWatch({ control });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      {/* Name Field (always lowercase) */}
      <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              placeholder="Enter name (e.g., article)"
              value={formValues.name || ''}
              onChange={(e) => setValue('name', e.target.value.toLowerCase())}
              error={!!errors.name}
              helperText={errors.name?.message as string}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          )}
        />
      </Box>

      {/* Display Name Field */}
      <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
        <Controller
          name="displayName"
          control={control}
          rules={{ required: 'Display name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Display name"
              placeholder="Enter display name (e.g., Articles)"
              value={formValues.displayName || ''}
              onChange={(e) => setValue('displayName', e.target.value)}
              error={!!errors.displayName}
              helperText={errors.displayName?.message as string}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          )}
        />
      </Box>

      {/* Singular Name Field */}
      <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
        <Controller
          name="singular"
          control={control}
          rules={{
            required: 'Singular name is required',
            validate: (value) =>
              value !== formValues.plural || 'Singular and plural names must be different',
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Singular name"
              placeholder="Enter singular name (e.g., Article)"
              value={formValues.singular || ''}
              onChange={(e) => setValue('singular', e.target.value)}
              error={!!errors.singular}
              helperText={errors.singular?.message as string}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          )}
        />
      </Box>

      {/* Plural Name Field */}
      <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
        <Controller
          name="plural"
          control={control}
          rules={{
            required: 'Plural name is required',
            validate: (value) =>
              value !== formValues.singular || 'Plural and singular names must be different',
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Plural name"
              placeholder="Enter plural name (e.g., Articles)"
              value={formValues.plural || ''}
              onChange={(e) => setValue('plural', e.target.value)}
              error={!!errors.plural}
              helperText={errors.plural?.message as string}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          )}
        />
      </Box>

      {/* Number of Upload Images Field */}
      <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
        <Controller
          name="numberOfUploadImages"
          control={control}
          rules={{
            required: 'Number of upload images is required',
            min: { value: 0, message: 'Must be 0 or greater' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Number of Upload Images"
              placeholder="Enter number of images (e.g., 5)"
              value={formValues.numberOfUploadImages ?? 0}
              onChange={(e) => {
                setValue('numberOfUploadImages', +e.target.value || 0);
              }}
              error={!!errors.numberOfUploadImages}
              helperText={errors.numberOfUploadImages?.message as string}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: 0 }}
              fullWidth
            />
          )}
        />
      </Box>

      {/* Number of Upload Files Field */}
      <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
        <Controller
          name="numberOfUploadFiles"
          control={control}
          rules={{
            required: 'Number of upload files is required',
            min: { value: 0, message: 'Must be 0 or greater' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Number of Upload Files"
              placeholder="Enter number of files (e.g., 3)"
              value={formValues.numberOfUploadFiles || 0}
              onChange={(e) => setValue('numberOfUploadFiles', +e.target.value || 0)}
              error={!!errors.numberOfUploadFiles}
              helperText={errors.numberOfUploadFiles?.message as string}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: 0 }}
              fullWidth
            />
          )}
        />
      </Box>

      {/* Parent Type Field (Select) - Full width */}
      <Box sx={{ width: '100%' }}>
        <Controller
          name="parentId"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.parentId} fullWidth>
              <InputLabel id="parent-type-label">Parent Content Type</InputLabel>
              <Select
                {...field}
                labelId="parent-type-label"
                label="Parent Content Type"
                value={formValues.parentId || ''}
                onChange={(e) => setValue('parentId', e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {contentTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.displayName}
                  </MenuItem>
                ))}
              </Select>
              {errors.parentId && (
                <Typography variant="caption" color="error">
                  {errors.parentId.message as string}
                </Typography>
              )}
            </FormControl>
          )}
        />
      </Box>
    </Box>
  );
};
