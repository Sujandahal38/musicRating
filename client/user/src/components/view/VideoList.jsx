import React from 'react';
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  IconButton,
  CardMedia,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Link } from 'react-router-dom';

const VideoList = ({ videos }) => {
  const classes = useStyles();
  return (
    <>
      {videos?.loading
        ? 'Loading'
        : videos?.map((video, index) => {
           return  <Link key={video._id} style={{textDecoration: 'none'}} to={`/video/${video.genre}/${video._id}`} ><div className={classes.container}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.cover}
                  image={video?.thumbnail}
                  title={video?.title}
                />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h6" variant="body1">
                     {video?.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {video?.artist}
                    </Typography>
                  </CardContent>
                  <div className={classes.controls}>
                  <Rating
                        readOnly={true}
                        size="small"
                        value={video?.ratings}
                      />
                  </div>
                </div>
              </Card>
            </div>
            </Link>
          })}
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(4),
  },
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default VideoList;
