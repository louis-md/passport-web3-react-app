import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
import Login from './Login'

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { firstName: '', lastName: '',email: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const password = this.state.password;
  
    this.service.signup(firstName, lastName, email, password)
    .then( response => {
        this.setState({
            firstName: "",
            lastName: "",
            email: "", 
            password: "",
        });
        this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
      
  
  render(){
    return(
      
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header p-4">
            <h5 className="modal-title text-primary font-weight-bold">Signup</h5>
          </div>
          <form onSubmit={this.handleFormSubmit} id="form-container">
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="firstName">First name*</label>
                <input id="firstName" className="form-control" type="text" name="firstName" placeholder="Steve" required value={this.state.firstName} onChange={ e => this.handleChange(e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <input id="lastName" className="form-control" type="text" name="lastName" placeholder="Jobs" value={this.state.lastName} onChange={ e => this.handleChange(e)}/>
              </div>  
              <div className="form-group">
                <label htmlFor="email">Email*</label>
                <input id="email" className="form-control" type="text" name="email" placeholder="steve.jobs@apple.com" required value={this.state.email} onChange={ e => this.handleChange(e)}/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password*</label>
                <input id="password" className="form-control" type="password" name="password" placeholder="************" required value={this.state.password} onChange={ e => this.handleChange(e)} />
              </div>
                <small>
                  <p className="text-primary">Do you already have an account? Login 
                  <div
                  className="modal fade"
                  id="login-oy2nrmz20"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="login-oy2nrmz20"
                  style={{ display: "none" }}
                  aria-hidden="true"
                >
                <Login />
                </div></p>
              </small>
            </div>
              <div className="modal-footer">
              <div className="g-recaptcha" data-sitekey="6Lf25NcUAAAAAMTgn3gvkYknMnUGBfMmzGrY9cXy"></div>
              <button type="submit" className="btn btn-primary">Create account</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Signup;