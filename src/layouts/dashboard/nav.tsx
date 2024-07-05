import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { usePathname } from '../../hooks/use-pathname';
import RouterLink from '../../components/router-link';
import { useResponsive } from '../../hooks/use-reponsive';
import { account } from '../../mock/account';
import Logo from '../../components/logo';
import Scrollbar from '../../components/scrollbar';
import { NAV } from './config-layout';
import navConfig from './config-navigation';
import { Button, colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }: any) {
  const navigate = useNavigate()
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2, gap: "10px", display: "flex", flexDirection: "column" }}>
        <Typography fontWeight={"700"} color="#18458B" fontSize={"18px"}>{account.displayName}</Typography>
        {/* <Button variant='contained' sx={{backgroundColor:"orange"}} disabled>Đã xác thực</Button> */}
        {/* <Button variant='contained' sx={{ backgroundColor: "orange", "&:hover": { backgroundColor: "orange", opacity: "0.8" } }}>Đã xác thực</Button> */}
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',

        },
      }}
    >
      <Box width="100%" bgcolor="#99CCFF" py="30px" >
        <img src="https://easybook.demotheme.matbao.support/wp-content/uploads/2018/08/logo.png" alt="logo"
          style={{
            height: "35px", width: "133px", cursor: "pointer",
            marginLeft: "30px",
          }} onClick={() => navigate("/")} />
      </Box>

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }}/>
      <Box>
        <Button variant="outlined" sx={{ width: "100%", height: "60px", fontSize: "16px", textTransform: "uppercase", mb: "1px" }} onClick={() => { localStorage.removeItem('accessToken'); toast.success("Đăng xuất thành công", {autoClose:2000}); navigate('/signin') }}>
          Đăng xuất
        </Button>
      </Box>

    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

function NavItem({ item }: any) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}