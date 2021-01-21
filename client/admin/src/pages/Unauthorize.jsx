import React from 'react';
import { makeStyles, Paper, Container, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { destroyMessage } from '../Redux';

export default function Unauthorize() {
  const classes = useStyle();
  const history = useHistory();
  document.title = 'Unauthorize';
  const dispatch = useDispatch();
  const handleLink = () => {
    dispatch(destroyMessage());
    history.push('/login')
  }
  return (
    <>
      <div className={classes.root}>
        <div>
          <Alert className={classes.alert} severity="warning">
            You are not authorized yet. please contact Admin to get authorized.
            <Button className={classes.link} onClick={handleLink} variant="default"  > click here to login.</Button>
          </Alert>
          </div>
      </div>
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
  alert: {
    marginTop: theme.spacing(10)
  },
  link: {
    paddingLeft: theme.spacing(2),
    textDecoration: 'underline'
  },
}));
