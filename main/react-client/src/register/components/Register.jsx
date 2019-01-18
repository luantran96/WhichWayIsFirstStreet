import React from 'react';

const Register = () => (  

  <form className="form-signin" action="/users/register" method="POST">
    <div className="text-center mb-4">
    <h1 className="h1 mb-3 font-weight-normal" id="title">Eaten.</h1>
    <h1 className="h5 mb-3 font-weight-normal" id="title">Signup</h1>
    </div>
  
    <div className="form-label-group">
    <input type="email" id="inputEmail" name="email" className="form-control" placeholder="Email address" required autoFocus />
    <label htmlFor="inputEmail">Email</label>
  </div>

  <div className="form-label-group">
    <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" required/>
    <label htmlFor="inputPassword">Password</label>
  </div>
  
  <button className="btn btn-lg btn-primary btn-block" type="submit" action="/users/login">Submit</button>
  <p className="mt-5 mb-3 text-muted text-center">&copy; 2018-2019</p>
  </form>
  
  )


export default Register;