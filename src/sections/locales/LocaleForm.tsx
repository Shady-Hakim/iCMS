import React from 'react';
import { useWatch, Controller, useFormState } from 'react-hook-form';

import { Box, Switch, TextField, Autocomplete, FormControlLabel } from '@mui/material';

import type { LocaleFormProps } from './languages.type';

export const LocaleForm: React.FC<LocaleFormProps> = ({ control, languages, setValue }) => {
  const { errors } = useFormState({ control });
  const formValues = useWatch({ control });

  const selectedLanguage = languages.find((language) => language.name === formValues.name) || null;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Language is required' }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={languages}
            getOptionLabel={(option) => option.name}
            value={selectedLanguage}
            onChange={(_, newValue) => {
              if (newValue) {
                setValue('name', newValue.name);
                setValue('code', newValue.code);
              } else {
                setValue('name', '');
                setValue('code', '');
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Language"
                error={!!errors.name}
                helperText={errors.name?.message as string}
              />
            )}
          />
        )}
      />
      <Controller
        name="code"
        control={control}
        rules={{ required: 'Locale Code is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Locale Code"
            disabled
            value={formValues.code || ''}
            onChange={(e) => setValue('code', e.target.value)}
            error={!!errors.code}
            helperText={errors.code?.message as string}
          />
        )}
      />
      <FormControlLabel
        control={
          <Switch
            checked={formValues.isActive || false}
            onChange={(e) => setValue('isActive', e.target.checked)}
          />
        }
        label="Active"
      />
    </Box>
  );
};
