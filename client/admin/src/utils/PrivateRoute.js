import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
const PrivateRoute = ({ component: Component, path, ...rest }) => {
    const auth = useSelector((state) => state.auth)
    return (
      <Route
        path={path}
        render={(props) =>
          auth?.isLoggedIn ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  };

  export default PrivateRoute;