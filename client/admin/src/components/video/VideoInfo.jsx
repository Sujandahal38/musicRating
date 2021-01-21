import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Card,
  CardHeader,
  Typography,
  CardMedia,
  CardContent,
  Box,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getVideoByID } from '../../Redux';
import Moment from 'react-moment';
import Youtube from 'react-youtube';
import { BeatLoader } from 'react-spinners';
import {
  AiOutlineDelete,
  BsGraphUp,
  AiOutlineCloudDownload,
} from 'react-icons/all';
import { useHistory } from 'react-router-dom';
import { setCommentFetch, deleteVideo, analyzeVideo } from '../../Redux';

export default function VideoInfo() {
  const location = useLocation();
  const classes = useStyles();
  const { id } = useParams();
  const video = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(getVideoByID(id));
    // eslint-disable-next-line
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const onDelete = (id) => {
    dispatch(deleteVideo(id));
  };
  const fetchComment = (id) => {
    dispatch(setCommentFetch(id, location.pathname));
  };
  if (video?.message === 'Video deleted successfully.') {
    history.push('/dashboard/addvideo');
  }
  console.log(video);
  return (
    <>
      <Card elevation={5} className={classes.root}>
        <CardHeader
          title={
            <Typography variant="h6">{video?.videoDatabyId?.title}</Typography>
          }
          subheader={<Moment fromNow>{video?.videoDatabyId?.createdAt}</Moment>}
        />
        <CardMedia>
          <Youtube
            className={classes.videoEmbed}
            videoId={video?.videoDatabyId?.embedCode}
          />
        </CardMedia>
        <CardContent>
          <Box className={classes.contentHolder}>
            {' '}
            <Card className={classes.infoCard} elevation={5}>
              <Alert className={classes.alert} variant="filled" severity="info">
                <CardHeader
                  title={
                    <Typography align="center" variant="body1">
                      Genre
                    </Typography>
                  }
                />

                <CardContent>
                  <Typography component="span" align="center" variant="body1">
                    {video?.loading ? (
                      <BeatLoader margin={2} size={10} color="white" />
                    ) : (
                      video?.videoDatabyId?.genre
                    )}
                  </Typography>
                </CardContent>
              </Alert>
            </Card>
            {video?.ratings || video?.videoDatabyId?.ratings ? (
              <Card className={classes.infoCard} elevation={5}>
                <Alert
                  className={classes.alert}
                  variant="filled"
                  severity="info"
                >
                  <CardHeader
                    title={
                      <Typography align="center" variant="body1">
                        Rating
                      </Typography>
                    }
                  />

                  <CardContent>
                    <Typography component="span" align="center" variant="body1">
                      {video?.loading ? (
                        <BeatLoader margin={2} size={10} color="white" />
                      ) : (
                        video?.ratings?.toFixed(1) ||
                        video?.videoDatabyId?.ratings?.toFixed(1)
                      )}
                    </Typography>
                  </CardContent>
                </Alert>
              </Card>
            ) : null}
            <Card className={classes.infoCard} elevation={5}>
              <Alert
                className={classes.alert}
                variant="filled"
                severity={
                  video?.videoDatabyId?.youtubeComments?.length
                    ? 'success'
                    : 'warning'
                }
              >
                <CardHeader
                  title={
                    <Typography component="span" align="center" variant="body1">
                      Youtube Comments
                    </Typography>
                  }
                />

                <CardContent>
                  <Typography component="span" align="center" variant="body1">
                    {video?.fetching || video?.loading ? (
                      <BeatLoader margin={2} size={10} color="white" />
                    ) : (
                      video?.videoDatabyId?.youtubeComments?.length
                    )}
                  </Typography>
                </CardContent>
              </Alert>
            </Card>
            <Card className={classes.infoCard} elevation={5}>
              <Alert
                className={classes.alert}
                variant="filled"
                severity={
                  video?.videoDatabyId?.mvdbComments?.length
                    ? 'success'
                    : 'warning'
                }
              >
                <CardHeader
                  title={
                    <Typography component="span" align="center" variant="body1">
                      MVDB Comments
                    </Typography>
                  }
                />

                <CardContent>
                  <Typography component="span" align="center" variant="body1">
                    {video?.fetching || video?.loading ? (
                      <BeatLoader margin={2} size={10} color="white" />
                    ) : (
                      video?.videoDatabyId?.mvdbComments?.length
                    )}
                  </Typography>
                </CardContent>
              </Alert>
            </Card>
          </Box>
        </CardContent>
        <CardActions>
          <Box className={classes.actionButton}>
            <Button
              variant="contained"
              size="large"
              style={{ backgroundColor: 'red', color: 'white' }}
              startIcon={<AiOutlineDelete />}
              className={classes.Button}
              disabled={video?.fetching || video?.loading}
              onClick={handleOpen}
            >
              Delete Video
            </Button>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              startIcon={<BsGraphUp />}
              className={classes.Button}
              onClick={() => dispatch(analyzeVideo(id))}
              endIcon={
                video?.analyzing && (
                  <CircularProgress color="secondary" size={15} />
                )
              }
              disabled={
                video?.analyzing ||
                (video?.videoDatabyId?.youtubeComments?.length === 0 &&
                  video?.videoDatabyId?.mvdbComments?.length === 0)
              }
            >
              Analyze Video
            </Button>
            <Button
              className={classes.Button}
              variant="contained"
              size="large"
              color="primary"
              startIcon={<AiOutlineCloudDownload />}
              onClick={() => fetchComment(id)}
              disabled={video?.fetching || video?.loading}
            >
              Fetch Comment
            </Button>
          </Box>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirmation dailog"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={() => onDelete(id)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '65vw',
    height: 'auto',
    marginLeft: theme.spacing(12),
    marginTop: theme.spacing(12),
  },
  videoEmbed: {
    height: 350,
    width: '65vw',
  },
  contentHolder: {
    width: '100%',
    height: 'auto',
    display: 'flex',
  },
  infoCard: {
    width: theme.spacing(35),
    height: 'inherit',
    marginLeft: theme.spacing(8),
  },
  hashloader: {
    margin: '50%',
  },
  actionButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: theme.spacing(4),
  },
  Button: {
    width: theme.spacing(30),
  },
  alert: {
    width: '100%',
    height: '100%'
  }
}));
