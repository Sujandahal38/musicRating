import React from "react";
import {
  Drawer,
  makeStyles,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Container,
  ListItemText,
} from "@material-ui/core";
import { BsMusicNoteList } from "react-icons/bs";
import { AiFillDashboard, IoMdAddCircle, FaUserEdit, FaEdit } from "react-icons/all";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function LeftDrawer(props) {
  const classes = useStyle();
  const location = useLocation();
  const userData = useSelector(state => state.auth.userData);
  return (
    <Drawer
      className={classes.root}
      variant="persistent"
      open={props.openDrawer}
    >
      <div className={classes.paper}>
        <Container>
          <Toolbar className={classes.nameHolder}>
            <BsMusicNoteList style={{ color: "white" }} fontSize={45} />
          </Toolbar>
          <Divider variant="middle" />
          <List component="nav">
            <Link style={{textDecoration: 'none'}} to="/dashboard/addvideo">
              <ListItem  selected={!!(location.pathname === '/dashboard/addvideo')}  button>
                <ListItemIcon>
                  <IoMdAddCircle color="white" fontSize={25} />
                </ListItemIcon>
                <ListItemText style={{ color: "white" }} primary="Add Video" />
              </ListItem>
            </Link>
            <Link style={{textDecoration: 'none'}} to="/dashboard/managevideo">
              <ListItem  selected={!!(location.pathname === '/dashboard/managevideo')}  button>
                <ListItemIcon>
                  <FaEdit color="white" fontSize={25} />
                </ListItemIcon>
                <ListItemText style={{ color: "white" }} primary="Manage Video" />
              </ListItem>
            </Link>
            { userData?.isRoot &&
            <Link style={{textDecoration: 'none'}} to="/dashboard/manageadmin">
              <ListItem  selected={!!(location.pathname === '/dashboard/manageadmin')}  button>
                <ListItemIcon>
                  <FaUserEdit color="white" fontSize={25} />
                </ListItemIcon>
                <ListItemText style={{ color: "white" }} primary="Admin Role" />
              </ListItem>
            </Link>
            }
          </List>
        </Container>
      </div>
    </Drawer>
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    width: 240,
  },
  paper: {
    width: "241px",
    height: "100vh",
    backgroundColor: "#c52aef",
  },
  avatarHolder: {
    justifyContent: "center",
  },
  nameHolder: {
    justifyContent: "center",
    color: "white",
  },
  avatar: {
    marginTop: theme.spacing(3),
    width: "75px",
    height: "75px",
  },
}));
