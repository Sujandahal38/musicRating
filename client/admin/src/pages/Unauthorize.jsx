import React from 'react';
import { makeStyles, Paper, Container } from '@material-ui/core';

export default function Unauthorize() {
  const classes = useStyle();
  document.title = 'Unauthorize';
  return (
    <>
      <Container>
        <Paper elevation={3} className={classes.root}>
          <h1>Hello World</h1>
        </Paper>
      </Container>
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
  },
}));
