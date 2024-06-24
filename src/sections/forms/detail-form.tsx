import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { convertPrice, convertDate, convertRoomToString } from '../../utils';

export default function DetailForm({ isOpen, onClose, form }: any) {

    function DetailUserCard({ name, phone, email, address, icon, color = 'primary', sx, ...other }: any) {
        return (
            <Card
                component={Stack}
                spacing={3}
                sx={{
                    // boxShadow: "#ccc 1px 1px 1px 1px",
                    border: "1px #ccc solid",
                    // alignItems: 'center',
                    px: 3,
                    py: 3,
                    borderRadius: 2,
                    ...sx,
                }}
                {...other}
            >
                <Typography>Thông tin khách hàng</Typography>
                <Box display="flex" flexDirection="row" sx={{
                    gap: 5,
                }}>
                    {icon &&
                        <Avatar
                            alt="Remy Sharp"
                            src={icon}
                            sx={{ width: 100, height: 100 }}
                        />
                    }
                    <Stack spacing={0.5} flex={1}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Tên khách hàng:
                            </Typography>
                            <Typography >
                                {name}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Số điện thoại:
                            </Typography>
                            <Typography>{phone}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Email:
                            </Typography>
                            <Typography>{email}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Địa chỉ:
                            </Typography>
                            <Typography>{address}</Typography>
                        </Stack>
                    </Stack>
                </Box>

            </Card>
        );


    }

    function DetailBookingCard({ room, checkin, checkout, price, color = 'primary', sx, ...other }: any) {
        return (
            <Card
                component={Stack}
                spacing={3}
                sx={{
                    border: "1px #ccc solid",
                    px: 3,
                    py: 3,
                    borderRadius: 2,
                    ...sx,
                }}
                {...other}
            >
                <Typography>Thông tin đặt phòng</Typography>
                <Box display="flex" flexDirection="row" sx={{
                    gap: 5,
                }}>
                    <Stack spacing={0.5} flex={1}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Tên phòng:
                            </Typography>
                            <Typography >
                                {room}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Ngày nhận phòng:
                            </Typography>
                            <Typography>{checkin}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Ngày trả phòng:
                            </Typography>
                            <Typography>{checkout}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Giá:
                            </Typography>
                            <Typography>{price}</Typography>
                        </Stack>
                    </Stack>
                </Box>

            </Card>
        );
    }

    const handleClose = () => {
        onClose();
    };
    return (
        <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={isOpen}
        >
            <DialogTitle>Thông tin đặt phòng chi tiết</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid xs={12} sm={6} md={6}>
                        <DetailUserCard
                            name={form.name}
                            phone={form.phoneNumber}
                            email={form.email}
                            address={form.address}
                            icon="/assets/images/avatars/avatar_4.jpg"
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={6}>
                        <DetailBookingCard
                            room={convertRoomToString(form.Rooms)}
                            checkin={convertDate(form.startDate)}
                            checkout={convertDate(form.endDate)}
                            price={convertPrice(form.cost)}
                        />
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='outlined'>Đóng</Button>
            </DialogActions>
        </Dialog>
    )
}