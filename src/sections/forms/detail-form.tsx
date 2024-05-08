import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';

export default function DetailForm({ isOpen, onClose }: any) {

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
                <Typography>Information User</Typography>
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
                                Name:
                            </Typography>
                            <Typography >
                                {name}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Phone:
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
                                Address:
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
                <Typography>Reservation</Typography>
                <Box display="flex" flexDirection="row" sx={{
                    gap: 5,
                }}>
                    <Stack spacing={0.5} flex={1}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Room:
                            </Typography>
                            <Typography >
                                {room}
                            </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Checkin Date:
                            </Typography>
                            <Typography>{checkin}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Checkout Date:
                            </Typography>
                            <Typography>{checkout}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                                Price:
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
            <DialogTitle>Detail Booking</DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid xs={12} sm={6} md={6}>
                        <DetailUserCard
                            name="Le Minh Duc"
                            phone="0962757401"
                            total="10"
                            email="Lmduc9a101@gmail.com"
                            address="Ha Noi"
                            icon="/assets/images/avatars/avatar_4.jpg"
                        />
                    </Grid>
                    <Grid xs={12} sm={6} md={6}>
                        <DetailBookingCard
                            room="P301"
                            checkin="19:00, 05/05/2024"
                            checkout="20:00, 06/05/2024"
                            price="100.000d"
                        />
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}