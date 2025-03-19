import type { Column } from 'src/components/table/DynamicTable';

import { useState } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { DynamicTable } from 'src/components/table/DynamicTable';

import { FieldDialog } from '../fieldDialog';
import { contentFields } from '../contentFields';
import { ContentTypeTableRow } from '../table-row';

import type { ContentField } from '../contentFields.type';
import type { ContentType } from '../../contentTypes.type';

export function ContentFieldsView({ contentType }: { contentType: ContentType }) {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<ContentField[]>(contentFields);

  const columns: Column[] = [
    {
      id: 'name',
      label: 'Name',
    },
    { id: 'type', label: 'Type' },

    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
    },
  ];

  const handleAddType = (data: ContentField) => {
    const newField: ContentField = {
      ...data,
      id: Math.random().toString(36).slice(2, 11),
    };
    setFields([...fields, newField]);
    setOpen(false);
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          {contentType?.displayName} fields
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

      <DynamicTable data={fields} columns={columns} rowComponent={ContentTypeTableRow} />
      <FieldDialog open={open} onClose={() => setOpen(false)} onSubmit={handleAddType} />
    </DashboardContent>
  );
}
