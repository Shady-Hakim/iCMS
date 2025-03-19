import { useState, useCallback } from 'react';

import { Button, Tooltip, TableRow, Checkbox, TableCell } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { DeleteDialog } from 'src/components/table/DeleteDialog';

import { FieldDialog } from './fieldDialog';

import type { ContentField, ContentFieldTableRowProps } from './contentFields.type';

export function ContentTypeTableRow({ row, selected, onSelectRow }: ContentFieldTableRowProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleCloseEditDialog = useCallback(() => {
    setOpenEditDialog(false);
  }, []);

  const handleSubmitEditDialog = (data: ContentField) => {
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
          {row.name}
        </TableCell>
        <TableCell>{row.type}</TableCell>
        <TableCell align="center">
          <Tooltip title="Edit" arrow placement="top">
            <Button
              onClick={handleOpenEditDialog}
              variant="text"
              color="primary"
              sx={{
                minWidth: 0,
              }}
            >
              <Iconify icon="solar:pen-new-square-outline" />
            </Button>
          </Tooltip>
          <Tooltip title="Delete" arrow placement="top">
            <Button
              onClick={handleOpenDeleteDialog}
              variant="text"
              color="error"
              sx={{
                minWidth: 0,
              }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
            </Button>
          </Tooltip>
        </TableCell>
      </TableRow>

      {/* Edit Dialog */}
      <FieldDialog
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
