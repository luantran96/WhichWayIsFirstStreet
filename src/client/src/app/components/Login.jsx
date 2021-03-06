import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2
        .init({
          client_id:
            '719382954741-ess7tdllgodqm1pmc1t3996tthm96u28.apps.googleusercontent.com',
        })
        .then(() => {
          window.gapi.signin2.render('google-signIn', {
            scope: 'profile email',
            width: 390,
            height: 50,
            theme: 'dark',
            onsuccess: this.onSignIn,
            // 'onfailure': this.onFailure
          });
        });
    });
  }

  onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
  };

  update(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  authenticate(e) {
    e.preventDefault();

    const { email, password } = this.state;
    this.props.authenticate(email, password).then(() => {
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <>
        <h1 id="title">Eaten.</h1>
        <form className="form-signin" onSubmit={this.authenticate.bind(this)}>
          <div id="google-signIn" />
          <div className="form-label-group">
            <input
              onChange={this.update.bind(this)}
              type="email"
              id="inputEmail"
              name="email"
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
            <label htmlFor="inputEmail">Email</label>
          </div>

          <div className="form-label-group">
            <input
              onChange={this.update.bind(this)}
              type="password"
              id="inputPassword"
              name="password"
              className="form-control"
              placeholder="Password"
              required
            />
            <label htmlFor="inputPassword">Password</label>
          </div>
          <div className="flex justify-content-between">
            <button className="btn" type="submit">
              Login
            </button>
            <Link to="/register">
              <button className="btn" type="submit">
                Register
              </button>
            </Link>
          </div>
          <p className="mt-5 mb-3 text-muted text-center">&copy; 2018-2019</p>
        </form>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.app.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (email, password) =>
      dispatch({
        type: 'AUTHENTICATE_USER',
        payload: axios.get('users/login', {
          params: {
            email,
            password,
          },
        }),
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
