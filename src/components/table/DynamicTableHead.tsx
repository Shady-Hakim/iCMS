import { TableRow, Checkbox, TableHead, TableCell, TableSortLabel, Box } from '@mui/material';

import type { Column } from './DynamicTable';
import { visuallyHidden } from './utils';

interface DynamicTableHeadProps {
  columns: Column[];
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
  numSelected: number;
  onSort: (id: string) => void;
  onSelectAllRows: (checked: boolean) => void;
}

export default function DynamicTableHead({
  columns,
  order,
  orderBy,
  rowCount,
  numSelected,
  onSort,
  onSelectAllRows,
}: DynamicTableHeadProps) {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={(event) => onSelectAllRows(event.target.checked)}
          />
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align || 'left'}
            sortDirection={orderBy === column.id ? order : false}
            sx={{ width: column.width, minWidth: column.minWidth }}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={orderBy === column.id ? order : 'asc'}
              onClick={() => onSort(column.id)}
            >
              {column.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
