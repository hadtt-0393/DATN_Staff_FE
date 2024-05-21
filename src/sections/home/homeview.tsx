import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import AppWidgetSummary from './app-widget-summary';
import AppRevenueMonth from './app-revenue-month';
export default function HomeView() {
    return (
        <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
                Hi, Welcome Home
            </Typography>
            <Grid container spacing={8}>
                <Grid xs={12} sm={6} md={4}>
                    <AppWidgetSummary
                        title="Rooms"
                        total={7}
                        icon={<img alt="icon" src="/assets/icons/room.png" />}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <AppWidgetSummary
                        title="Users"
                        total={13}
                        icon={<img alt="icon" src="/assets/icons/user.png" />}
                    />
                </Grid>
                <Grid xs={12} sm={6} md={4}>
                    <AppWidgetSummary
                        title="Total revenue"
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

                <Grid xs={12} md={6} lg={8}>
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
            </Grid>
        </Container >
    )
}