import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    this.service.login(email, password)
    .then(() => {
        this.setState({ email: "", password: "" });
        // this.props.getUser(response);
        window.location.reload(); 
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit} name="login">
          <div className="modal-body p-4">
            <div className="form-group">
                <label>Email address</label>
                <input type="email" name="email" className="form-control" placeholder="Enter your email" autoComplete="email" required value={this.state.email} onChange={ e => this.handleChange(e)}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" className="form-control" placeholder="Password" autoComplete="current-password" required value={this.state.password} onChange={ e => this.handleChange(e)}/>
            </div>
            <small>
                <a className="text-primary" href="/password-recovery">Forgot your password?</a> 
            </small>
            </div>
            <div className="modal-footer p-4">
            <small>
                <span className="text-primary"><Link to={"/signup"}>Don't have an account yet? Signup</Link></span> 
            </small>
            <button type="submit" className="btn btn-primary">Log in</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login;