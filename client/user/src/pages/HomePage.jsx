import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Banner from '../components/Banner/Banner';
import { makeStyles, Container } from '@material-ui/core';
import GenreList from '../components/List/GenreList';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVideo, fetchLatestVideo } from '../store';

const HomePage = () => {
  document.title = 'Music video Database';
  const classes = useStyles();
  const videos = useSelector(state => state.video);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVideo());
    dispatch(fetchLatestVideo(5));
// eslint-disable-next-line
  },[])
  return (
    <>
      <Container>
        <section>
          <div className={classes.slider}>
            { videos?.latestVideo?.length > 0 && <Carousel
              interval={2000}
              timeout={1200}
              className={classes.slider}
              animation="fade"
            >
              {videos?.latestVideo.map((item, i) => (
                <Banner key={item._id} info={item} />
              ))}
            </Carousel>}
          </div>
        </section>
        <section>
          <div className={classes.topList}>
            {videos?.videoData?.length > 0 &&  videos?.videoData?.map((item, index) =>
              <GenreList
                className={classes.list}
                key={index}
                genre={item.genre}
                list={item.info}
              />
            )}
          </div>
        </section>
        <section></section>
      </Container>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  slider: {
    marginTop: theme.spacing(11),
    width: '100%',
    height: theme.spacing(60),
  },
  topList: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  list: {
    marginLeft: theme.spacing(2),
  },
}));

export default HomePage;
