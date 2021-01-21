import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Switch, Route, Link } from 'react-router-dom';
import { makeStyles, Typography, Button, Container } from '@material-ui/core';
import clsx from 'clsx';
import LeftDrawer from '../components/Drawer/Drawer';
import { useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';
import AddVideoPage from './AddVideoPage';
import VideoInfo from '../components/video/VideoInfo';
import VideoTable from '../components/Table/VideoTable';
import EditVideo from '../components/Forms/editVideo';
import AdminCard from '../components/cards/adminCard';
import ProfilePage from './profilePage';
const device = () => {
  let x = window.matchMedia('(min-width: 700px');
  if (x.matches) {
    return true;
  }
  if (!x.matches) {
    return false;
  }
};

export default function (props) {
  document.title = 'Dashboard';
  const classes = useStyle();
  const [openDrawer, setOpenDrawer] = useState(device());
  const auth = useSelector((state) => state.auth);

  return !auth?.userData ? (
    <div className={classes.loading}>
      <HashLoader color="yellow" size={45} />
      {auth?.fakeToken ? (
        <>
          <Typography>Invalid Access Request Detected. </Typography>
          <Link to="/login">
            <Button variant="contained" color="secondary">
              go to login
            </Button>{' '}
          </Link>{' '}
        </>
      ) : (
        ''
      )}
    </div>
  ) : (
    <>
      <div className={clsx(classes.root, { [classes.shift]: openDrawer })}>
        <LeftDrawer openDrawer={openDrawer} />
        <Navbar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        <Container>
          <Switch>
            <Route exact path="/dashboard/addvideo" component={AddVideoPage} />
            <Route path="/dashboard/videos/:id" component={VideoInfo} />
            <Route path="/dashboard/managevideo" component={VideoTable} />
            <Route path="/dashboard/editvideo/:id" component={EditVideo} />
            <Route path="/dashboard/manageadmin" component={AdminCard} />
            <Route path='/dashboard/profile' component={ProfilePage} />
          </Switch>
        </Container>
      </div>
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    width: '100vw',
  },
  shift: {
    width: `calc(100% - ${240}px)`,
    marginLeft: '240px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  loading: {
    marginLeft: '48%',
    marginTop: theme.spacing(25),
  },
}));
