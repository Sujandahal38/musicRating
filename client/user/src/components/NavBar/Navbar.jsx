import React, { useState, useRef } from 'react';
import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  IconButton,
  Input,
  InputAdornment,
  FormControl,
  Avatar,
  MenuItem,
  Menu,
  Button,
  Paper,
} from '@material-ui/core';
import { SearchSharp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useOnClickOutside from '../../utils/ClickOutside';
import { useSelector, useDispatch } from 'react-redux';
import {  getLogout } from '../../store'

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [searchResultOpen, setSearchResultOpen] = useState(true);
  const [loggedIn] = useState(false);
  const user = useSelector(state => state.user?.userData[0]);
  const Auth = useSelector(state => state.auth);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const classes = useStyle();
  const ref = useRef();
  useOnClickOutside(ref, () => setSearchResultOpen(false));
  const handleLogout = () => {
    dispatch(getLogout());
    setAnchorEl(null);
  }
  return (
    <>
      <AppBar color="secondary">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            aria-label="upload picture"
            component="span"
          ></IconButton>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography variant="h5" className={classes.titleText}>
              MVDB
            </Typography>
          </Link>
          <div>
            <FormControl className={classes.FormControl}>
              <Input
                className={classes.Input}
                type="text"
                disableUnderline={true}
                style={{ color: 'white' }}
                placeholder="Search Music"
                id="search music videos"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchSharp />
                  </InputAdornment>
                }
              />
            </FormControl>
        {/* <Paper
          innerRef={ref}
          className={
            searchResultOpen
              ? classes.searchData
              : classes.searchDataClicked
          }
        >
          llad
        </Paper> */}
          </div>
          {Auth.isLoggedIn ? (
            <>
              <Typography className={classes.fullName} variant="h6">
              {user?.username}
              </Typography>
              <IconButton onClick={handleClick}>
                <Avatar />
              </IconButton>
              <Menu
                className={classes.menu}
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <div>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary">
                  Login
                </Button>
              </Link>
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: '#c52aef',
    width: '100vw',
    flexGrow: 1,
  },
  menuButton: {
    color: 'white',
  },
  titleText: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    flexGrow: 1,
  },
  FormControl: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
    width: theme.spacing(92),
    marginRight: theme.spacing(25),
    color: 'white',
    backgroundColor: 'rgba(94, 91, 90, 0.36)',
    borderRadius: '5px',
  },
  Input: {
    marginLeft: theme.spacing(2),
  },
  fullName: {
    marginRight: theme.spacing(1),
  },
  searchData: {
    position: 'absolute',
    width: theme.spacing(92),
    marginTop: theme.spacing(1),
  },
  searchDataClicked: {
    position: 'absolute',
    width: theme.spacing(92),
    marginTop: theme.spacing(1),
    display: 'none',
  },
  menu: {
    marginTop: theme.spacing(6),
  },
}));
