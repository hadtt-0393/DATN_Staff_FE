import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { rooms } from '../../mock/room';
import RoomCard from './room-card';
import AddIcon from '@mui/icons-material/Add';

// ----------------------------------------------------------------------

export default function ProductsView() {
    const [openFilter, setOpenFilter] = useState(false);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    return (
        <Container maxWidth="xl">
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h4" >
                    Rooms
                </Typography>
                <Button variant="contained" color="inherit" startIcon={<AddIcon />}>
                    New Room
                </Button>
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                flexWrap="wrap-reverse"
                justifyContent="flex-end"
                sx={{ mb: 5 }}
            >
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                    {/* <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          /> */}

                </Stack>
            </Stack>

            <Grid container spacing={6}>
                {rooms.map((product: any) => (
                    <Grid key={product.id} xs={12} md={3}>
                        <RoomCard product={product} />
                    </Grid>
                ))}
            </Grid>

        </Container>
    );
}
