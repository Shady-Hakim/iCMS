import type { Column } from 'src/components/table/DynamicTable';

import { useState } from 'react';

import { Box, Avatar, Button, Typography } from '@mui/material';

import { _languages } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { DynamicTable } from 'src/components/table/DynamicTable';

import { LocaleDialog } from '../LocaleDialog';
import { LanguageTableRow } from '../table-row';

import type { Language } from '../languages.type';

export function LanguagesView() {
  const [open, setOpen] = useState(false);
  const [locales, setLocales] = useState<Language[]>(_languages);

  const columns: Column[] = [
    {
      id: 'name',
      label: 'Locale name',
      renderCell: (row: Language) => (
        <Box gap={2} display="flex" alignItems="center">
          <Avatar alt={row.name} src={row.flag} />
          {row.name}
        </Box>
      ),
    },
    { id: 'code', label: 'Locale code' },
    {
      id: 'isActive',
      label: 'Status',
      renderCell: (row: Language) => (
        <Label color={(!row.isActive && 'error') || 'success'}>
          {row.isActive ? 'Active' : 'Inactive'}
        </Label>
      ),
    },
    {
      id: 'isDefault',
      label: 'Default',
      align: 'center',
      renderCell: (row: Language) =>
        row.isDefault ? <Iconify icon="eva:checkmark-circle-2-fill" color="green" /> : null,
    },
    {
      id: 'actions',
      label: 'Actions',
      align: 'center',
    },
  ];

  const handleAddLocale = (data: Language) => {
    const newLocale: Language = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };
    setLocales([...locales, newLocale]);
    setOpen(false);
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Languages
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

      <DynamicTable data={locales} columns={columns} rowComponent={LanguageTableRow} />
      <LocaleDialog open={open} onClose={() => setOpen(false)} onSubmit={handleAddLocale} />
    </DashboardContent>
  );
}
