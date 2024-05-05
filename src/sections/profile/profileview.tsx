import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem'
import { images } from '../../mock/image'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Theme, useTheme } from '@mui/material/styles';
import InputLabel  from '@mui/material/InputLabel';
// import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import FormControl from '@mui/material/FormControl';

export default function ProfileView() {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const propertyType = [
        {
            value: 'Hotel',
            label: 'Hotel'
        },
        {
            value: 'Apartment',
            label: 'Apartment'
        }, {
            value: 'Resort',
            label: 'Resort'
        }, {
            value: 'Villa',
            label: 'Villa'
        },
    ]

    const services = [
        'Airport shuttle',
        'Spa and wellness centre',
        'Fitness centre',
        'Room service',
        'Parking',
        'Free WiFi',
        'Beachfront',
        'Facilities for disabled guests',
        'Family rooms',
        'Good breakfast',
        'Restaurant',
        'Pets allowed',
        '24-hour front desk',
        'Non-smoking rooms',
        'Electric vehicle charging station',
        'Swimming Pool',
        'Air conditioning',
    ]


    function getStyles(name: string, personName: readonly string[], theme: Theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    function ImagesList() {
        return (
            <ImageList cols={2} gap={5} rowHeight='auto'>
                {images.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            srcSet={`${item.img}`}
                            src={`${item.img}`}
                            alt={item.title}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        );
    }

    return (
        <Container maxWidth='xl' >
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Profile</Typography>
            </Stack>
            <Box sx={{ border: "1px solid #ccc", borderRadius: "10px" }}>
                <Box display="flex" flexDirection="row" alignItems='center' marginLeft={2} >
                    <Box flex={1} sx={{ mr: 2 }}>
                        <ImagesList />
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={2} flex={1} sx={{ margin: 2 }}>
                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Name:
                            </Typography>
                            <TextField id="outlined-basic" label="Name" variant="outlined" sx={{ flex: 1 }} value='Thu Ha Hotel' />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Type:
                            </Typography>
                            <TextField id="outlined-basic" label="Type" variant="outlined" sx={{ flex: 1 }} select >
                                {propertyType.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                City:
                            </Typography>
                            <TextField id="outlined-basic" label="City" variant="outlined" sx={{ flex: 1 }} />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Address:
                            </Typography>
                            <TextField id="outlined-basic" label="Address" variant="outlined" sx={{ flex: 1 }} />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Distance from center:
                            </Typography>
                            <TextField id="outlined-basic" label="Distance from center" variant="outlined" sx={{ flex: 1 }} />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Slogan:
                            </Typography>
                            <TextField id="outlined-basic" label="Slogan" variant="outlined" sx={{ flex: 1 }} />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Descriptions:
                            </Typography>
                            <TextField id="outlined-basic" label="Descriptions" variant="outlined" sx={{ flex: 1 }} />
                            {/* <TextareaAutosize minRows={2} maxRows={5}/> */}
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Cheapest:
                            </Typography>
                            <TextField id="outlined-basic" label="Cheapest" variant="outlined" sx={{ flex: 1 }} />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Featured:
                            </Typography>
                            <TextField id="outlined-basic" label="Featured" variant="outlined" sx={{ flex: 1 }} />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Services:
                            </Typography>
                            <FormControl sx={{ flex: 1 }}>
                                <InputLabel id="demo-multiple-chip-label">Services</InputLabel>
                                <Select
                                    label="Service"
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                    
                                >
                                    {services.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, personName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                        </Stack>

                    </Stack>
                </Box>
            </Box>

        </Container>
    )

}
