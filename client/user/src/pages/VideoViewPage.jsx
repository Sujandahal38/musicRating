import React, { useEffect, useRef } from 'react';
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
import PleaseLogin from '../components/Banner/PleaseLogin';
import VideoList from '../components/view/VideoList';

import { videoByGenre } from '../store'

const VideoViewPage = () => {
  const { id, genre } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.video);
  const auth = useSelector((state) => state.auth)
  const fetchVideo = useRef();
   fetchVideo.current = () => {
    dispatch(fetchVideoById(id));
  }
  const fetchVideoByGenre = useRef();
  fetchVideoByGenre.current = () => {
    dispatch(videoByGenre(genre))
  }


  useEffect(() => {
      fetchVideo.current();
      fetchVideoByGenre.current();
  }, []);

  useEffect(() => {
    fetchVideo.current();
  }, [id, genre])
  return (
    <>
      <Container>
        <div className={classes.root}>
          <div className={classes.videoContainer}>
            <div className={classes.videoHolder}>
              {videos?.videoById ? (
                <VideoViewCard video={videos?.videoById} />
              ) : (
                <Skeleton variant="rect" height={450} />
              )}
            </div>
            <div>
              <Typography className={classes.title} variant="h5">
                {videos?.videoById?.title}
              </Typography>
              <div><Typography  className={classes.artist}  component="p" >
                {

                }
              Ratings: {  videos?.videoById?.ratings > 0 ? <>{videos?.videoById?.ratings.toFixed(1)}/5</>: 'N/A'}
                    </Typography></div>
              <div>
                {
                  videos?.videoById?.ratings &&
                  <Rating name='rating' value={videos?.videoById?.ratings} readOnly size='medium' />
                }

              </div>
              <Typography className={classes.artist} variant="h6">
               Artist: {videos?.videoById?.artist}
              </Typography>
              <div>
                <Typography className={classes.date} variant="caption">
                Uploaded on: <Moment format="YYYY/MM/DD">
                  {videos?.videoById?.uploadedAt}
                  </Moment>
                </Typography>
              </div>
              <Divider style={{backgroundColor: 'white'}} />
            </div>
            <div className={classes.addComentSection}>
              {
                auth?.isLoggedIn ?
                <AddCommentForm id={videos?.videoById?._id} title={videos?.videoById?.title} />
                :
                <PleaseLogin/>
              }
            </div>
            <ViewComment id={id}/>
          </div>
          <div className={classes.moreVideoContainer}>
             <VideoList videos={videos?.genreVideo} />
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
