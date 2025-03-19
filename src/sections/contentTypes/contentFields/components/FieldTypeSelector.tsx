import React from 'react';
import { Controller } from 'react-hook-form';

import {
  Box,
  Card,
  Radio,
  RadioGroup,
  Typography,
  CardContent,
  CardActionArea,
  FormControlLabel,
} from '@mui/material';

import type { ContentFieldFormProps } from '../contentFields.type';

const FIELD_TYPES = [
  {
    value: 'shortText',
    title: 'Short Text',
    description: 'Single line text input (max 255 characters)',
    icon: 'T',
  },
  { value: 'longText', title: 'Long Text', description: 'Multi-line text input', icon: 'T¶' },
  { value: 'boolean', title: 'Boolean', description: 'True/False value', icon: '✓' },
  { value: 'number', title: 'Number', description: 'Numeric value', icon: '123' },
  { value: 'email', title: 'Email', description: 'Email address with validation', icon: '@' },
  { value: 'date', title: 'Date', description: 'Date picker', icon: '📅' },
  { value: 'password', title: 'Password', description: 'Secure text input', icon: '🔒' },
  { value: 'json', title: 'JSON', description: 'Structured data format', icon: '{}' },
];

interface FieldTypeSelectorProps extends ContentFieldFormProps {
  onTypeSelect: (value: string) => void;
  selectedType: string;
  error?: string;
}

export const FieldTypeSelector: React.FC<FieldTypeSelectorProps> = ({
  control,
  onTypeSelect,
  selectedType,
  error,
}) => (
  <Box sx={{ position: 'relative' }}>
    <Controller
      name="type"
      control={control}
      rules={{ required: 'Field type is required' }}
      render={({ field }) => (
        <RadioGroup
          {...field}
          sx={{
            border: error ? '2px solid #d32f2f' : 'none',
            borderRadius: 1,
            p: error ? 1 : 0,
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
            }}
          >
            {FIELD_TYPES.map((item) => (
              <Card
                key={item.value}
                sx={{
                  minHeight: 90,
                  border: selectedType === item.value ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  bgcolor: selectedType === item.value ? 'grey.100' : 'white',
                  display: 'flex',
                }}
              >
                <CardActionArea
                  component="label"
                  onClick={() => {
                    field.onChange(item.value);
                    onTypeSelect(item.value);
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      height: '100%',
                      py: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2">{item.title}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                    <FormControlLabel
                      value={item.value}
                      control={<Radio sx={{ display: 'none' }} />}
                      label=""
                      sx={{ position: 'absolute', inset: 0, m: 0, opacity: 0 }}
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </RadioGroup>
      )}
    />
    {error && (
      <Typography variant="caption" color="error" sx={{ mt: 1, ml: 1 }}>
        {error}
      </Typography>
    )}
  </Box>
);
