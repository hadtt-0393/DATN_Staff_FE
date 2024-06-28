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
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';


// ----------------------------------------------------------------------

export default function SigninView() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errEmail, setErrEmail] = useState(false)
    const [errPassword, setErrPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>();

    const theme = useTheme();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleChangeEmail = (e: any) => {
        setEmail(e.target.value)
        if (e.target.value) {
            setErrEmail(false)
        }
    }
    const handleChangePassword = (e: any) => {
        setPassword(e.target.value)
        if (e.target.value) {
            setErrPassword(false)
        }
    }

    const handleSignin = async (e: any) => {
        e.preventDefault()
        if (!email || !password) {
            !email ? setErrEmail(true) : setErrEmail(false)
            !password ? setErrPassword(true) : setErrPassword(false)
            return;
        }
        const login = async () => {
            setLoading(true)
            try {
                const res = await axiosInstance.post('/auth/staff/signin', {
                    email,
                    password
                })
                if (res.status === 200) {
                    localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken))
                    navigate("/")
                    // toast.success("Đăng nhập thành công", { autoClose: 2000, onClose: () => { navigate('/') } })
                }
            } catch (error) {
                setError(error)
            }
        }
        login()

    }
    const renderForm = (
        <Box component="form" noValidate onSubmit={handleSignin}>
            <Stack spacing={3}>
                <TextField
                    name="email"
                    label="Email"
                    value={email}
                    onChange={handleChangeEmail}
                    autoComplete="email"
                    autoFocus
                    error={errEmail}
                    type='email'
                />
                <TextField
                    name="Mật khẩu"
                    label="Mật khẩu"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handleChangePassword}
                    error={errPassword}
                    autoComplete='current-password'
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
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ my: 4 }}>
                <Typography variant="body1">
                    Bạn chưa có tài khoản?
                    <Link variant="subtitle1" sx={{ ml: 0.5 }} onClick={() => navigate("/signup")} underline='none' style={{ cursor: "pointer" }}>
                        Đăng ký ngay
                    </Link>
                </Typography>

            </Stack>

            <Box display="flex" justifyContent='center' alignItems='center'>
                <Button variant="contained" sx={{ textTransform: "uppercase", width: "100%" }} size='large' type="submit">Đăng nhập</Button>
            </Box>
        </Box>
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
                    height: "35px", width: "133px", cursor: "pointer", position: 'fixed',
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
                        <Typography variant="h4" textTransform="uppercase" mb="30px">Đăng nhập</Typography>
                    </Box>
                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
