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

export default function RoomCard({room, reFetch, serviceRoomSystem}: any) {
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
    <Typography variant="subtitle1">
      {room.price} VND/Đêm
    </Typography>
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

      <DetailRoom isOpen={openDialog} onClose={() => setOpenDialog(false)} roomDetail={room} reFetch={reFetch} serviceRoomSystem={serviceRoomSystem}/>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction='row' alignItems="center" justifyContent="space-between">
          <Typography variant="h6" noWrap >
            {room.type}
          </Typography>
          {/* <Box sx={{ backgroundColor: "#ddd", padding: "5px 20px", borderRadius: "10px" }}>
            <Typography sx={{ fontWeight: "700", color: "#666" }}>{product.room}</Typography>
          </Box> */}
          <Box><Label>{room.roomType}</Label></Box>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography>{renderPrice}</Typography>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
