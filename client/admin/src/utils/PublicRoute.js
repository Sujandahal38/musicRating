import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, Route } from 'react-router-dom';


const PublicRoute = ({ component: Component, path, ...rest }) => {
    const auth = useSelector((state) => state.auth)
    return (
      <Route
        path={path}
        render={(props) =>
          !auth?.isLoggedIn ? (
            <Component {...props} {...rest} />
          ) : (
            <Redirect
              to={{
                pathname: '/dashboard/addvideo',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  };

  export default PublicRoute;