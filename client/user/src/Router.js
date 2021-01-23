import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Navbar from './components/NavBar/Navbar';
import HomePage from './pages/HomePage';
import SnackBar from './components/SnackBar/SnackBar';
import { useDispatch } from 'react-redux';
import { verifyToken } from './store';
import VideoViewPage from './pages/VideoViewPage.jsx'

const authenticated = () => {
  const token = localStorage.getItem('token');
    if (token) {
        return true;
    }
    if (!token) {
      return false;
    }
}
const PrivateRoute = ({ component: Component, path, ...rest }) => {
  return (
    <Route
      path={path}
      render={(props) =>
        !authenticated() ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};


const Router = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
     dispatch(verifyToken(token));
    }
// eslint-disable-next-line
  },[]);

  return (
    <>
    <Navbar/>
    <SnackBar/>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <PrivateRoute path="/login" component={LoginPage} />
        <PrivateRoute path="/signup" component={SignupPage}/>
        <Route path ='/video/:genre/:id' component={VideoViewPage} />
      </Switch>
    </>
  );
};

export default Router;
