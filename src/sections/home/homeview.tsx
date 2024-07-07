import { Avatar, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import AppWidgetSummary from './app-widget-summary';

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
            mr: 1, width: "40px", height: "40px", fontSize: "16px"
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}
export default function HomeView() {
    const a = localStorage.getItem("accessToken")
    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Xin chào, chúc khách sạn ngày càng nhiều khách🥰🥰🥰
            </Typography>
            <Grid container spacing={8}>
                <Grid xs={12} sm={6} md={4}>
                    <AppWidgetSummary
                        title="Phòng"
                        total={7}
                        icon={<img alt="icon" src="/assets/icons/room.png" />}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <AppWidgetSummary
                        title="Khách hàng"
                        total={13}
                        icon={<img alt="icon" src="/assets/icons/user.png" />}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <AppWidgetSummary
                        title="Tổng doanh thu"
                        total={"17000000".replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        icon={<img alt="icon" src="/assets/icons/total_revenue.png" />}
                    />
                </Grid>

                <Grid xs={12} md={6} lg={6} bgcolor="#FFF">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ padding: "10px", width: "250px" }} align="center">
                                    <Typography>Tên khách hàng</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: "10px" }} width="200px" align="center">
                                    <Typography>Địa chỉ</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: "10px" }} width="200px" align="center">
                                    <Typography>Số điện thoại</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: "10px" }} width="200px" align="center">
                                    <Typography>Lượt đặt phòng</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell sx={{ display: "flex", gap: 2, p: "10px", alignItems: "center", width: "250px" }}>
                                    <Avatar {...stringAvatar("Mai Duyen")}/>
                                    <Box>
                                        <Typography fontWeight={550}>Đinh Thị Mai Duyên</Typography>
                                    </Box>
                                </TableCell>

                                <TableCell sx={{ p: "10px" }} width="200px" align="center">
                                    <Typography>Hà Nội</Typography>
                                </TableCell>
                                <TableCell sx={{ p: "10px" }} width="200px" align="center">
                                    <Typography>0344924268</Typography>
                                </TableCell>
                                <TableCell sx={{ p: "10px", width: "200px" }}>
                                    <Box
                                        display="flex"
                                        borderRadius={10}
                                        alignItems="center"
                                        justifyContent="center"
                                        p="4px"
                                        width="70%"
                                        gap={0.5}
                                        m="auto"
                                    >
                                        <Typography>
                                            10
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>


            </Grid>


            {/* <Grid xs={12} md={6} lg={4}>
                    <AppCurrentVisits
                        title="Current Visits"
                        chart={{
                            series: [
                                { label: 'America', value: 4344 },
                                { label: 'Asia', value: 5435 },
                                { label: 'Europe', value: 1443 },
                                { label: 'Africa', value: 4443 },
                            ],
                        }}
                    />
                </Grid> */}
        </Container >
    )
}