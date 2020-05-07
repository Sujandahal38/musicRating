import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFetchVideo } from "../../Redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import { FadeLoader } from 'react-spinners'
import {
  makeStyles,
  Paper,
  Typography,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";

export default function VideoList() {
  const classes = useStyle();
  const video = useSelector((state) => state.video);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFetchVideo(10));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Paper className={classes.root} elevation={3}>
        <Toolbar className={classes.headerText}>
          <Typography variant="h6">Recently Added Videos</Typography>
        </Toolbar>
        <Divider variant="middle" className={classes.divider} />
       {video?.fetching &&
         <div className={classes.hashloader}><FadeLoader width={4} height={10} radius={2} color='black' /></div> 
       }
        {video?.videoData &&
          video.videoData.map((item, index) => (
            <List>
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar fontSize={85} src={item.thumbnail} variant="square" />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Link
                      className={classes.link}
                      to={`/dashboard/videos/${item._id}`}
                    >
                      <span className={classes.title}>{item.title}</span>
                    </Link>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="subtitle1">
                        <Moment fromNow>{item.createdAt}</Moment>
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </List>
          ))}
      </Paper>
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    width: "25vw",
    height: 520.97,
    marginTop: theme.spacing(12),
    marginLeft: theme.spacing(12),
    overflow: "scroll",
    overflowX: "hidden",
  },
  headerText: {
    justifyContent: "center",
  },
  divider: {
    backgroundColor: "#a00fc7",
  },
  title: {
    fontWeight: "bolder",
  },
  link: {
    textDecoration: "none",
  },
  hashloader: {
   margin: '50%'
  }
}));
