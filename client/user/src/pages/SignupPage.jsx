import React, { useState } from 'react';
import SignupForm from '../components/forms/SignupForm';
import { Box, Button, makeStyles, Container, Divider } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSignupRequest } from '../store';
import { useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';

const SignupPage = () => {
  document.title = 'Signup';
  const history = useHistory();
  const Auth = useSelector((state) => state.auth);
  const signup = useSelector((state) => state.signup);
  useEffect(() => {
    if (Auth.isLoggedIn) {
      history.push('/');
    }
// eslint-disable-next-line
  }, []);
  if (signup?.message === 'User created Successfully 🙌') {
    history.push('/login');
  }
  const dispatch = useDispatch();
  const [data, setData] = useState({
    fullName: '',
    password: '',
    email: '',
    username: '',
  });
  const classes = useStyles();
  const [step, setStep] = useState(0);
  const {
    register,
    errors,
    trigger,
    getValues,
    setError,
    clearErrors,
  } = useForm();

  const next = async (e) => {
    e.preventDefault();
    if (step === 0) {
      if (await trigger(['fullName', 'email'])) {
        const { fullName, email } = await getValues(['fullName', 'email']);
        setData({
          ...data,
          fullName,
          email,
        });
        setStep(step + 1);
      }
    }
    if (step === 1) {
      const validate = await trigger(['password', 'rePassword']);
      if (validate) {
        const { password, rePassword } = await getValues([
          'password',
          'rePassword',
        ]);
        if (password.length > 0) {
          if (password === rePassword) {
            const { password } = await getValues(['password']);
            setData({
              ...data,
              password,
            });
            setStep(step + 1);
          } else {
            await setError('password', {
              type: 'match',
              message: '*Passwords do not match.',
            });
            await setError('rePassword', {
              type: 'match',
              message: '*Passwords do not match.',
            });
          }
        }
      }
    }
  };
  const back = () => {
    setStep(step - 1);
  };
  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(setSignupRequest(data));
  };

  return (
    <>
      <Container>
        <Box className={classes.root}>
          <Box className={classes.form}>
            <form onSubmit={signup.isValidUsername ? handleSignup : null}>
              <SignupForm
                setError={setError}
                getValues={getValues}
                register={register}
                errors={errors}
                step={step}
                clearErrors={clearErrors}
                setData={setData}
                data={data}
              />
              {step > 0 ? (
                <Button
                  className={classes.backButton}
                  fullWidth
                  color="secondary"
                  onClick={back}
                  variant="contained"
                >
                  Back
                </Button>
              ) : null}
              {step === 2 ? (
                <Button
                  fullWidth
                  color="secondary"
                  type="submit"
                  variant="contained"
                  disabled={Auth.loading}
                >
                  {signup?.loading ? (
                    <ScaleLoader height={20} color="white" />
                  ) : (
                    'Signup'
                  )}
                </Button>
              ) : (
                <Button
                  fullWidth
                  color="secondary"
                  onClick={next}
                  variant="contained"
                >
                  Next
                </Button>
              )}
            </form>
            <Divider className={classes.divider} />
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button
                className={classes.loginButton}
                fullWidth
                color="secondary"
                variant="contained"
              >
                Login
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '80vh',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    width: '35%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  backButton: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(2),
    height: theme.spacing(1),
    backgroundColor: 'white',
  },
  loginButton: {
    marginTop: theme.spacing(2),
  },
}));

export default SignupPage;
