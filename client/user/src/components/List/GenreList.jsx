import React from 'react';
import {
  Paper,
  makeStyles,
  List,
  ListSubheader,
  ListItem,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Link } from 'react-router-dom';

const GenreList = ({ genre, list }) => {
  const classes = useStyles();
  return (
    <>
      <Paper color="secondary" elevation={3} className={classes.root}>
        <List
          component="nav"
          subheader={
            <ListSubheader className={classes.subHeader} component="div">
              {genre}
            </ListSubheader>
          }
        >
          <ListItem className={classes.listItem}>
            {list.map((item, index) => (
              <Link
                style={{ textDecoration: 'none' }}
                key={item._id}
                to={`/video/${item.genre}/${item._id}`}
              >
                <Card elevation={3} className={classes.card}>
                  <CardMedia
                    image={item.thumbnail}
                    className={classes.imgCover}
                  />
                  <div className={classes.details}>
                    <CardContent className={classes.content}>
                      <Typography className={classes.title} component="p">
                       {item.title}
                      </Typography>
                      <Typography className={classes.title} component="p">
                        {item.artist}
                      </Typography>
                      <div>
                        {item?.ratings && (
                          <Typography className={classes.title} component="p">
                            Rating: {item?.ratings?.toFixed(1)}/5
                          </Typography>
                        )}
                      </div>
                      <Rating
                        readOnly={true}
                        size="small"
                        value={item.ratings}
                      />
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </ListItem>
        </List>
      </Paper>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(3.6),
    marginTop: theme.spacing(3),
    width: '30%',
    display: 'flex',
    flexDirection: 'column'
  },
  subHeader: {
    color: 'white',
    textAlign: 'center',
    fontSize: theme.spacing(2.2),
  },
  card: {
    height: 120,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(2),
  },
  imgCover: {
    width: 151,
  },
  details: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: theme.spacing(1.6),
  },
}));

export default GenreList;
