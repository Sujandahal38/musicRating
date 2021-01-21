import React, { useRef } from 'react';
import { makeStyles, Avatar, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { lightGreen } from '@material-ui/core/colors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComment } from '../../store';

const ViewComment = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const comment = useSelector((state) => state.comment);
  const fetchCommentById = useRef();
  fetchCommentById.current = () => {
    dispatch(fetchComment(id));
  };
  useEffect(() => {
    fetchCommentById.current();
  }, []);
  useEffect(() => {
    fetchCommentById.current();
  }, [id])
  return (
    <>
      <div className={classes.root}>
        {comment?.fetching ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          <>
            {comment?.comments?.length > 0 ? (
              comment?.comments.map((item, index) => (

                  <div key={index} className={classes.commentHolder}>
                    <Avatar size={25} className={classes.orange}>
                      {item.commentedBy}
                    </Avatar>
                    <div className={classes.userNameComment}>
                      <Typography className={classes.userName} variant="h6">
                        {item.commentedBy}
                      </Typography>
                      <Typography className={classes.commentText} variant="h6">
                        {item.comment}
                      </Typography>
                    </div>
                  </div>

              ))
            ) : (
              <Typography className={classes.commentText} variant="h6">
                No comments.
              </Typography>
            )}
          </>
        )}
      </div>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3.5),
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  commentHolder: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(2),
  },
  orange: {
    color: theme.palette.getContrastText(lightGreen[500]),
    backgroundColor: lightGreen[500],
  },
  userName: {
    paddingLeft: theme.spacing(2),
    color: 'white',
    fontSize: theme.spacing(2),
  },
  commentText: {
    paddingLeft: theme.spacing(2),
    color: 'white',
    fontSize: theme.spacing(1.5),
  },
  userNameComment: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default ViewComment;
