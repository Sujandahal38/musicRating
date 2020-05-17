import React, { useState } from 'react';
import {
  Toolbar,
  makeStyles,
  Typography,
  Box,
  FormGroup,
  TextField,
  Button,
  Divider,
  Fade,
  CircularProgress,
  InputAdornment,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { checkValidUsername, setRequest } from '../../Redux';
import { debounce } from 'lodash';
import { FaUserCheck, MdError } from 'react-icons/all';

function setSteps() {
  return [0, 1, 2];
}
export default function SignupForm(props) {
  const dispatch = useDispatch();
  const signupData = useSelector((state) => state.signup);

  const classes = useStyles();
  const [steps] = useState(setSteps());
  const [data, setData] = useState({
    fullName: '',
    email: '',
    password: '',
    username: '',
  });
  const [password, setPassword] = useState('');
  const [re_Password, setRePassword] = useState('');
  const {
    register,
    errors,
    triggerValidation,
    getValues,
    setError,
    clearError,
  } = useForm();
  const [activeStep, setActiveStep] = useState(props.step);
  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value === re_Password) {
      return clearError('rePassword') && clearError('password');
    }
    clearError('password');
  };
  const rePassword = (e) => {
    const value = e.target.value;
    setRePassword(value);
    if (value === password) {
      return clearError('rePassword') && clearError('password');
    }
    setError('rePassword');
  };

  const handleUsernameDispatch = (value) => {
    dispatch(checkValidUsername({ username: value }));
  };
  const handleUsername = debounce(async (data) => {
    const validate = await triggerValidation(['username']);
    if (validate) {
      handleUsernameDispatch(data);
    }
  }, 1500);
  const handleNext = async (e) => {
    e.preventDefault();
    if (activeStep === steps[0]) {
      const validate = await triggerValidation(['fullName', 'email']);
      if (validate) {
        setData({
          fullName: getValues('fullName'),
          email: getValues('email'),
        });

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        props.setImage((prevImage) => prevImage + 1);
      }
    }
    if (activeStep === steps[1]) {
      const validate = await triggerValidation(['password']);
      if (validate) {
        setData({
          ...data,
          password: getValues('password'),
        });
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        props.setImage((prevImage) => prevImage + 1);
      }
    }
    if (activeStep === steps[2]) {
      const validate = await triggerValidation(['username']);
      if (validate) {
        if (signupData?.username) {
          let finalData = {
            ...data,
            ...signupData?.username,
          };
          console.log(finalData);
          dispatch(setRequest(finalData));
        }
      }
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    props.setImage((prevImage) => prevImage - 1);
  };

  return (
    <>
      <Fade in={true} timeout={1000}>
        <div className={classes.signupForm}>
          <Toolbar className={classes.headText}>
            <Typography className={classes.text} variant="h4">
              Signup
            </Typography>
          </Toolbar>
          <Box className={classes.formBox}>
            <form>
              {activeStep === steps[0] && (
                <>
                  <FormGroup className={classes.inputField}>
                    <TextField
                      autoFocus
                      defaultValue={data.fullName}
                      name="fullName"
                      placeholder="Full Name"
                      id="fullName"
                      label="Full Name"
                      inputRef={register({
                        required: true,
                        maxLength: 75,
                        minLength: 3,
                        pattern: /^[a-zA-Z ]+$/,
                      })}
                      error={!!errors.fullName}
                      helperText={
                        (errors.fullName?.type === 'required' &&
                          'Fullname is Required') ||
                        (errors.fullName?.type === 'pattern' && 'Invalid Name.')
                      }
                    />
                  </FormGroup>
                  <FormGroup className={classes.inputField}>
                    <TextField
                      defaultValue={data.email}
                      name="email"
                      type="Email"
                      placeholder="Email"
                      id="Email"
                      label="Email"
                      inputRef={register({
                        required: true,
                        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      })}
                      error={!!errors.email}
                      helperText={
                        (errors.email?.type === 'required' &&
                          'email is Required') ||
                        (errors.email?.type === 'pattern' && 'Invalid Email.')
                      }
                    />
                  </FormGroup>
                </>
              )}
              {activeStep === steps[1] && (
                <>
                  <FormGroup className={classes.inputField}>
                    <TextField
                      name="password"
                      type="password"
                      placeholder="Password"
                      id="password"
                      label="Password"
                      inputRef={register({
                        required: true,
                        maxLength: 75,
                        minLength: 8,
                      })}
                      error={!!errors.password}
                      helperText={
                        (errors.password?.type === 'required' &&
                          'password is Required') ||
                        (errors.password?.type === 'minLength' &&
                          'Password must be above 8 characters.') ||
                        (errors.password?.type === 'maxLength' &&
                          'Password must be below 76 characters.')
                      }
                      defaultValue={data.password}
                      onChange={handlePassword}
                    />
                  </FormGroup>
                  <FormGroup className={classes.inputField}>
                    <TextField
                      name="rePassword"
                      type="password"
                      placeholder="Re-Enter Password"
                      id="rePassword"
                      label="Re-Enter Password"
                      onChange={rePassword}
                      error={!!errors.rePassword}
                      defaultValue={data.password}
                    />
                  </FormGroup>
                </>
              )}
              {activeStep === steps[2] && (
                <FormGroup className={classes.usernameField}>
                  <TextField
                    name="username"
                    type="text"
                    placeholder="Username"
                    id="username"
                    label="Username"
                    inputRef={register({
                      required: true,
                      minLength: 3,
                      pattern: /^[a-zA-Z0-9]+$/,
                    })}
                    onChange={(e) => handleUsername(e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username && 'invalid username'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <>
                            {signupData?.checkingUsername && (
                              <CircularProgress size={16} />
                            )}
                            {signupData?.validUsername && !errors.username && (
                              <FaUserCheck fontSize={16} color="green" />
                            )}
                            {!signupData?.validUsername &&
                              !signupData?.checkingUsername && (
                                <MdError fontSize={12} color="red" />
                              )}
                          </>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormGroup>
              )}
              <Toolbar className={classes.loginButtonHolder}>
                {activeStep > 0 && (
                  <Button
                    className={classes.backButton}
                    variant="contained"
                    color="primary"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                )}
                {activeStep !== steps[2] && (
                  <Button
                    className={classes.loginButton}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={!!(password !== re_Password)}
                  >
                    Next
                  </Button>
                )}
                {activeStep === steps[2] && (
                  <Button
                    className={classes.loginButton}
                    variant="contained"
                    color="primary"
                    disabled={
                      !signupData?.validUsername ||
                      !!errors.username ||
                      signupData?.checkingUsername
                    }
                    onClick={handleNext}
                  >
                    Create Account
                  </Button>
                )}
              </Toolbar>
              <Divider className={classes.Divider} />
              <Toolbar className={classes.headText}>
                <Link style={{ textDecoration: 'none' }} to="/login">
                  {' '}
                  <Button variant="text" color="secondary">
                    Login ?
                  </Button>
                </Link>
              </Toolbar>
            </form>
          </Box>
        </div>
      </Fade>
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  headText: {
    justifyContent: 'center',
  },
  text: {
    color: '#a00fc7',
  },
  inputField: {
    margin: theme.spacing(2),
  },
  formBox: {
    marginTop: theme.spacing(2.9),
  },
  loginButtonHolder: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  loginButton: {
    marginLeft: theme.spacing(3),
  },

  Divider: {
    marginTop: theme.spacing(3),
  },
  usernameField: {
    margin: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(8),
  },
  backButton: {
    left: 0,
  },
  signupForm: {
    height: 'inherit',
  },
}));
