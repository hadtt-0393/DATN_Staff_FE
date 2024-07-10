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
import { convertPrice, convertDate, convertRoomToString, convertTime } from '../../utils';

export default function DetailForm({ isOpen, onClose, form }: any) {
    function stringToColor(string: string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
                mr: 1, width: "80px", height: "80px", fontSize: "40px"
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    function DetailUserCard({ name, phone, email, address, icon, color = 'primary', sx, ...other }: any) {
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
                <Typography fontSize="18px" fontWeight="600">Thông tin khách hàng</Typography>
                <Box display="flex" flexDirection="row" sx={{
                    gap: 5,
                }}>

                    <Avatar  {...stringAvatar(name)} />

                    <Stack spacing={1.5} flex={1}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }}>
                                Tên khách hàng:
                            </Typography>
                            <Typography >
                                {name}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }}>
                                Số điện thoại:
                            </Typography>
                            <Typography>{phone}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }}>
                                Email:
                            </Typography>
                            <Typography>{email}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }}>
                                Địa chỉ:
                            </Typography>
                            <Typography>{address}</Typography>
                        </Stack>
                    </Stack>
                </Box>

            </Card>
        );


    }

    function DetailBookingCard({ room, checkin, bookingdate, checkout, price, paymentStatus, status, color = 'primary', sx, ...other }: any) {
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
                <Typography fontSize="18px" fontWeight="600">Thông tin đặt phòng</Typography>
                <Box display="flex" flexDirection="row" sx={{
                    gap: 5,
                }}>
                    <Stack spacing={1.5} flex={1}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }}>
                                Tên phòng:
                            </Typography>
                            <Typography >
                                {room}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }}>
                                Ngày nhận phòng:
                            </Typography>
                            <Typography>{checkin}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }}>
                                Ngày trả phòng:
                            </Typography>
                            <Typography>{checkout}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }}>
                                Ngày đặt phòng:
                            </Typography>
                            <Typography>{bookingdate}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }}>
                                Giá:
                            </Typography>
                            <Typography>{price}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }}>
                                Phương thức thanh toán:
                            </Typography>
                            <Typography>{paymentStatus}</Typography>
                        </Stack>

                        {
                            status === false &&
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="subtitle2" sx={{ color: 'text.disabled', fontSize: "16px" }}>
                                    Trạng thái
                                </Typography>
                                <Button color="error" variant='contained'>Đã hủy</Button>
                            </Stack>
                        }

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
                            bookingdate={convertTime(form.createdAt)}
                            price={convertPrice(form.cost)}
                            paymentStatus={form.paymentStatus}
                            status={form.status}
                        />
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='outlined' sx={{ mx: 2, mb: 2 }}>Đóng</Button>
            </DialogActions>
        </Dialog>
    )
}