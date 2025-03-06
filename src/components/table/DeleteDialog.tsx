import React from 'react';

import { Box, Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  selectedItem: any;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  onClose,
  onDelete,
  selectedItem,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Delete</DialogTitle>
    <DialogContent>
      <Box>
        This action cannot be undone. Are you sure you want to delete this {selectedItem.name}?
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
