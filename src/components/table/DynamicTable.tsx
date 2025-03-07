import { useState } from 'react';

import { Box, Card, Table, TableBody, TableContainer, TablePagination } from '@mui/material';

import { Scrollbar } from 'src/components/scrollbar';

import { useTable } from './useTable';
import { TableNoData } from './TableNoData';
import { TableToolbar } from './TableToolbar';
import DynamicTableHead from './DynamicTableHead';
import { TableEmptyRows } from './TableEmptyRows';
import { emptyRows, applyFilter, getComparator } from './utils';

export interface Column {
  id: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: number | string;
  minWidth?: number;
  renderCell?: (row: any) => React.ReactNode;
}

interface DynamicTableProps {
  data: any[];
  columns: Column[];
  rowComponent: React.ComponentType<any>;
  initialRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  searchQuery?: string;
}

export function DynamicTable({
  data,
  columns,
  rowComponent: RowComponent,
  initialRowsPerPage = 5,
  rowsPerPageOptions = [5, 10, 25],
  searchQuery = '',
}: DynamicTableProps) {
  const table = useTable({ initialRowsPerPage });
  const [filterName, setFilterName] = useState(searchQuery);

  // Apply filter and sort the data
  const dataFiltered: any[] = applyFilter({
    inputData: data,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Box>
      <Card>
        <TableToolbar
          numSelected={table.selected.length}
          filterName={filterName}
          onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <DynamicTableHead
                columns={columns}
                order={table.order}
                orderBy={table.orderBy}
                rowCount={dataFiltered.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    dataFiltered.map((item) => item.id)
                  )
                }
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <RowComponent
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={68}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={rowsPerPageOptions}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
}
