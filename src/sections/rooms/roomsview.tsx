import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RoomCard from './room-card';
import AddIcon from '@mui/icons-material/Add';
import NewRoom from './new-room';
import axiosInstance from '../../api/axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Room, ServiceRoom } from '../../models/room';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function ProductsView() {
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [serviceRooms, setServiceRooms] = useState<ServiceRoom[]>([]);

    useEffect(() => {
        setLoading(true);
        const getAllRooms = async () => {
            const Rooms = await axiosInstance.get('/room/getAllRoomByStaff');
            const ServiceRooms = await axiosInstance.get('/serviceRoom/getAllServiceRoomSystem');
            setRooms(Rooms.data);
            setServiceRooms(ServiceRooms.data);
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
                            <NewRoom isOpen={openModal} onClose={() => setOpenModal(false)} reFetch={reFetchRooms} serviceRoomSystem={serviceRooms}/>
                        </Stack>
                        {rooms.length === 0 && <Typography variant="h6" sx={{ mt: 5 }}>Không có phòng nào</Typography>}
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
                        {
                            rooms.length === 0 &&
                            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" bgcolor={"white"} boxShadow="1px 1px 2px 2px #CCC" borderRadius="10px">
                                <img src="https://cdn.icon-icons.com/icons2/3456/PNG/512/empty_folder_file_icon_219534.png" width="300px" alt="icon_rong" />
                                <Typography variant="h4" color="green" mb="50px" >
                                    Hiện bạn chưa có phòng nào, hãy tạo phòng mới đi nhé!!!
                                </Typography>
                            </Box>

                        }

                        <Grid container spacing={6}>
                            {rooms.length > 0 && rooms.map((room: Room) => (
                                <Grid key={room._id} xs={12} md={3}>
                                    <RoomCard room={room} reFetch={reFetchRooms} serviceRoomSystem={serviceRooms} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}

        </Container>
    );
}
