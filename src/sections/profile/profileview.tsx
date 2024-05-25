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
import { REACT_APP_CLOUDINARY_ENDPOINT } from '../../constant'
import axios from 'axios';

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
    const [service, setService] = React.useState<string[]>([]);
    const [files, setFiles] = useState<any>(null);

    const handleChange = (event: SelectChangeEvent<typeof service>) => {
        const {
            target: { value },
        } = event;
        setService(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleclose = () => {
        handleChangeHotel({ services: service })
    }

    function ImagesList({ images }: any) {
        return (
            <ImageList cols={2} gap={5} rowHeight='auto'>
                {images && images.map((image: any) => (
                    <ImageListItem key={image.img}>
                        <img
                            src={image}
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

    const [loading, setLoading] = useState(false);
    const [hotel, setHotel] = useState<Partial<Hotel>>({});

    useEffect(() => {
        setLoading(true);
        const getProfile = async () => {
            const res = await axiosInstance.get('/hotel/get-detail');
            setHotel(res.data);
            setService(res.data.services)
            setLoading(false);
        }
        const timer = setTimeout(getProfile, 1000);
        return () => clearTimeout(timer);
    }, []);

    const uploadImg = async (file: any) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "stndhxae");

        return axios.post(REACT_APP_CLOUDINARY_ENDPOINT, formData).then((response) => {
            const data = response.data;
            const fileURL = data.url;
            return fileURL as string;
        });
    };


    const save = async () => {
        setLoading(true);
        const saveProfile = async () => {
            if (files) {
                const uploaders = Array.from(files).map(uploadImg);
                const data = await axios.all(uploaders);
                setHotel(prevHotel => ({
                    ...prevHotel,
                    images: data,
                }));

            }
            const res = await axiosInstance.put('/hotel/update-detail-hotel', hotel);
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


    const handleFileChange = (e: any) => {
        const files = e.target.files
        console.log(files)
        if (files.length > 6) {
            alert('You can only upload up to 6 images.');
            e.target.value = null; // Clear the selected files
        }
        else {
            setFiles(e.target.files)
        }
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
                    <Typography variant="h4">Thông tin khách sạn</Typography>
                </Stack>
                <Box sx={{ border: "1px solid #ccc", borderRadius: "10px" }}>
                    <Box display="flex" flexDirection="row" alignItems='center' marginLeft={2} >
                        <Box flex={1} sx={{ mr: 2 }}>
                            <ImagesList images={hotel.images} />
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
                                    Chọn ảnh
                                    <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
                                </Button>
                            </Box>
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        <Stack spacing={2} flex={1} sx={{ margin: 2 }}>
                            <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                    Tên khách sạn:
                                </Typography>
                                <TextField id="outlined-basic" label="Tên khách sạn" variant="outlined" sx={{ flex: 1 }} value={hotel?.username} onChange={(e) => handleChangeHotel({ username: e.target.value })} />
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                    Thành phố:
                                </Typography>
                                <TextField id="outlined-basic" label="Thành phố" variant="outlined" sx={{ flex: 1 }} select value={hotel?.city} onChange={(e) => handleChangeHotel({ city: e.target.value })}>
                                    {provinces.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                    Địa chỉ:
                                </Typography>
                                <TextField id="outlined-basic" label="Địa chỉ" variant="outlined" sx={{ flex: 1 }} onChange={(e) => handleChangeHotel({ address: e.target.value })} value={hotel.address} />
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                    Khoảng cách đến trung tâm thành phố:
                                </Typography>
                                <TextField
                                    label="Khoảng cách"
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
                                    Mô tả chung:
                                </Typography>
                                <TextField value={hotel.description} id="outlined-basic" label="Mô tả" variant="outlined" sx={{ flex: 1 }} multiline maxRows={4} onChange={(e) => handleChangeHotel({ description: e.target.value })} />
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: 'text.disabled', flex: 0.4 }}>
                                    Giá rẻ nhất:
                                </Typography>
                                <TextField
                                    id="outlined-start-adornment"
                                    label="Giá rẻ nhất"
                                    sx={{ flex: 1 }}
                                    type='number'
                                    onChange={(e) => handleChangeHotel({ cheapestPrice: +e.target.value })}
                                    inputProps={{ min: 0 }}
                                    value={hotel.cheapestPrice}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                    }} />
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                <Typography
                                    variant="subtitle1"
                                    sx={{ color: 'text.disabled', flex: 0.4 }}>
                                    Giá đắt nhất:
                                </Typography>
                                <TextField
                                    id="outlined-start-adornment"
                                    label="Giá đắt nhất"
                                    sx={{ flex: 1 }}
                                    type='number'
                                    onChange={(e) => handleChangeHotel({ highestPrice: +e.target.value })}
                                    inputProps={{ min: 0 }}
                                    value={hotel.highestPrice}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                    }} />
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                    Giảm giá:
                                </Typography>
                                <TextField
                                    label="Giảm giá"
                                    id="outlined-start-adornment"
                                    sx={{ flex: 1 }}
                                    type='number'
                                    inputProps={{ min: 0 }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                    }}
                                    onChange={(e) => handleChangeHotel({ discount: +e.target.value })}
                                    value={hotel.discount}
                                />
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                    Dịch vụ khách sạn:
                                </Typography>
                                <FormControl sx={{ flex: 1 }}>
                                    <InputLabel id="demo-multiple-chip-label">Dịch vụ</InputLabel>
                                    <Select
                                        label="Dịch vụ"
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={service}
                                        onChange={handleChange}
                                        input={<OutlinedInput id="select-multiple-chip" label="Dịch vụ" />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {selected.map((value) => (
                                                    <Chip key={value} label={value} />
                                                ))}
                                            </Box>
                                        )}
                                        onClose={handleclose}
                                        MenuProps={MenuProps}
                                    >
                                        {services.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                                style={getStyles(name, service, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Box sx={{ textAlign: "center", flex: 1 }}>
                                <Button variant="contained" size="large" sx={{ padding: "0 80px", mt: 2 }} onClick={save}>
                                    Lưu thay đổi
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </>)}
        </Container>
    )

}
