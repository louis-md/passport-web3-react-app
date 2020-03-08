import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddFields from "../contacts/AddFields";
import AddPostalAddresses from "../contacts/AddPostalAddresses";
import AddFile from "../files/AddFile";

class JoinOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetOrganization: "",
      currentMembershipRequests: "",
      fromId: "",
      message: ""
    };
  }

  componentDidMount(){
    this.getOrganization();
  }

  getOrganization = () => {
    const { params } = this.props.match;
    const fromId = this.props.loggedInUser._id;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/organizations/${params.id}`, {withCredentials:true})
    .then( responseFromApi => {
      const theOrganization = responseFromApi.data;
          this.setState({
            targetOrganization: theOrganization,
            currentMembershipRequests: theOrganization.membershipRequests,
            fromId: fromId,
            message: '',
          })
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const { params } = this.props.match;
    var targetOrganization = this.state.targetOrganization;
    const request = {
      fromId: this.state.fromId,
      message: this.state.message
    }
    const currentMembershipRequests = this.state.currentMembershipRequests;
    currentMembershipRequests.push(request);
    const userId = this.props.loggedInUser._id;
    var userOrganizations = this.props.loggedInUser.organizations;
    var userProfile = this.props.loggedInUser.profile
    const newOrganization = {organizationId: targetOrganization._id, hasAccessToMyContacts: false, hasAccessToMyFiles: false};
    if (userOrganizations) {
      userOrganizations.push(newOrganization);
    } else userOrganizations = newOrganization;
    console.log(`Joining organization, new permitted organizations: ${JSON.stringify(userOrganizations)}`)
    
    if (targetOrganization.contacts) {
      targetOrganization.contacts.push(userProfile);
    } else targetOrganization.contacts = userProfile;

    console.log(`updated contacts :${targetOrganization.contacts}`)

    const requestCall = axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/organizations/${params.id}`,
      { membershipRequests: currentMembershipRequests, contacts: targetOrganization.contacts},
      { withCredentials: true }
    );
    
    const shareProfileCall = axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`,
      { organizations: userOrganizations},
      { withCredentials: true }
    )
    
    Promise.all([requestCall, shareProfileCall])
      .then(() => {
        // this.props.getData();
        this.setState({
          currentMembershipRequests: "",
          fromId: "",
          message: ""
        });
        window.location.assign(`/organizations/${targetOrganization._id}`);
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header p-4">
            <h5 className="modal-title text-primary font-weight-bold">
              Join organization
            </h5>
          </div>
          <form
            onSubmit={this.handleFormSubmit}
            className="create-organization-form"
            encType="multipart/form-data"
          >
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="organization-description">Let {this.state.targetOrganization.title} know why you want to join them: <br/><br/></label>
                <textarea
                  id="organization-description"
                  type="text"
                  name="message"
                  className="form-control"
                  placeholder="I named both my kids after this organization."
                  value={this.state.message}
                  onChange={e => this.handleChange(e)}
                />
              </div>


              <button type="submit" className="btn btn-secondary btn-sm">
                Send membership request
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default JoinOrganization;
