import { useForm } from 'react-hook-form';
import React, { useMemo, useEffect } from 'react';

import { Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { AddTypeForm } from './addTypeForm';
import { contentTypes } from './contentTypes';

import type { ContentType, ContentTypeDialogProps } from './contentTypes.type';

interface ExtendedContentTypeDialogProps extends ContentTypeDialogProps {
  defaultValues?: ContentType;
}

export const ContentTypeDialog: React.FC<ExtendedContentTypeDialogProps> = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
}) => {
  const emptyValues = useMemo(
    () => ({
      name: '',
      displayName: '',
      plural: '',
      singular: '',
      numberOfUploadImages: 0,
      numberOfUploadFiles: 0,
      parentId: 0,
    }),
    []
  );

  const { control, handleSubmit, setValue, reset } = useForm<ContentType>({
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (open && defaultValues) {
      reset(defaultValues);
    } else if (open) {
      reset(emptyValues);
    }
  }, [open, defaultValues, emptyValues, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{defaultValues ? 'Edit Content Type' : 'Add New Content Type'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <AddTypeForm control={control} contentTypes={contentTypes} setValue={setValue} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {defaultValues ? 'Update Type' : 'Add Type'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
