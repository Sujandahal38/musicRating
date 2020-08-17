import React from 'react';
import {
  TextField,
  makeStyles,
  Button,
  Typography,
  Divider,
  FormGroup,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../../store';
import { BarLoader, ScaleLoader } from 'react-spinners';
const LoginForm = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm();
  const handleLogin = (data) => {
      dispatch(login(data));
  };
  console.log(auth)
  return (
    <>
           <form className={classes.root} onSubmit={handleSubmit(handleLogin)}>
             <FormGroup>
            <TextField
              className={classes.input}
              label="Username"
              variant="outlined"
              name="usernameOrEmail"
              type="text"
              fullWidth={true}
              inputRef={register({ required: true })}
              error={!!errors.usernameOrEmail}
              helperText={
                !!errors.usernameOrEmail
                  ? '*username or Email is required.'
                  : null
              }
            />
            </FormGroup>
            <FormGroup>
            <TextField
              className={classes.input}
              label="Password"
              variant="outlined"
              name="password"
              fullWidth={true}
              type="password"
              error={!!errors.password}
              inputRef={register({ required: true })}
              helperText={!!errors.password ? '*Password is required.' : null}
            />
            </FormGroup>
            <Link to="/reset" className={classes.forgotPassword}>
              <Typography className={classes.forgotText} variant="body2">
                Forgot password?
              </Typography>
            </Link>
            <FormGroup>
            <Button
              name="login"
              fullWidth
              className={classes.loginButton}
              variant="contained"
              color="secondary"
              type="submit"
              disabled={auth?.loading}
            >
             { auth?.loading ? (
                  <ScaleLoader color='white' height={20} />
                ) : (
                  'Login'
                )}
            </Button>
            </FormGroup>
      </form>
      <Divider className={classes.divider} />
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <Button
            name="createAccount"
            fullWidth
            className={classes.loginButton}
            variant="contained"
            color="secondary"
          >
            Create New Account
          </Button>
        </Link>
    </>
  );
};
const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: theme.spacing(4),
  },
  loginButton: {
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2.3),
  },
  forgotPassword: {
    textDecoration: 'none',
    color: '#ffffff',
  },
  forgotText: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(0.2),
  },
  divider: {
    marginTop: theme.spacing(2),
    height: theme.spacing(1),
    backgroundColor: 'white',
  },
}));

export default LoginForm;
