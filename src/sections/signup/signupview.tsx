import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Logo from '../../components/logo';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility'

import { useNavigate } from 'react-router-dom';
import { bgGradient } from '../../theme/css';
import { MenuItem } from '@mui/material';


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

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleClick = () => {
        navigate('/');
    };

    const renderForm = (
        <>
            <Stack spacing={3}>
                <TextField name="Tên khách sạn" label="Tên khách sạn" />
                <TextField name="email" label="Email" />
                <TextField
                    name="Mật khẩu"
                    label="Mật khẩu"
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
                    name="Xác nhận mật khẩu"
                    label="Xác nhận mật khẩu"
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
                <TextField name="Số điện thoại" type='number' label="Số điện thoại" />
                <TextField id="outlined-basic" label="Thành phố" variant="outlined" sx={{ flex: 1 }} select >
                    {provinces.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
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
                <Button variant="contained" onClick={handleClick} sx={{ textTransform: "uppercase" }} size='large'>Đăng ký</Button>
            </Box>
        </>
    );

    return (
        <Box
            sx={{
                // ...bgGradient({
                //     color: alpha(theme.palette.background.default, 0.1),
                //     imgUrl: '/assets/background/overlay_4.jpg',
                // }),
                height: 1,
                bgcolor: "#13366E"
            }}
        >
            <img src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/08/logo.png" alt="logo"
                style={{
                    height: "35px", width: "133px", cursor: "pointer", position: 'fixed',
                    top: "50px",
                    left: "40px",
                }} onClick={() => navigate("/")} />

           

            <Stack alignItems="center" justifyContent="start" sx={{ height: 1 }}>
                <Card
                    sx={{
                        mt:15,
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
