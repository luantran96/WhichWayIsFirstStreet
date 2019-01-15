
import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const Login = () => (  
    <Form className= "login">
      <Form.Field>
        <label>Username</label>
        <input placeholder='Username' />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input type="password" placeholder='Password' />
      </Form.Field>

      <Button color='blue' type='submit'>Submit</Button>
    </Form>
    )


    export default Login;