import React, { Component } from    'react';
import                              './App.css';
import { Switch, Route } from       'react-router-dom';
import Signup from                  './components/auth/Signup';
import Navbar from                  './components/navbar/Navbar';
import Welcome from                 './components/Welcome';
import Dashboard from               './components/dashboard/Dashboard';
import ContactList from             './components/dashboard/contacts/ContactList';
import ContactDetails from          './components/dashboard/contacts/ContactDetails';
import AddFile from                 './components/dashboard/files/AddFile';
import AddContact from              './components/dashboard/contacts/AddContact';
import AuthService from             './components/auth/auth-service';
import Login from                   './components/auth/Login';
import ProtectedRoute from  './components/auth/protected-route';
import EditContact from './components/dashboard/contacts/EditContact';

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }
  
  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser= (userObj) => {
    console.log(`Logged in user is: ${this.state.loggedInUser}`)
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    {this.fetchUser()}
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <ProtectedRoute user={this.state.loggedInUser} path='/contacts/:id' component={ContactDetails} />
            <ProtectedRoute exact user={this.state.loggedInUser} path='/' component={Dashboard} />
            <ProtectedRoute exact user={this.state.loggedInUser} path='/files/new' component={AddFile}/> } />
            <ProtectedRoute user={this.state.loggedInUser} path='/contacts' component={ContactList} /> 
            <ProtectedRoute user={this.state.loggedInUser} path='/new' component={AddContact} />  
            <ProtectedRoute user={this.state.loggedInUser} path='/edit/:id' component={EditContact} />
            <ProtectedRoute user={this.state.loggedInUser} path='/remove/:id' component={EditContact} />  
            <ProtectedRoute user={this.state.loggedInUser} path='/profile/:id' component={ContactDetails} />  
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
            <Switch> 
              <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
              <Route exact path='/' render={() => <Login getUser={this.getTheUser}/>} component={Welcome}/>
              {/* <ProtectedRoute user={this.state.loggedInUser} path='/contacts/:id' component={ContactDetails} />
              <ProtectedRoute user={this.state.loggedInUser} path='/contacts' component={ContactList} /> */}
            </Switch>
        </div>
      );
    }
  }
}
export default App;
