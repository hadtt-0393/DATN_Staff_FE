import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: <AutoGraphOutlinedIcon/>,
  },
  {
    title: 'room',
    path: '/room',
    icon: <PersonOutlineOutlinedIcon/>,
  },
  {
    title: 'form',
    path: '/form',
    icon: <ShoppingCartIcon/>,
  },
];

export default navConfig;
