import { useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axios';



// ----------------------------------------------------------------------

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

export default function SigninView() {
    const theme = useTheme();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [errUsername, setErrUsername] = useState(false)
    const [errEmail, setErrEmail] = useState(false)
    const [errPassword, setErrPassword] = useState(false)
    const [errConfirmPassword, setErrConfirmPassword] = useState(false)
    const [errPhone, setErrPhone] = useState(false)
    const [errCity, setErrCity] = useState(false)
    const [helperText, setHelperText] = useState(false)
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()

    const handleChangeInputEmail = (e: any) => {
        setEmail(e.target.value)
        if (e.target.value) {
            setErrEmail(false)
        }
    }

    const handleChangeInputPassword = (e: any) => {
        setPassword(e.target.value)
        if (e.target.value) {
            setErrPassword(false)
        }
    }

    const handleChangeInputConfirmPassword = (e: any) => {
        setConfirmPassword(e.target.value)
        if (e.target.value) {
            setErrConfirmPassword(false)
            setHelperText(false)
        }
    }

    const handleChangeInputUsername = (e: any) => {
        setUsername(e.target.value)
        if (e.target.value) {
            setErrUsername(false)
        }
    }

    const handleChangeInputCity = (e: any) => {
        setCity(e.target.value)
        if (e.target.value) {
            setErrCity(false)
        }
    }

    const handleChangeInputPhoneNumber = (e: any) => {
        setPhoneNumber(e.target.value)
        if (e.target.value) {
            setErrPhone(false)
        }
    }


    const handleClick = () => {
        navigate('/');
    };

    const handleSignup = async (e: any) => {
        e.preventDefault()
        if (!username || !email || !password || !confirmPassword || !phoneNumber || !city) {
            !username ? setErrUsername(true) : setErrUsername(false)
            !email ? setErrEmail(true) : setErrEmail(false)
            !password ? setErrPassword(true) : setErrPassword(false)
            !confirmPassword ? setErrConfirmPassword(true) : setErrConfirmPassword(false)
            !phoneNumber ? setErrPhone(true) : setErrPhone(false)
            !city ? setErrCity(true) : setErrCity(false)
            return;
        }
        if (confirmPassword !== password) {
            setHelperText(true)
            setErrConfirmPassword(true)
            return;
        }
        setIsLoading(true)
        try {
            const res = await axiosInstance.post('/auth/staff/signup/',
                {
                    username,
                    email,
                    password,
                    phoneNumber,
                    city
                },
            );
            
            toast.success(`${res.data.message}`, { autoClose: 2000 })
            navigate('/signin');
        } catch (err: any) {
            toast.error(err.response.data.message, { autoClose: 2000});
            setIsLoading(false);
        }

    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {

        disableScrollLock: true,

        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const renderForm = (
        <>
            <Stack spacing={3}>
                <TextField name="Tên khách sạn" label="Tên khách sạn" required onChange={handleChangeInputUsername} error={errUsername} />
                <TextField name="email" label="Email" type='email' required onChange={handleChangeInputEmail} error={errEmail} />
                <TextField
                    required
                    name="Mật khẩu"
                    label="Mật khẩu"
                    onChange={handleChangeInputPassword}
                    error={errPassword}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    required
                    name="Xác nhận mật khẩu"
                    label="Xác nhận mật khẩu"
                    onChange={handleChangeInputConfirmPassword}
                    error={errConfirmPassword}
                    type={showPassword ? 'text' : 'password'}
                    helperText={helperText ? 'Mật khẩu không khớp' : undefined}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField required name="Số điện thoại" onChange={handleChangeInputPhoneNumber} error={errPhone} type='number' label="Số điện thoại" />

                <FormControl sx={{ width: "100%", mt: "15px" }}>
                    <InputLabel id="demo-multiple-name-label">
                        Thành phố/Tỉnh
                    </InputLabel>
                    <Select
                        required
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        onChange={handleChangeInputCity}
                        input={<OutlinedInput label="Thành phố/Tỉnh" />}
                        MenuProps={MenuProps}
                        error={errCity}
                    >
                        {provinces.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 4 }}>
                <Typography variant="body1">
                    Bạn đã có tài khoản?
                    <Link variant="subtitle1" sx={{ ml: 0.5 }} onClick={() => navigate("/signin")} underline='none' style={{ cursor: "pointer" }}>
                        Đăng nhập ngay
                    </Link>
                </Typography>

            </Stack>

            <Box display="flex" justifyContent='center' alignItems='center'>
                <Button variant="contained" onClick={handleSignup} sx={{ textTransform: "uppercase", width: "100%" }} disabled={isLoading} size='large'>Đăng ký</Button>
            </Box>
        </>
    );

    return (
        <Box
            sx={{

                height: 1,
                bgcolor: "#13366E"
            }}
        >
            <img src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/08/logo.png" alt="logo"
                style={{
                    height: "35px", width: "133px", position: 'fixed',
                    top: "50px",
                    left: "40px",
                }} />



            <Stack alignItems="center" justifyContent="start" sx={{ height: 1 }}>
                <Card
                    sx={{
                        mt: 15,
                        p: 5,
                        width: 1,
                        maxWidth: 500,
                    }}
                >
                    <Box display="flex" justifyContent='center' alignItems='center'>
                        <Typography variant="h4" textTransform="uppercase" mb="30px">Đăng ký</Typography>
                    </Box>
                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
