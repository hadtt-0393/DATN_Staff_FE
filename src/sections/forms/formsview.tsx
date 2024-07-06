import { useEffect, useState } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import axiosInstance from '../../api/axios';
import Scrollbar from '../../components/scrollbar';
import { convertDate, convertPrice, convertRoomToString } from '../../utils';
import TableEmptyRows from './table-empty-rows';
import TableNoData from './table-no-data';
import UserTableHead from './user-table-head';
import UserTableRow from './user-table-row';
import UserTableToolbar from './user-table-toolbar';
import { applyFilter, emptyRows, getComparator } from './utils';
import { Box } from '@mui/material';



export default function UserPage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [forms, setForms] = useState([]);
  const handleSort = (event: any, id: any) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  useEffect(() => {
    const fetchForm = async () => {
      const res = await axiosInstance.get('/form/getAllFormByStaff');
      setForms(res.data);
    }
    fetchForm();
  }, [])


  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: forms,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container maxWidth='xl'>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Danh sách đặt phòng</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'name', label: 'Tên khách hàng' },
                  { id: 'phone', label: 'Số điện thoại' },
                  { id: 'checkin', label: 'Ngày nhận phòng' },
                  { id: 'checkout', label: 'Ngày trả phòng' },
                  { id: 'room', label: 'Loại phòng' },
                  { id: 'people', label: 'Số lượng người' },
                  { id: 'price', label: 'Tổng thanh toán', },
                  { id: 'action', label: 'Hành động' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      checkin={convertDate(row.startDate)}
                      room={convertRoomToString(row.Rooms)}
                      phone={row.phoneNumber}
                      avatarUrl={row.avatarUrl}
                      checkout={convertDate(row.endDate)}
                      people={`${row.adults} người lớn${row.children !== 0 ? `, ${row.children} trẻ em` : ''}`}
                      price={convertPrice(row.cost)}
                      form={row}
                    />
                  ))}


                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, forms.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        {dataFiltered.length !== 0 && <TablePagination
          page={page}
          component="div"
          count={forms.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Số hàng trên trang"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} trong ${count}`
          }
        />}
        {
          dataFiltered.length === 0 &&
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" bgcolor={"white"} boxShadow="1px 1px 2px 2px #CCC" borderRadius="10px">
            <Typography variant="h4" color="green" mt="50px" mb="50px" >
              Hiện bạn chưa có đơn đặt phòng nào!!!
            </Typography>
          </Box>
        }

      </Card>
    </Container>
  );
}
