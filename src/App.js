import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Navbar from "./components/navbar/Navbar";
import Welcome from "./components/Welcome";
import Dashboard from "./components/dashboard/Dashboard";
import ContactDashboard from "./components/dashboard/contacts/ContactDashboard";
import ContactDetails from "./components/dashboard/contacts/ContactDetails";
import AddFile from "./components/dashboard/files/AddFile";
import AddContact from "./components/dashboard/contacts/AddContact";
import FileDashboard from "./components/dashboard/files/FileDashboard";
import AuthService from "./components/auth/auth-service";
import Login from "./components/auth/Login";
import ProtectedRoute from "./components/auth/protected-route";
import EditContact from "./components/dashboard/contacts/EditContact";
import axios from "axios";
import OrganizationDashboard from "./components/dashboard/organizations/OrganizationDashboard";
import CreateOrganization from "./components/dashboard/organizations/CreateOrganization";
import OrganizationDetails from "./components/dashboard/organizations/OrganizationDetails";
import JoinOrganization from './components/dashboard/organizations/JoinOrganization'
import UserDetails from "./components/dashboard/UserDetails";
import EditOrganization from "./components/dashboard/organizations/EditOrganization"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: null,
      loggedInUser: null,
      graph: null
    };
    this.service = new AuthService();
  }

  getGraph = () => {
      axios.get(`http://localhost:5000/api/graph`, {withCredentials:true})
      .then(responseFromApi => {
          this.setState({
          graph: responseFromApi.data
          })
      })
  }

  componentDidMount() {
  this.getGraph();
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response
          });
          const userProfile = response.profile;
          axios
            .get(`http://localhost:5000/api/contacts/${userProfile}`, {
              withCredentials: true
            })
            .then(responseFromApi => {
              const theContact = responseFromApi.data;
              this.setState({ userProfile: theContact });
            });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  getTheUser = userObj => {
    console.log(`Logged in user is: ${this.state.loggedInUser}`);
    this.setState({
      loggedInUser: userObj
    });
  };

  render() {
    {
      this.fetchUser();
    }
    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <Navbar
            userInSession={this.state.loggedInUser}
            getUser={this.getTheUser}
            userProfile={this.state.userProfile}
          />
          <Switch>
            <ProtectedRoute
              user={this.state.loggedInUser}
              path="/contacts/:id"
              component={ContactDetails}
              graph={this.state.graph}
              getGraph={this.getGraph}

            />
            <ProtectedRoute
              exact
              user={this.state.loggedInUser}
              path="/"
              component={Dashboard}
              graph={this.state.graph}
              getGraph={this.getGraph}
            />
            <ProtectedRoute
              exact
              user={this.state.loggedInUser}
              path="/organizations/new"
              component={CreateOrganization}
              graph={this.state.graph}
              getGraph={this.getGraph}

            />
            <ProtectedRoute
              exact
              user={this.state.loggedInUser}
              path="/organizations/edit/:id"
              component={EditOrganization}
              graph={this.state.graph}
              getGraph={this.getGraph}

            />
             <ProtectedRoute
              user={this.state.loggedInUser}
              path="/users/:id"
              component={UserDetails}
              graph={this.state.graph}
              getGraph={this.getGraph}

            />
            <ProtectedRoute
              user={this.state.loggedInUser}
              path="/join/:id"
              component={JoinOrganization}
              graph={this.state.graph}
              getGraph={this.getGraph}

            />
            <ProtectedRoute
              exact
              user={this.state.loggedInUser}
              path="/organizations/:id"
              component={OrganizationDetails}
              graph={this.state.graph}
              getGraph={this.getGraph}

            />
            <ProtectedRoute
              exact
              user={this.state.loggedInUser}
              path="/organizations/"
              component={OrganizationDashboard}
              graph={this.state.graph}
              getGraph={this.getGraph}

            />
            <ProtectedRoute
              exact
              user={this.state.loggedInUser}
              path="/files/new"
              component={AddFile}
              graph={this.state.graph}
              getGraph={this.getGraph}

            />
            <ProtectedRoute
              exact
              user={this.state.loggedInUser}
              path="/files/"
              component={FileDashboard}
              graph={this.state.graph}
              getGraph={this.getGraph}

            />
            <ProtectedRoute
              user={this.state.loggedInUser}
              path="/contacts"
              component={ContactDashboard}
              graph={this.state.graph}
              getGraph={this.getGraph}

            />
            <ProtectedRoute
              user={this.state.loggedInUser}
              path="/new"
              component={AddContact}
              graph={this.state.graph}
              getGraph={this.getGraph}

            />
            <ProtectedRoute
              user={this.state.loggedInUser}
              path="/edit/:id"
              component={EditContact}
              graph={this.state.graph}
              getGraph={this.getGraph}

            />
            {/* <ProtectedRoute
              user={this.state.loggedInUser}
              path="/remove/:id"
              component={EditContact}
              graph={this.state.graph}
              getGraph={this.getGraph}

            /> */}
            <ProtectedRoute
              user={this.state.loggedInUser}
              path="/profile/:id"
              component={ContactDetails}
              graph={this.state.graph}
              getGraph={this.getGraph}
            />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar
            userInSession={this.state.loggedInUser}
            getUser={this.getTheUser}
          />
          <Switch>
            <Route
              exact
              path="/signup"
              render={() => <Signup getUser={this.getTheUser} />}
            />
            <Route
              exact
              path="/"
              render={() => <Login getUser={this.getTheUser} />}
              component={Welcome}
            />
            {/* <ProtectedRoute user={this.state.loggedInUser} path='/contacts/:id' component={ContactDetails} />
              <ProtectedRoute user={this.state.loggedInUser} path='/contacts' component={ContactList} /> */}
          </Switch>
        </div>
      );
    }
  }
}
export default App;
