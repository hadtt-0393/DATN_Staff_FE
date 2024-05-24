import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { rooms } from '../../mock/room';
import RoomCard from './room-card';
import AddIcon from '@mui/icons-material/Add';
import CreateRoom from './new-room';
import axiosInstance from '../../api/axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Room } from '../../models/room';

// ----------------------------------------------------------------------

export default function ProductsView() {
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        setLoading(true);
        const getAllRooms = async () => {
            const res = await axiosInstance.get('/room/getAllRoomByStaff');
            setRooms(res.data);
            setLoading(false);
        }
        const timer = setTimeout(getAllRooms, 1000);
        return () => clearTimeout(timer);
    }, []);

    const reFetchRooms = () => {
        setLoading(true);
        const getAllRooms = async () => {
            const res = await axiosInstance.get('/room/getAllRoomByStaff');
            setRooms(res.data);
            setLoading(false);
        }
        const timer = setTimeout(getAllRooms, 1000);
        return () => clearTimeout(timer);
    }

    return (
        <Container maxWidth="xl">
            {loading ? (<Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>)
                : (
                    <>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h4" >
                                Danh sách phòng
                            </Typography>
                            <Button variant="contained" color="inherit" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
                                Tạo phòng
                            </Button>
                            <CreateRoom isOpen={openModal} onClose={() => setOpenModal(false)} reFetch={reFetchRooms}/>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems="center"
                            flexWrap="wrap-reverse"
                            justifyContent="flex-end"
                            sx={{ mb: 5 }}
                        >
                            <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                            </Stack>
                        </Stack>
                        <Grid container spacing={6}>
                            {rooms.map((room: Room) => (
                                <Grid key={room._id} xs={12} md={3}>
                                    <RoomCard room={room} reFetch={reFetchRooms}/>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}

        </Container>
    );
}
