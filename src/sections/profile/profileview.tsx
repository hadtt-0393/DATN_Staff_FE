import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Theme, styled, useTheme } from '@mui/material/styles';
import axios from 'axios';
import { ComponentProps, useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import { REACT_APP_CLOUDINARY_ENDPOINT } from '../../constant';
import { Hotel, ServiceHotel } from '../../models/hotel';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';

export default function ProfileView() {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const [files, setFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const MenuProps = {
        disableScrollLock: true,
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

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

    function getStyles(name: string, personName: readonly string[], theme: Theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    function ImagesList({ images }: any) {
        return (
            <ImageList cols={2} gap={5} rowHeight={250} >
                {images && images.map((image: any, index: number) => (
                    <ImageListItem key={index}>
                        <img
                            src={image}
                            loading="lazy"
                            style={{ height: '250px', objectFit: "cover" }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        );
    }

    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [hotel, setHotel] = useState<Partial<Hotel>>({});
    const [serviceHotelSystem, setServiceHotelSystem] = useState<ServiceHotel[]>([]);

    useEffect(() => {
        setLoading(true);
        const getProfile = async () => {
            const res = await axiosInstance.get('/hotel/get-detail');
            const serviceHotel = await axiosInstance.get('/serviceHotel/getAllServiceHotelSystem');
            setHotel(res.data);
            setServiceHotelSystem(serviceHotel.data);
            setLoading(false);
        }
        const timer = setTimeout(getProfile, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (event: any) => {
        handleChangeHotel({ serviceIds: event.target.value });
    };

    const handleChangeHotel = (values: Partial<Hotel>) => {
        setHotel({
            ...hotel,
            ...values,
        });
    }

    const handleFileChange: ComponentProps<'input'>['onChange'] = (e) => {
        const files = e.target.files;
        if (!files?.length) {
            alert('Vui lòng chọn ít nhất một ảnh');
            return;
        }
        if (files.length > 6) {
            alert('Bạn chỉ cần đăng 6 ảnh');
            e.target.value = ''; // Clear the selected files
        } else {
            const fileArray = Array.from(files);
            setFiles(fileArray);

            const previewUrls = fileArray.map(file => URL.createObjectURL(file));
            setImagePreviews(previewUrls);
        }
    }

    const uploadImg = async (file: File) => {
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
            if (!files) return;
            const uploaders = files.map(uploadImg);
            const data = await Promise.all(uploaders);
            const hotelD = { ...hotel, images: data }
            const res = await axiosInstance.put('/hotel/update-detail-hotel', hotelD);
            setHotel(res.data);
            setLoading(false);
        }
        const timer = setTimeout(saveProfile, 1000);
        return () => clearTimeout(timer);
    }

    return (
        <Container maxWidth='xl'>
            {loading ? (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                <>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4">Thông tin khách sạn</Typography>
                    </Stack>
                    <Box sx={{ border: "1px solid #ccc", borderRadius: "10px" }}>
                        <Box display="flex" flexDirection="row" alignItems='center' marginLeft={2} >
                            <Box flex={1} sx={{ mr: 2 }} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                {imagePreviews.length ?
                                    <ImagesList images={imagePreviews} /> :
                                    hotel.images?.length ?
                                        <ImagesList images={hotel.images} /> :
                                        <PhotoSizeSelectActualOutlinedIcon sx={{ color: "#91CB63", fontSize: "500px" }} />
                                }
                                <Box sx={{ textAlign: "center" }}>
                                    <Button
                                        component="label"
                                        role={undefined}
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                        sx={{ mb: 2, mt: 2, backgroundColor: "#333", "&:hover": { backgroundColor: "#000" } }}
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
                                    <TextField id="outlined-basic" label="Tên khách sạn" variant="outlined" sx={{ flex: 1 }} value={hotel?.hotelName} onChange={(e) => handleChangeHotel({ hotelName: e.target.value })} />
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                                    <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                        Thành phố:
                                    </Typography>
                                    <TextField id="outlined-basic" label="Thành phố" variant="outlined" sx={{ flex: 1 }} value={hotel?.city} disabled>
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
                                            value={hotel.serviceIds}
                                            onChange={handleChange}
                                            input={<OutlinedInput id="select-multiple-chip" label="Dịch vụ" />}
                                            renderValue={(serviceIds) => {
                                                return (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {serviceIds.map((serviceId: any) => {
                                                            let service = serviceHotelSystem.find(service => serviceId === service._id) as any;
                                                            return (<Chip key={service._id} label={service.serviceName} />)
                                                        })}
                                                    </Box>
                                                )
                                            }}
                                            MenuProps={MenuProps}
                                        >
                                            {serviceHotelSystem.map((service) => (
                                                <MenuItem
                                                    key={service._id}
                                                    value={service._id}
                                                    style={getStyles(service._id, hotel.serviceIds || [], theme)}
                                                >
                                                    {service.serviceName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>
                                <Box sx={{ textAlign: "center" }}>
                                    <Button variant="contained" size="large" sx={{ padding: "0 80px", mt: 2 }} onClick={save}>
                                        Lưu thay đổi
                                    </Button>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                </>
            )}
        </Container>
    )
}
