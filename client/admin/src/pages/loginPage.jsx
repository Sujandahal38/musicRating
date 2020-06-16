import React from 'react';
import {
  Paper,
  Container,
  Grid,
  makeStyles,
  Toolbar,
  Fade,
} from '@material-ui/core';
import AdminSvg from '../assets/svg/admin.svg';
import LoginForm from '../components/Forms/loginForm';

export default function LoginPage() {
  const classes = useStyle();
  document.title = 'Login';
  return (
    <>
      <div className={classes.container}>
        <Paper className={classes.root} elevation={5}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={7} className={classes.descriptionBox}>
              <Container>
                <Toolbar className={classes.imageContainer}>
                  <Fade in={true} timeout={3000}>
                    <img
                      alt="admin"
                      className={classes.adminsvg}
                      src={AdminSvg}
                    />
                  </Fade>
                </Toolbar>
              </Container>
            </Grid>
            <Grid className={classes.loginForm} item xs={12} sm={5}>
              <Container>
                <div className="div">
                  <LoginForm />
                </div>
              </Container>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  root: {
    width: '90%',
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(10),
    height: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      marginTop: theme.spacing(5),
      marginLeft: 0,
    },
  },
  adminsvg: {
    width: '100%',
    height: '400px',
  },
  descriptionBox: {
    backgroundColor: '#c52aef',
    color: 'white',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  loginForm: {
    color: 'black',
    height: 'inherit',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
  },
}));
