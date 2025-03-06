import React from 'react';
import { useForm } from 'react-hook-form';

import { Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { languages } from './languages';
import { LocaleForm } from './LocaleForm';

import type { Language, LocaleDialogProps } from './languages.type';

export const LocaleDialog: React.FC<LocaleDialogProps> = ({ open, onClose, onSubmit }) => {
  const { control, handleSubmit, setValue, reset } = useForm<Language>({
    defaultValues: {
      code: '',
      name: '',
      isActive: true,
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Locale</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <LocaleForm control={control} languages={languages} setValue={setValue} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Add Locale
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
