import { useState, useCallback } from 'react';

import { Box, Button, Avatar, TableRow, Checkbox, TableCell } from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { DeleteDialog } from 'src/components/table/DeleteDialog';

import { LocaleDialog } from './LocaleDialog';

import type { Language, LanguageTableRowProps } from './languages.type';

export function LanguageTableRow({ row, selected, onSelectRow }: LanguageTableRowProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleSubmitDialog = (data: Language) => {
    // Handle the form submission logic here
    console.log('Updated Language Data:', data);
    handleCloseDialog();
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteLanguage = () => {
    // Handle language deletion logic here
    console.log('Language deleted:', row);
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name} src={row.flag} />
            {row.name}
          </Box>
        </TableCell>
        <TableCell>{row.code}</TableCell>
        <TableCell>
          <Label color={(!row.isActive && 'error') || 'success'}>
            {row.isActive ? 'Active' : 'Inactive'}
          </Label>
        </TableCell>
        <TableCell align="center">
          {row.isDefault ? (
            <Iconify icon="eva:checkmark-circle-2-fill" color="green" width={24} height={24} />
          ) : null}
        </TableCell>
        <TableCell align="center">
          <Button onClick={handleOpenDeleteDialog} variant="text" color="error">
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </Button>
        </TableCell>
      </TableRow>

      <LocaleDialog open={openDialog} onClose={handleCloseDialog} onSubmit={handleSubmitDialog} />

      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onDelete={handleDeleteLanguage}
        selectedItem={row}
      />
    </>
  );
}
