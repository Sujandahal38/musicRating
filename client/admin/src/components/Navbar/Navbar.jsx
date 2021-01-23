import React, { useState } from 'react';
import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  IconButton,
  Input,
  InputAdornment,
  FormControl,
  Menu,
  MenuItem,
  Avatar,
  Paper,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ClickAwayListener,
} from '@material-ui/core';
import { MenuSharp, SearchSharp } from '@material-ui/icons';
import { MdArrowBack } from 'react-icons/md';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout, setSearch, clearSearch } from '../../Redux';
import { useHistory, Link } from 'react-router-dom';
import { debounce } from 'lodash';
import Moment from 'react-moment';
import { useEffect } from 'react';

export default function Navbar(props) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const searchedData = useSelector((state) => state.search);
  const history = useHistory();
  const logout = () => {
    setAnchorEl(null);
    dispatch(setLogout());
    history.push('/login');
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearch = debounce((text) => {
    dispatch(setSearch(text));
  }, 500);
  useEffect(() => {
    if (searchedData?.loading || searchedData?.results) {
      setOpen(true);
    }
  }, [searchedData]);
  const handleClickAway = () => {
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
  useEffect(() => {
    dispatch(clearSearch());
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AppBar
        className={clsx(classes.root, { [classes.shift]: props.openDrawer })}
      >
        <Toolbar>
          <IconButton
            onClick={() => {
              props.setOpenDrawer(!props.openDrawer);
            }}
            className={classes.menuButton}
            aria-label="upload picture"
            component="span"
          >
            {props.openDrawer ? <MdArrowBack /> : <MenuSharp />}
          </IconButton>
          <Typography variant="h5" className={classes.titleText}>
            <Link style={{textDecoration:"none", color: "white"}} to ='/dashboard/addvideo'>
              MVDB
            </Link>
          </Typography>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              <ClickAwayListener onClickAway={handleBlur}>
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
                              <Link
                                className={classes.link}
                                to={`/dashboard/videos/${item._id}`}
                              >
                                <span className={classes.title}>
                                  {item.title}
                                </span>
                              </Link>
                            }
                            secondary={
                              <>
                                <Typography
                                  component="span"
                                  variant="subtitle1"
                                >
                                  <Moment fromNow>{item.createdAt}</Moment>
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      </List>
                    ))}
                  </Paper>
                </Collapse>
              ) : null}
            </div>
          </ClickAwayListener>
          <Typography className={classes.fullName} variant="h6">
            {userData?.username}
          </Typography>
          <IconButton onClick={handleClick}>
            <Avatar src={userData?.avatar} />
          </IconButton>

          <Menu
            className={classes.menu}
            id="user-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => logout(history)}>Logout</MenuItem>
          </Menu>
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
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    flexGrow: 1,
  },
  FormControl: {
    [theme.breakpoints.down('md')]: {
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(3),
    },
    width: theme.spacing(45),
    marginRight: theme.spacing(25),
    color: 'white',
    backgroundColor: 'rgba(94, 91, 90, 0.36)',
    borderRadius: '5px',
  },
  Input: {
    marginLeft: theme.spacing(2),
  },
  menu: {
    marginTop: theme.spacing(5),
  },
  shift: {
    width: `calc(100% - ${240}px)`,
    marginLeft: '240px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fullName: {
    marginRight: theme.spacing(1),
  },
  searchData: {
    position: 'absolute',
    width: theme.spacing(45),
    marginTop: theme.spacing(1),
  },
}));
