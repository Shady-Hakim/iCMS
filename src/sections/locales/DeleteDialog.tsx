import React from 'react';

import { Box, Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import type { Language } from './languages.type';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  selectedLanguage: Language;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  onDelete,
  selectedLanguage,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Delete Language</DialogTitle>
    <DialogContent>
      <Box>
        This action cannot be undone. Are you sure you want to delete this {selectedLanguage.name}?
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Close
      </Button>
      <Button onClick={onDelete} variant="contained" color="error">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);
