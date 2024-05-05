import AutoGraphOutlinedIcon from '@mui/icons-material/AutoGraphOutlined';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
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
];

export default navConfig;
