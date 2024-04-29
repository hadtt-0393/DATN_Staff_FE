import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { hover } from '@testing-library/user-event/dist/hover';
import ListItemButton from '@mui/material/ListItemButton';
import { alpha } from '@mui/material/styles';
import PrimarySearchAppBar from "./header"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: theme.zIndex.drawer - 1,
  },
  drawerPaper: {
    width: drawerWidth,
    height: '100vh',
    position: 'fixed',
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
}));

const Dashboard = ({ children }: any) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          {['Dashboard', 'User', 'Product', 'Blog'].map((text, index) => (
            <ListItemButton
              key={text}
              sx={{
                typography: 'body2',
                color: 'text.secondary',
                textTransform: 'capitalize',
                fontWeight: 'fontWeightMedium',
                borderRadius: 0.75,
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                  },
                }
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <PrimarySearchAppBar/>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
          <Typography>
            noi dung nay da duoc hoan thien o day noi dung nay da duoc hoan thien o day
          </Typography>
      </main>
    </div >
  );
}

export default Dashboard;
