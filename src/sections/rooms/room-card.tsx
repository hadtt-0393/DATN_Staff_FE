import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Label from '../../components/label';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import BrushIcon from '@mui/icons-material/Brush';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DetailRoom from './detail-room';

// ----------------------------------------------------------------------

export default function RoomCard({ room, reFetch, serviceRoomSystem }: any) {
  const [open, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenMenu = (e: any) => {
    setOpen(e.currentTarget);
  };
  const renderImg = (
    <Box
      component="img"
      src={room.image}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    // <Box bgcolor="#F9B90F" p={1} borderRadius={1}>
    <Typography color="black">
      {(room.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VND/Đêm
    </Typography>
    /* </Box> */

  );

  const renderAvailableRoom = (
    <Box >
      <Typography color="black">
        {(room.quantityAvailable).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}/{(room.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
      </Typography>
    </Box>

  );

  const handleCloseMenu = () => {
    setOpen(null);
    setOpenDialog(true)
  };

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>

        <MoreVertIcon onClick={handleOpenMenu}
          sx={{
            zIndex: 9,
            top: 8,
            right: 8,
            position: 'absolute',
            color: "white"
          }}
        />
        {renderImg}
      </Box>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ width: 140 }}
      >
        <MenuItem onClick={handleCloseMenu} >
          <BrushIcon sx={{ fontSize: "20px", mr: 1.5 }} />
          Sửa
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <DeleteOutlineIcon sx={{ fontSize: "20px", mr: 1.5 }} />
          Xóa
        </MenuItem>
      </Popover>

      <DetailRoom isOpen={openDialog} onClose={() => setOpenDialog(false)} roomDetail={room} reFetch={reFetch} serviceRoomSystem={serviceRoomSystem} />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction='row' alignItems="center" justifyContent="space-between">
          <Typography variant="h6" noWrap overflow="hidden" textOverflow="ellipsis" >
            {room.roomType}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="start">
          <Box display="flex" gap={2}>
            <Typography> Giá phòng: </Typography>
            <Typography>  {renderPrice}</Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="start">
          <Box display="flex" gap={2}>
            <Typography> Số lượng phòng trống: </Typography>
            <Typography>  {renderAvailableRoom}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
