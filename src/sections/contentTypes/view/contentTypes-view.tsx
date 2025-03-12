import type { Column } from 'src/components/table/DynamicTable';

import { useState } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { DynamicTable } from 'src/components/table/DynamicTable';

import { contentTypes } from '../contentTypes';
import { ContentTypeTableRow } from '../table-row';
import { ContentTypeDialog } from '../addTypeDialog';

import type { ContentType } from '../contentTypes.type';

export function ContentTypesView() {
  const [open, setOpen] = useState(false);
  const [types, setTypes] = useState<ContentType[]>(contentTypes);

  const columns: Column[] = [
    {
      id: 'name',
      label: 'Display name',
    },
    { id: 'singular', label: 'Singular name' },
    {
      id: 'plural',
      label: 'Plural name',
    },
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
    },
  ];

  const handleAddType = (data: ContentType) => {
    const newType: ContentType = {
      ...data,
      id: Math.random().toString(36).slice(2, 11),
    };
    setTypes([...types, newType]);
    setOpen(false);
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Content types
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpen(true)}
        >
          New
        </Button>
      </Box>

      <DynamicTable data={types} columns={columns} rowComponent={ContentTypeTableRow} />
      <ContentTypeDialog open={open} onClose={() => setOpen(false)} onSubmit={handleAddType} />
    </DashboardContent>
  );
}
