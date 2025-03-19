import { useForm } from 'react-hook-form';
import React, { useMemo, useState, useEffect } from 'react';

import { Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { AddFieldForm } from './addFieldForm';
import { EditFieldForm } from './editFieldForm';

import type { ContentField, ContentFieldDialogProps } from './contentFields.type';

interface ExtendedContentFieldsDialogProps extends ContentFieldDialogProps {
  defaultValues?: ContentField;
}

export const FieldDialog: React.FC<ExtendedContentFieldsDialogProps> = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
}) => {
  const [isLastStep, setIsLastStep] = useState(false);

  const emptyValues = useMemo(
    () => ({
      name: '',
      displayName: '',
      plural: '',
      singular: '',
      numberOfUploadImages: 0,
      numberOfUploadFiles: 0,
      parentId: 0,
      type: '',
      defaultValue: '',
      minLength: 0,
      maxLength: 0,
      isRequired: false,
      isPrivate: false,
    }),
    []
  );

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContentField>({
    defaultValues: emptyValues,
    mode: 'onChange',
  });

  useEffect(() => {
    if (open && defaultValues) {
      reset(defaultValues);
    } else if (open) {
      reset(emptyValues);
    }
  }, [open, defaultValues, emptyValues, reset]);

  const handleClose = () => {
    reset(emptyValues);
    onClose();
  };

  const handleFormSubmit = (data: ContentField) => {
    if (!errors.type) {
      onSubmit(data);
      handleClose();
    }
  };
  const isSubmitDisabled = !defaultValues && !isLastStep;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="field-dialog-title"
    >
      <DialogTitle id="field-dialog-title">
        {defaultValues ? `Edit ${defaultValues.name} field` : 'Add new field'}
      </DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          {defaultValues ? (
            <EditFieldForm control={control} setValue={setValue} />
          ) : (
            <AddFieldForm control={control} setValue={setValue} setIsLastStep={setIsLastStep} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={isSubmitDisabled} type="submit" variant="contained" color="primary">
            {defaultValues ? 'Update Field' : 'Add Field'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
