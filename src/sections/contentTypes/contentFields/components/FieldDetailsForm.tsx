import React from 'react';
import { Controller, useFormState } from 'react-hook-form';

import { styled } from '@mui/material/styles';
import { Box, Checkbox, TextField, Typography, FormControlLabel } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import type { ContentFieldFormProps } from '../contentFields.type';

interface FieldDetailsFormProps extends ContentFieldFormProps {
  onBack: () => void;
}

const StyledIconButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  border: 'none',
  borderRadius: '50%',
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
    transform: 'scale(1.1)',
  },
  transition: 'all 0.2s ease-in-out',
}));

export const FieldDetailsForm: React.FC<FieldDetailsFormProps> = ({ control, onBack }) => {
  const { errors } = useFormState({ control });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <StyledIconButton onClick={onBack} aria-label="Go back">
          <Iconify icon="solar:multiple-forward-left-outline" width={24} />
        </StyledIconButton>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Field name is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Field Name"
              placeholder="Enter field name"
              error={!!errors.name}
              helperText={errors.name?.message as string}
              InputLabelProps={{ shrink: true }}
              sx={{ width: '50%' }}
            />
          )}
        />
        <Controller
          name="defaultValue"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Default Value"
              placeholder="Enter default value"
              error={!!errors.defaultValue}
              helperText={errors.defaultValue?.message as string}
              InputLabelProps={{ shrink: true }}
              sx={{ width: '50%' }}
            />
          )}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Controller
          name="minLength"
          control={control}
          rules={{ min: { value: 0, message: 'Must be 0 or greater' } }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Minimum Length"
              placeholder="Enter minimum length"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(+e.target.value || 0)}
              error={!!errors.minLength}
              helperText={errors.minLength?.message as string}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: 0 }}
              sx={{ width: '50%' }}
            />
          )}
        />
        <Controller
          name="maxLength"
          control={control}
          rules={{ min: { value: 0, message: 'Must be 0 or greater' } }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Maximum Length"
              placeholder="Enter maximum length"
              value={field.value ?? ''}
              onChange={(e) => field.onChange(+e.target.value || 0)}
              error={!!errors.maxLength}
              helperText={errors.maxLength?.message as string}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: 0 }}
              sx={{ width: '50%' }}
            />
          )}
        />
      </Box>

      {/* Is Required and Is Private in One Row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 50%' }}>
          <Controller
            name="isRequired"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox {...field} checked={field.value || false} onChange={field.onChange} />
                }
                label="Is required"
              />
            )}
          />
          <Typography variant="body2" sx={{ fontSize: 12, color: '#7a7a7a', ml: 4 }}>
            You will not be able to create an entry if this field is empty
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 50%' }}>
          <Controller
            name="isPrivate"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox {...field} checked={field.value || false} onChange={field.onChange} />
                }
                label="Is private"
              />
            )}
          />
          <Typography variant="body2" sx={{ fontSize: 12, color: '#7a7a7a', ml: 4 }}>
            This field will not show up in the API response
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
