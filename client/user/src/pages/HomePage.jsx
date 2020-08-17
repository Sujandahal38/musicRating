import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Banner from '../components/Banner/Banner';
import { makeStyles, Container } from '@material-ui/core';
import GenreList from '../components/List/GenreList';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVideo } from '../store';

const HomePage = () => {
  document.title = 'Music video Database';
  const classes = useStyles();
  // const list = [
  //   {
  //     genre: 'R&B',
  //     info: info,
  //   },
  //   {
  //     genre: 'Hiphop',
  //     info: info,
  //   },
  //   {
  //     genre: 'Rock',
  //     info: info,
  //   },
  //   {
  //     genre: 'Pop',
  //     info: info,
  //   },
  //   {
  //     genre: 'Country',
  //     info: info,
  //   },
  // ];
  const videos = useSelector(state => state.video);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVideo());
  },[])
  console.log(videos)
  return (
    <>
      <Container>
        <section>
          <div className={classes.slider}>
            {/* <Carousel
              interval={2000}
              timeout={1200}
              className={classes.slider}
              animation="fade"
            >
              {info.map((item, i) => (
                <Banner key={i} info={item} />
              ))}
            </Carousel> */}
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
