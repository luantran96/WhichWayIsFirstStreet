import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, user }) => {
  return (
    <Route
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    user: state.app.user,
  };
};

export default connect(mapStateToProps)(AuthRoute);
