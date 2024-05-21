import * as React from 'react';
import { useEffect, useState } from 'react';
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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import axiosInstance from '../../api/axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Hotel } from '../../models/hotel';

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

    const provinces = [
        "Hà Nội",
        "Hồ Chí Minh",
        "Đà Nẵng",
        "Hải Phòng",
        "Cần Thơ",
        "Bà Rịa - Vũng Tàu",
        "Bắc Giang",
        "Bắc Kạn",
        "Bạc Liêu",
        "Bắc Ninh",
        "Bến Tre",
        "Bình Định",
        "Bình Dương",
        "Bình Phước",
        "Bình Thuận",
        "Cà Mau",
        "Cao Bằng",
        "Đắk Lắk",
        "Đắk Nông",
        "Điện Biên",
        "Đồng Nai",
        "Đồng Tháp",
        "Gia Lai",
        "Hà Giang",
        "Hà Nam",
        "Hà Tĩnh",
        "Hải Dương",
        "Hậu Giang",
        "Hòa Bình",
        "Hưng Yên",
        "Khánh Hòa",
        "Kiên Giang",
        "Kon Tum",
        "Lai Châu",
        "Lâm Đồng",
        "Lạng Sơn",
        "Lào Cai",
        "Long An",
        "Nam Định",
        "Nghệ An",
        "Ninh Bình",
        "Ninh Thuận",
        "Phú Thọ",
        "Quảng Bình",
        "Quảng Nam",
        "Quảng Ngãi",
        "Quảng Ninh",
        "Quảng Trị",
        "Sóc Trăng",
        "Sơn La",
        "Tây Ninh",
        "Thái Bình",
        "Thái Nguyên",
        "Thanh Hóa",
        "Thừa Thiên Huế",
        "Tiền Giang",
        "Trà Vinh",
        "Tuyên Quang",
        "Vĩnh Long",
        "Vĩnh Phúc",
        "Yên Bái"
    ];

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

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    // const [checked, setChecked] = React.useState(true);

    // const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setChecked(event.target.checked);
    // };

    const [loading, setLoading] = useState(false);
    const [hotel, setHotel] = useState<Partial<Hotel>>({});

    useEffect(() => {
        setLoading(true);
        const getProfile = async () => {
            const res = await axiosInstance.get('/hotel/get-detail');
            setHotel(res.data);
            setLoading(false);
        }
        const timer = setTimeout(getProfile, 1000);
        return () => clearTimeout(timer);
    }, []);

    const save = () => {
        setLoading(true);
        const saveProfile = async () => {
            const res = await axiosInstance.put('/hotel/get-detail', hotel);
            setHotel(res.data);
            setLoading(false);
        }
        const timer = setTimeout(saveProfile, 1000);
        return () => clearTimeout(timer);
    }

    const handleChangeHotel = (values: Partial<Hotel>) => {
        setHotel({
            ...hotel,
            ...values,
        });
    }

    return (
        <Container maxWidth='xl' >
            {loading ? (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (<>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">Profile</Typography>
                </Stack>
                <Box sx={{ border: "1px solid #ccc", borderRadius: "10px" }}>
                    <Box display="flex" flexDirection="row" alignItems='center' marginLeft={2} >
                        <Box flex={1} sx={{ mr: 2 }}>
                            <ImagesList />
                            <Box sx={{ textAlign: "center" }}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    sx={{ mb: 2, backgroundColor: "#333", "&:hover": { backgroundColor: "#000" } }}
                                    size='large'
                                >
                                    Choose images
                                    <VisuallyHiddenInput type="file" />
                                </Button>
                            </Box>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        <Stack spacing={2} flex={1} sx={{ margin: 2 }}>
                            <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                    Name:
                                </Typography>
                                <TextField id="outlined-basic" label="Name" variant="outlined" sx={{ flex: 1 }} value={hotel?.username} onChange={(e) => handleChangeHotel({ username: e.target.value })} />
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                    City:
                                </Typography>
                                <TextField id="outlined-basic" label="City" variant="outlined" sx={{ flex: 1 }} select value={hotel?.city} onChange={(e) => handleChangeHotel({ city: e.target.value })}>
                                    {provinces.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                    Address:
                                </Typography>
                                <TextField id="outlined-basic" label="Address" variant="outlined" sx={{ flex: 1 }} onChange={(e) => handleChangeHotel({ address: e.target.value })}/>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                    Distance from center:
                                </Typography>
                                <TextField
                                    label="Distance from center"
                                    id="outlined-start-adornment"
                                    sx={{ flex: 1 }}
                                    type='number'
                                    inputProps={{ min: 0 }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">km</InputAdornment>,
                                    }}
                                    onChange={(e) => handleChangeHotel({ distance: +e.target.value })}
                                    value={hotel.distance}
                                />
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                    Descriptions:
                                </Typography>
                                <TextField value={hotel.description} id="outlined-basic" label="Descriptions" variant="outlined" sx={{ flex: 1 }} multiline maxRows={4} onChange={(e) => handleChangeHotel({ description: e.target.value })}/>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: 'text.disabled', flex: 0.4 }}>
                                    Cheapest:
                                </Typography>
                                <TextField
                                    id="outlined-start-adornment"
                                    label="Cheapest"
                                    sx={{ flex: 1 }}
                                    type='number'
                                    onChange={(e) => handleChangeHotel({ cheapest: +e.target.value })}
                                    inputProps={{ min: 0 }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                    }} />
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
                                        input={<OutlinedInput id="select-multiple-chip" label="Services" />}
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
                            <Box sx={{ textAlign: "center", flex: 1 }}>
                                <Button variant="contained" size="large" sx={{ padding: "0 80px", mt: 2 }} onClick={save}>
                                    Save
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </>)}
        </Container>
    )

}
