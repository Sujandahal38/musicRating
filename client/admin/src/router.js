import React, { useEffect, useRef } from 'react';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/SignupPage';
import { Switch, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './Redux/Auth/authActions';
import Dashboard from './pages/Dashboard';
import Unauthorize from './pages/Unauthorize';
import SuccessSnackbar from './components/snackbar/snackbar';
import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRoute';
import { HashLoader } from 'react-spinners';

const AdminRouter = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const checkUser = useRef();
  checkUser.current = () => {
    let token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUser(token));
    }
  };
  useEffect(() => {
    checkUser.current();
  }, []);

  return (
    <>
      <SuccessSnackbar />
      {auth?.verifying ? (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <HashLoader color="yellow" size={45} />
        </div>
      ) : (
        <Switch>
          <PublicRoute path="/signup" component={SignupPage} />
          <PublicRoute path="/login" component={LoginPage} />
          <PublicRoute path="/unauthorized" component={Unauthorize} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Redirect to="/dashboard/addvideo"/>
        </Switch>
      )}
    </>
  );
};

export default AdminRouter;
