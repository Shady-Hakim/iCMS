import { useState, useCallback } from 'react';

import { Button, TableRow, Checkbox, TableCell } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { DeleteDialog } from 'src/components/table/DeleteDialog';

import { ContentTypeDialog } from './addTypeDialog';

import type { ContentType, ContentTypeTableRowProps } from './contentTypes.type';

export function ContentTypeTableRow({ row, selected, onSelectRow }: ContentTypeTableRowProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleCloseEditDialog = useCallback(() => {
    setOpenEditDialog(false);
  }, []);

  const handleSubmitEditDialog = (data: ContentType) => {
    // Handle the form submission logic here (e.g., update the content type)
    console.log('Updated Data:', data);
    handleCloseEditDialog();
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = () => {
    // Handle deletion logic here
    console.log('Deleted:', row);
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          {row.displayName}
        </TableCell>
        <TableCell>{row.singular}</TableCell>
        <TableCell>{row.plural}</TableCell>
        <TableCell align="center">
          <Button onClick={handleOpenEditDialog} variant="text" color="primary">
            <Iconify icon="solar:pen-new-square-outline" />
          </Button>
          <Button onClick={handleOpenDeleteDialog} variant="text" color="error">
            <Iconify icon="solar:trash-bin-trash-bold" />
          </Button>
        </TableCell>
      </TableRow>

      {/* Edit Dialog */}
      <ContentTypeDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        onSubmit={handleSubmitEditDialog}
        defaultValues={row}
      />

      {/* Delete Dialog */}
      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onDelete={handleDelete}
        selectedItem={row}
      />
    </>
  );
}
