import React, { useState } from 'react';
import {
  Paper,
  Container,
  Grid,
  makeStyles,
  Toolbar,
  Fade,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import SignupForm from '../components/Forms/SignupForm';
import personalInfo from '../assets/svg/signIn.svg';
import security from '../assets/svg/security.svg';
import mention from '../assets/svg/mention.svg';
import { useHistory } from 'react-router-dom';
import { deleteMessage } from '../Redux'

function step() {
  return [personalInfo, security, mention];
}

export default function SignupPage(props) {
  document.title = 'Signup';
  const dispatch = useDispatch();
  const history = useHistory();
  const snack = useSelector((state) => state.snack);
  const signup = useSelector((state) => state.signup);
  const classes = useStyle();
  const steps = step();
  const [image, setImage] = useState(0);
  const [imageStep] = useState(0);
  return (
    <>
      <div className={classes.container}>
        <Paper className={classes.root} elevation={5}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={7} className={classes.descriptionBox}>
              <Container>
                <Toolbar className={classes.imageContainer}>
                  {steps[image] && (
                    <Fade in={!!steps[image]} timeout={3000}>
                      <img
                        alt="hello"
                        className={classes.image}
                        src={steps[image]}
                      />
                    </Fade>
                  )}
                </Toolbar>
              </Container>
            </Grid>
            <Grid className={classes.loginForm} item xs={12} sm={5}>
              <Container>
                <SignupForm step={imageStep} setImage={setImage} />
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
    width: '80%',
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(10),
    height: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
      marginTop: theme.spacing(5),
      marginLeft: '0px',
    },
  },
  adminsvg: {
    width: '100%',
    height: '400px',
  },
  descriptionBox: {
    backgroundColor: '#c52aef',
    color: 'white',
    height: '60vh',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  loginForm: {
    color: 'black',
    height: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
  },
  image: {
    height: 'inherit',
    width: '100%',
  },
}));
