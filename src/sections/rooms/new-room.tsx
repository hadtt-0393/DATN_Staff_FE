import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Theme, useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import axiosInstance from '../../api/axios';
import axios from 'axios';
import { REACT_APP_CLOUDINARY_ENDPOINT } from '../../constant';

export default function CreateRoom({ isOpen, onClose, reFetch }: any) {
    const [roomNumber, setRoomNumber] = useState<any>(null);
    const [type, setType] = useState<any>(null);
    const [file, setFile] = useState<any>(null);
    const [price, setPrice] = useState<any>(null);
    const [description, setDescription] = useState<any>(null);
    const [maxPerson, setMaxPerson] = useState<any>(null);
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const theme = useTheme();
    const [service, serService] = useState<string[]>([]);
    const services = [
        'Điều hòa',
        'Phòng tắm',
        'Wifi',
        'Tivi',
    ]

    function getStyles(name: string, personName: readonly string[], theme: Theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const handleChange = (event: SelectChangeEvent<typeof service>) => {
        const {
            target: { value },
        } = event;
        serService(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleClose = () => {
        onClose()
    }

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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

    const handleChangeFile = (e: any) => {
        setFile(e.target.files[0])
    }

    const uploadImg = async (file: any) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "stndhxae");

        const res = await axios.post(REACT_APP_CLOUDINARY_ENDPOINT, formData)
        return res.data.url
    };

    const save = () => {
        const saveRoom = async () => {
            const fileURL = await uploadImg(file);
            const res = await axiosInstance.post('/room/createRoom', {
                roomNumber: roomNumber,
                type: type,
                price: price,
                description: description,
                image: fileURL,
                max_person: maxPerson,
                service: service,
            });
            reFetch();
            handleClose();
        }
        saveRoom();
    }


    return (
        <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={isOpen}
        >
            <DialogTitle>Tạo phòng mới</DialogTitle>
            <Box sx={{ border: "1px solid #ccc", borderRadius: "10px", m: "10px 20px 10px 20px" }}>
                <Box display="flex" flexDirection="row" alignItems='center' marginLeft={2} >
                    <Box display='flex' flex={1} sx={{ mr: 2 }} flexDirection="column" justifyContent="flex-end" >
                        <img src={file ? URL.createObjectURL(file as any) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} style={{ borderRadius: "20px", marginTop: "20px" }} />
                        <Box sx={{ textAlign: "center" }}>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                sx={{ mt: 2, mb: 2, backgroundColor: "#333", "&:hover": { backgroundColor: "#000" } }}
                                size='large'
                            >
                                Chọn ảnh
                                <VisuallyHiddenInput type="file" onChange={handleChangeFile} />
                            </Button>
                        </Box>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={2} flex={1} sx={{ margin: 2 }}>
                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Tên phòng:
                            </Typography>
                            <TextField id="outlined-basic" label="Tên phòng" variant="outlined" sx={{ flex: 1 }} value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Loại phòng:
                            </Typography>
                            <TextField id="outlined-basic" label="Loại phòng" variant="outlined" sx={{ flex: 1 }} value={type} onChange={(e) => setType(e.target.value)} />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography
                                variant="subtitle1"
                                sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Giá:
                            </Typography>
                            <TextField
                                id="outlined-start-adornment"
                                label="Giá"
                                sx={{ flex: 1 }}
                                type='number'
                                inputProps={{ min: 0 }}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                }} />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography
                                variant="subtitle1"
                                sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Số lượng người tối đa:
                            </Typography>
                            <TextField
                                id="outlined-start-adornment"
                                label="Số lượng người tối đa"
                                sx={{ flex: 1 }}
                                type='number'
                                inputProps={{ min: 0 }}
                                value={maxPerson}
                                onChange={(e) => setMaxPerson(+e.target.value)}
                            />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Mô tả:
                            </Typography>
                            <TextField id="outlined-basic" label="Mô tả" variant="outlined" sx={{ flex: 1 }} value={description} onChange={(e) => setDescription(e.target.value)} multiline maxRows={4} />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Dịch vụ:
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
                    </Stack>
                </Box>
            </Box>
            <DialogActions>
                <Button variant='outlined' onClick={handleClose}>Hủy</Button>
                <Button variant='contained' onClick={save}>Lưu thay đổi</Button>
            </DialogActions>
        </Dialog>
    )
}