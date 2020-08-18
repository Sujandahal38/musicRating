import React, { useEffect, useState } from 'react';
import { makeStyles, TextField, Avatar, Button } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton } from '@material-ui/lab';
import { addComment } from '../../store';
import { ClipLoader } from 'react-spinners';
const AddCommentForm = ({ title, id }) => {
  const classes = useStyles();
  const [comment, setComment] = useState('');
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const commentState = useSelector((state) => state.comment);
  const auth = useSelector(state => state.auth)
  const handleComment = (e) => {
    if (e.key === 'enter') {
      if (comment.length > 0) {
        if(auth.isLoggedIn) {
          dispatch(addComment(id, comment));
        }
      }
    }
  };
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.length > 0) {
      if(auth.isLoggedIn) {
        dispatch(addComment(id, comment));
      }
    }
  };
  useEffect(() => {
    document.addEventListener('keypress', handleComment);
    return () => {
      document.removeEventListener('keypress', handleComment);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {commentState.loading ? (
        <div className={classes.loader}>
          <ClipLoader color="white" />
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <div className={classes.root}>
              {user.length > 0 ? (
                <Avatar size={30} className={classes.orange}>
                  {user[0].fullName}
                </Avatar>
              ) : (
                <Skeleton variant="circle" />
              )}

              <TextField
                className={classes.textField}
                fullWidth={true}
                autoFocus={true}
                id="comment"
                name="comment"
                label="Add new comment"
                variant="standard"
                color="primary"
                onChange={handleChange}
              />
            </div>
            <div className={classes.buttonHolder}>
              <Button
                disabled={comment.length > 0 ? false : true}
                type='submit'
                variant="contained"
              >
                Comment
              </Button>
            </div>
          </form>
        </>
      )}
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(1)
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  textField: {
    marginLeft: theme.spacing(1),
    paddingBottom: theme.spacing(0.5),
  },
  buttonHolder: {
    marginTop: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  loader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default AddCommentForm;
