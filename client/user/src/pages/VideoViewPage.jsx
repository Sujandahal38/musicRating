import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideoById } from '../store';
import VideoViewCard from '../components/view/videoViewCard';
import Moment from 'react-moment';
import {
  makeStyles,
  Container,
  Typography,
  Divider,
} from '@material-ui/core';
import { Skeleton, Rating } from '@material-ui/lab';
import AddCommentForm from '../components/forms/AddCommentForm';
import ViewComment from '../components/view/ViewComments';
const VideoViewPage = () => {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video);
  useEffect(() => {
    dispatch(fetchVideoById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(video?.videoById?.ratings);
  return (
    <>
      <Container>
        <div className={classes.root}>
          <div className={classes.videoContainer}>
            <div className={classes.videoHolder}>
              {video?.videoById ? (
                <VideoViewCard video={video?.videoById} />
              ) : (
                <Skeleton variant="rect" height={450} />
              )}
            </div>
            <div>
              <Typography className={classes.title} variant="h5">
                {video?.videoById?.title}
              </Typography>
              <div><Typography  className={classes.artist}  component="p" >
                {

                }
              Ratings: {  video?.videoById?.ratings > 0 ? <>{video?.videoById?.ratings.toFixed(1)}/5}</>: 'N/A'}
                    </Typography></div>
              <div>
                {
                  video?.videoById?.ratings &&
                  <Rating name='rating' value={video?.videoById?.ratings} readOnly size='medium' />
                }

              </div>
              <Typography className={classes.artist} variant="h6">
               Artist: {video?.videoById?.artist}
              </Typography>
              <div>
                <Typography className={classes.date} variant="caption">
                Uploaded on: <Moment format="YYYY/MM/DD">
                  {video?.videoById?.uploadedAt}
                  </Moment>
                </Typography>
              </div>
              <Divider style={{backgroundColor: 'white'}} />
            </div>
            <div className={classes.addComentSection}>
                <AddCommentForm id={video?.videoById?._id} title={video?.videoById?.title} />
            </div>
            <ViewComment id={id}/>
          </div>
          <div className={classes.moreVideoContainer}>
            {/* similar videos section */}
          </div>
        </div>
      </Container>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 'auto',
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'row',
  },
  videoHolder: {
    height: '450px',
  },
  videoContainer: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
  },
  moreVideoContainer: {
    width: '30%',
    height: '1000px',
  },
  title: {
    paddingTop: theme.spacing(1.5),
    paddingLeft: theme.spacing(0.9),
    color: 'white',
    fontFamily: 'Roboto',
  },
  artist: {
    color: 'white',
    fontSize: theme.spacing(1.5),
    paddingLeft: theme.spacing(0.9),
  },
  date: {
    color: 'white',
    fontSize: theme.spacing(1.5),
    paddingLeft: theme.spacing(0.9),
    marginBottom: theme.spacing(0.9),
  },
  addComentSection: {
      marginTop: theme.spacing(2)
  }
}));

export default VideoViewPage;
