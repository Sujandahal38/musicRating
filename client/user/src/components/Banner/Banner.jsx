import React from 'react';
import { makeStyles, Card, CardMedia, Toolbar } from '@material-ui/core';
import { Rating } from '@material-ui/lab'

const Banner = ({info }) => {
  const classes = useStyles();
  return (
    <>
        <Card className={classes.card}>
          <CardMedia className={classes.media} image={info.thumbnail} />
          <h1 className={classes.title}>{info.title}</h1>
          <Toolbar  className={classes.description} >
          <Rating size='large' readOnly={true} value={info.ratings} />
          </Toolbar>
        </Card>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    height: 'inherit',
    position: 'relative',
  },
  media: {
    height: theme.spacing(55),
  },
  title: {
    position: 'absolute',
    paddingLeft: theme.spacing(6),
    fontFamily: 'Roboto',
    top: 0,
  },
  description: {
    position: 'absolute',
    paddingLeft: theme.spacing(6),
    fontFamily: 'Roboto',
    bottom: 2,
    width: '100%',
    display: 'flex',
    alignContent: 'center'
  }
}));
export default Banner;
