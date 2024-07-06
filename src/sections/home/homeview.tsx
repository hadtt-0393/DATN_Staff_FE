import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import AppWidgetSummary from './app-widget-summary';
import AppRevenueMonth from './app-revenue-month';
import { Avatar, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Star } from '@mui/icons-material';
export default function HomeView() {
    const a = localStorage.getItem("accessToken")
    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Dashboard
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
                        total={17000}
                        icon={<img alt="icon" src="/assets/icons/total_revenue.png" />}
                    />
                </Grid>

                {/* <Grid xs={12} sm={6} md={3}>
                    <AppWidgetSummary
                        title="Bug Reports"
                        total={234}
                        color="error"
                        icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
                    />
                </Grid> */}

                <Grid xs={12} md={6} lg={6}>
                    <AppRevenueMonth
                        title="Website Visits"
                        subheader="(+43%) than last year"
                        chart={{
                            labels: [
                                '01/01/2003',
                                '02/01/2003',
                                '03/01/2003',
                                '04/01/2003',
                                '05/01/2003',
                                '06/01/2003',
                                '07/01/2003',
                                '08/01/2003',
                                '09/01/2003',
                                '10/01/2003',
                                '11/01/2003',
                            ],
                            series: [
                                {
                                    name: 'Team A',
                                    type: 'column',
                                    fill: 'solid',
                                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                                },
                                {
                                    name: 'Team B',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                                },
                                {
                                    name: 'Team C',
                                    type: 'line',
                                    fill: 'solid',
                                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                                },
                            ],
                        }}
                    />
                </Grid>
                <Grid xs={12} md={6} lg={6} bgcolor="#FFF">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ padding: "8px" }}>
                                    <Typography>Trung tâm thú y</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: "8px" }} align="center">
                                    <Typography>Hotline</Typography>
                                </TableCell>
                                <TableCell sx={{ padding: "8px" }} align="center">
                                    <Typography>Đánh giá</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {topShops.map((topShop, key) => ( */}
                            <TableRow >
                                <TableCell sx={{ display: "flex", gap: 2, p: "10px" }}>
                                    <Avatar src="https://cdn-icons-png.freepik.com/512/147/147142.png"></Avatar>
                                    <Box>
                                        <Typography fontWeight={550}>muong thanh</Typography>
                                        <Typography fontSize={14} color="#7E7988">
                                            {/* {topShop.address.detail}, {topShop.address.district} */}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ p: "10px" }} align="center">
                                    <Typography>024</Typography>
                                </TableCell>
                                <TableCell sx={{ p: "10px", width: "20%" }}>
                                    <Box
                                        display="flex"
                                        borderRadius={10}
                                        bgcolor="#E4F6D6"
                                        alignItems="center"
                                        justifyContent="end"
                                        p="4px"
                                        width="70%"
                                        gap={0.5}
                                        m="auto"
                                    >
                                        <Typography>
                                            {/* {Number(topShop.rating?.toFixed(2) || 0)} */}
                                        </Typography>
                                        <Star fontSize="small" sx={{ color: "#FFB400" }}></Star>
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