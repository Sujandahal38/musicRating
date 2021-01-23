import React, { useState, useRef, useEffect } from 'react';
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
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ClickAwayListener,
} from '@material-ui/core';
import { debounce } from 'lodash';
import { SearchSharp } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import useOnClickOutside from '../../utils/ClickOutside';
import { useSelector, useDispatch } from 'react-redux';
import Moment from 'moment';
import { getLogout, setSearch, clearSearch } from '../../store';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [searchResultOpen, setSearchResultOpen] = useState(true);
  const [loggedIn] = useState(false);
  const user = useSelector((state) => state.user?.userData[0]);
  const Auth = useSelector((state) => state.auth);
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
  };
  const handleClickAway = () => {
    console.log('heleadd');
    setOpen(false);
    dispatch(clearSearch());
  };

  const onFocus = (text) => {
    if (text.length > 0) {
      dispatch(setSearch(text));
    }
  };
  const handleBlur = (value) => {
    if (value.length === 0) {
      dispatch(clearSearch());
    }
  };
  const [open, setOpen] = useState(false);
  const handleSearch = debounce((text) => {
    dispatch(setSearch(text));
  }, 500);
  const searchedData = useSelector((state) => state.search);
  const history = useHistory();
  useEffect(() => {
    if (searchedData?.loading || searchedData?.results) {
      setOpen(true);
    }
  }, [searchedData]);
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
            <Typography
              style={{ color: 'white' }}
              variant="h5"
              className={classes.titleText}
            >
              MVDB
            </Typography>
          </Link>
          <div>
            <ClickAwayListener onClickAway={handleClickAway}>
              <FormControl className={classes.FormControl}>
                <Input
                  className={classes.Input}
                  type="text"
                  disableUnderline={true}
                  style={{ color: 'white' }}
                  placeholder="Search Music"
                  id="search music videos"
                  onFocus={(e) => onFocus(e.target.value)}
                  onBlur={(e) => handleBlur(e.target.value)}
                  onChange={(e) => handleSearch(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchSharp />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </ClickAwayListener>
            {open ? (
              <Collapse in={open} timeout={500}>
                <Paper elevation={5} className={classes.searchData}>
                  {searchedData?.results?.data.map((item, index) => (
                    <List key={index}>
                      <Link
                        className={classes.link}
                        to={`/video/${item.genre}/${item._id}`}
                      >
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar
                              fontSize={85}
                              src={item.thumbnail}
                              variant="square"
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <span className={classes.title}>
                                {item.title}
                              </span>
                            }
                            secondary={
                              <>
                                <Typography
                                  component="span"
                                  variant="subtitle1"
                                >
                                  {item.artist}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      </Link>
                    </List>
                  ))}
                </Paper>
              </Collapse>
            ) : null}
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
  link: {
    textDecoration: 'none',
    color: 'white',
  },
}));
