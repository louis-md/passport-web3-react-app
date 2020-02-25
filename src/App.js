import React, { Component } from    'react';
import                              './App.css';
import { Switch, Route } from       'react-router-dom';
import Signup from                  './components/auth/Signup';
import Navbar from                  './components/navbar/Navbar';
import Welcome from                  './components/Welcome';
import Dashboard from               './components/dashboard/Dashboard';
import ContactList from               './components/dashboard/contacts/ContactList';
import ContactDetails from          './components/dashboard/contacts/ContactDetails';
import AddContact from               './components/dashboard/contacts/AddContact';
import AuthService from             './components/auth/auth-service';
import Login from                   './components/auth/Login';
import ProtectedRoute from './components/auth/protected-route';



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
            {/* <ProtectedRoute user={this.state.loggedInUser} path='/contacts/:id' component={ContactDetails} /> */}
            {/* <ProtectedRoute user={this.state.loggedInUser} path='/contacts' component={ContactList} />*/}
            <ProtectedRoute user={this.state.loggedInUser} path='/' component={Dashboard} /> 
            <Route exact path='/contacts' render={() => <Login getUser={this.getTheUser}/>} component={ContactList} /> 
            <Route exact path='/contacts/new' render={() => <Login getUser={this.getTheUser}/>} component={AddContact} />
            <Route user={this.state.loggedInUser} path='/contacts/:id' component={ContactDetails} />
            <Route user={this.state.loggedInUser} path='/user/profile' component={ContactDetails} />
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