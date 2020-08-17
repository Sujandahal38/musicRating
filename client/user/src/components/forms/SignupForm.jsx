import React from 'react';
import { Fade, TextField } from '@material-ui/core';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { setCheckUsername } from '../../store';


const SignupForm = ({ step, errors, register, getValues, setError, clearErrors, setData, data }) => {
  const dispatch = useDispatch();
  const handleUsername = debounce(async () => {
    const {username} = await getValues(['username']);
    if (username.length < 3) {
      await setError('username', {
        type: 'usernameLength',
        message: 'Username must be above 3 characters',
      });
    }
    if (username.length > 3) {
      await clearErrors(['username']);
      setData({
        ...data,
        username
      })
      dispatch(setCheckUsername(username));
    }
  }, 500);
  console.log(step);
  return (
    <>
        <div>
          {step === 0 && (
            <div>
              <TextField
              defaultValue={data?.fullName}
                variant="outlined"
                fullWidth
                error={!!errors.fullName}
                helperText={
                  (errors?.fullName?.type === 'required' &&
                    '*FullName is required.') ||
                  (errors?.fullName?.type === 'pattern' &&
                    '*Name is invalid.') ||
                  (errors?.fullName?.type === 'length' &&
                    '*Name should contain below 31 characters.')
                }
                name="fullName"
                label="Full Name"
                inputRef={register({
                  required: true,
                  pattern: /^[A-Z a-z]+$/i,
                })}
                margin="normal"
              />
              <TextField
                variant="outlined"
                defaultValue={data?.email}
                fullWidth
                name="email"
                label="Email"
                error={!!errors.email}
                helperText={
                  errors?.email?.type === 'required' && '*Email is required.'
                }
                inputRef={register({ required: true })}
                margin="normal"
              />
            </div>
          )}
          {step === 1 && (
            <div>
              <TextField
                fullWidth
                name="password"
                variant="outlined"
                label="Password"
                type="password"
                inputRef={register({
                  required: true,
                  pattern: /^[A-Za-z]\w{7,25}$/,
                })}
                margin="normal"
                error={!!errors.password}
                helperText={
                  (errors?.password?.type === 'required' &&
                    '*Password is required.') ||
                  (errors?.password?.type === 'match' &&
                    errors?.password?.message) ||
                  (errors?.password?.type === 'pattern' &&
                    '*Password is invalid, should be between 8 & 25 characters.')
                }
              />
              <TextField
                fullWidth
                name="rePassword"
                variant="outlined"
                label="Re-Password"
                type="password"
                error={!!errors.rePassword}
                helperText={
                  (errors?.rePassword?.type === 'required' &&
                    '*Password is required.') ||
                  (errors?.rePassword?.type === 'match' &&
                    errors?.rePassword?.message)
                }
                inputRef={register({ required: true })}
                margin="normal"
              />
            </div>
          )}
          {step === 2 && (
            <div>
              <TextField
              defaultValue={data?.username}
                variant="outlined"
                name="username"
                type="text"
                fullWidth
                error={!!(errors.username)}
                label="Username"
                onChange={handleUsername}
                color="secondary"
                margin="normal"
                inputRef={register({ required: true })}
                helperText={!!(errors.username) ? errors?.username?.message: null }
              />
            </div>
          )}
        </div>
    </>
  );
};

export default SignupForm;
