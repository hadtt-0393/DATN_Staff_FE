import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import BusinessIcon from '@mui/icons-material/Business';
const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: <AutoGraphOutlinedIcon/>,
  },
  {
    title: 'Quản lý phòng',
    path: '/rooms',
    icon: <MeetingRoomIcon/>,
  },
  {
    title: 'Quản lý đặt phòng',
    path: '/forms',
    icon: <ContactEmergencyIcon/>,
  },
  {
    title: 'Thông tin khách sạn',
    path: '/profile',
    icon: <BusinessIcon/>
  },
];

export default navConfig;
