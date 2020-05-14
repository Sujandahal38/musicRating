import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import { clearSnackbar } from '../../Redux';
import {
  ErrorOutlineSharp,
  CheckCircleOutlineSharp,
  InfoOutlined,
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { makeStyles, Slide } from '@material-ui/core';
export default function SuccessSnackbar() {
  const dispatch = useDispatch();

  const { snackbarMessage, snackbarOpen, status } = useSelector(
    (state) => state.snack
  );
  const classes = useStyle();
  function handleClose() {
    dispatch(clearSnackbar());
  }
  const checkStatusRange = (status) => {
    if (100 <= status && status <= 199) {
      return 'info';
    }
    if (200 <= status && status <= 299) {
      return 'success';
    }
    if (400 <= status && status <= 499) {
      return 'warning';
    }
    if (500 <= status && status <= 599) {
      return 'danger';
    }
  };
  return (
    <Snackbar
      className={classes.root}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={snackbarOpen}
      onClose={handleClose}
      autoHideDuration={4000}
    >
      <Slide direction="down" in={snackbarOpen}>
        <Alert
          elevation={5}
          icon={
            (100 <= status && status <= 199 && (
              <InfoOutlined fontSize="inherit" />
            )) ||
            (200 <= status && status <= 299 && <CheckCircleOutlineSharp fontSize="inherit" />) ||
            (400 <= status && status <= 499 && <ErrorOutlineSharp fontSize="inherit" />)
          }
          onClose={handleClose}
          severity={checkStatusRange(status)}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Slide>
    </Snackbar>
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(-1),
  },
}));
