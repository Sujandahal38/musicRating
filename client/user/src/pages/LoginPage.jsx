import React from 'react';
import { makeStyles, Container, Box } from '@material-ui/core';
import LoginForm from '../components/forms/LoginForm';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
const LoginPage = () => {
  document.title = 'Login';
  const classes = useStyles();
  const history = useHistory();
  const Auth = useSelector(state => state.auth);
  useEffect(() => {
    if (Auth.isLoggedIn) {
      history.push('/')
    }
// eslint-disable-next-line
  },[])

  if(Auth.isLoggedIn) {
    history.goBack();
  }

  return (
    <>
    <section>
    <Container>
        <div className={classes.content}>
        <Box className={classes.root}>
          <LoginForm />
        </Box>
      </div>
      </Container>
      </section>

    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '35%',
    [theme.breakpoints.down('sm')] : {
      width: '100%'
    }
  },
  content: {
      height: '80vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
  }
}));

export default LoginPage;
