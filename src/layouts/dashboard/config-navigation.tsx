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
    title: 'rooms',
    path: '/rooms',
    icon: <MeetingRoomIcon/>,
  },
  {
    title: 'forms',
    path: '/forms',
    icon: <ContactEmergencyIcon/>,
  },
  {
    title: 'profile',
    path: '/profile',
    icon: <BusinessIcon/>

  }
];

export default navConfig;
