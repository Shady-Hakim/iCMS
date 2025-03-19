import React from 'react';
import { useWatch, Controller, useFormState } from 'react-hook-form';

import { Box, Checkbox, TextField, Typography, FormControlLabel } from '@mui/material';

import type { ContentFieldFormProps } from './contentFields.type';

export const EditFieldForm: React.FC<ContentFieldFormProps> = ({ control, setValue }) => {
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
      {/* Default Value Field */}
      <Box sx={{ width: { xs: '100%' } }}>
        <Controller
          name="defaultValue"
          control={control}
          rules={{ required: 'Default value is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Default value"
              placeholder="Enter default value"
              value={formValues.defaultValue || ''}
              onChange={(e) => setValue('defaultValue', e.target.value)}
              error={!!errors.defaultValue}
              helperText={errors.defaultValue?.message as string}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          )}
        />
      </Box>

      {/* Minimum Length Field */}
      <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
        <Controller
          name="minLength"
          control={control}
          rules={{
            min: { value: 0, message: 'Must be 0 or greater' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Minimum length"
              placeholder="For none, leave it zero"
              value={formValues.minLength ?? ''}
              onChange={(e) => {
                setValue('minLength', +e.target.value || 0);
              }}
              error={!!errors.minLength}
              helperText={errors.minLength?.message as string}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: 0 }}
              fullWidth
            />
          )}
        />
      </Box>

      {/* Maximum Length Field */}
      <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
        <Controller
          name="maxLength"
          control={control}
          rules={{
            min: { value: 0, message: 'Must be 0 or greater' },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="length"
              label="Maximum length"
              placeholder="Enter maximum length (e.g., 10)"
              value={formValues.maxLength ?? ''}
              onChange={(e) => setValue('maxLength', +e.target.value || 0)}
              error={!!errors.maxLength}
              helperText={errors.maxLength?.message as string}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: 0 }}
              fullWidth
            />
          )}
        />
      </Box>

      {/* Is Required Checkbox */}
      <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
        <Controller
          name="isRequired"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={formValues.isRequired || false}
                  onChange={(e) => setValue('isRequired', e.target.checked)}
                />
              }
              label="Is required"
            />
          )}
        />
        <Typography variant="body2" sx={{ fontSize: 12, color: '#7a7a7a' }}>
          You will not be able to create an entry if this field is empty
        </Typography>
      </Box>

      {/* Is Private Checkbox */}
      <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={formValues.isPrivate || false}
                  onChange={(e) => setValue('isPrivate', e.target.checked)}
                />
              }
              label="Is private"
            />
          )}
        />
        <Typography variant="body2" sx={{ fontSize: 12, color: '#7a7a7a' }}>
          This field will not show up in the API response
        </Typography>
      </Box>
    </Box>
  );
};
