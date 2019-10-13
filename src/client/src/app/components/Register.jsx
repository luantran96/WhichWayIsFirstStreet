import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  update(e) {
    // console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
 
  authenticate(e) {
    e.preventDefault();

    const { email, password } = this.state;
    console.log(this.state);
    this.props.authenticate(email, password).then(() => {
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <>
        <h1 id="title">Eaten.</h1>

        <form className="form-signin" onSubmit={this.authenticate.bind(this)}>
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
            <label htmlFor="inputPassword">Re-enter Password</label>
          </div>
          <div className="flex justify-content-between">
          <button className="btn" type="submit">
            Register
          </button>
          <Link to="/login">
            <button className="btn" type="submit">
              Login
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
        type: 'REGISTER_USER',
        payload: axios.get('users/register', {
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
)(Register);
