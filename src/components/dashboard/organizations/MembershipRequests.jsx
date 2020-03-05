import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class MembershipRequests extends Component {
  constructor(props){
      super(props);
      this.state = {
        activeRequests: []
      }
  }

  acceptRequest = (request) => {
    const currentMembershipRequests = this.props.membershipRequests;
    const newMembershipRequests = currentMembershipRequests.filter((req) => {return req !== request});
    var newMembers = this.props.members;
    if (newMembers.length) {
      newMembers.push(request.fromId);
    } else newMembers = request.fromId;
    const organization = this.props.organization;
    
    axios
      .put(
        `http://localhost:5000/api/organizations/${organization}`,
        { membershipRequests: newMembershipRequests, members: newMembers},
        { withCredentials: true }
      )
      .then(this.props.updateOrganization())
      .catch(error => console.log(error));
  }

  rejectRequest(request) {
    const currentMembershipRequests = this.props.membershipRequests
    const newMembershipRequests = currentMembershipRequests.filter((req) => {return req !== request});
    const organization = this.props.organization;

    axios
      .put(
        `http://localhost:5000/api/organizations/${organization}`,
        { membershipRequests: newMembershipRequests},
        { withCredentials: true }
      )
      .then(this.props.updateOrganization())
      .catch(error => console.log(error));
  }

  render(){
    return(
      <div className="big-container manage-products-wrapper">
        <div className="modal-dialog">
          <div className="modal-content">
            <h3 className="manage-products-title">Membership requests<br/><br/></h3>
            <table className="product-manage-table">
              {/* <thead>
                <tr className="table-row">
                  <th className="table-head">Organization name</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead> */}
              <tbody>
                {/* {{#each files}} */}
                {this.props.membershipRequests && this.props.membershipRequests.map(membershipRequest => {
                  return (
                    <tr>
                      <td key={membershipRequest._id}>
                      <span style={{float:'left'}}>
                        <Link to={`/users/${membershipRequest._id}`}>
                          <h4>User {membershipRequest._id}</h4>
                        </Link>
                        <p>{membershipRequest.message}</p>

                        </span>
                        <span style={{float: "right"}} className="btn btn-secondary btn-sm" onClick={() => {this.rejectRequest(membershipRequest)}}>Reject</span><span>  </span>
                        <span style={{float: "right"}} className="btn btn-secondary btn-sm" onClick={() => {this.acceptRequest(membershipRequest)}}>Accept</span><span>  </span>
                      </td>
                    </tr>
                  )})
                }
                <tr className="table-row">
                  {/* {{> contactRow}} */}
                </tr>
                {/* {{/each}}
                {{#unless contacts}} */}
                {/* <tr>
                  <td colspan="4">sorry no contacts yet</td>
                </tr> */}
                {/* {{/unless}} */}
              </tbody>
            </table>
          </div>
          <div style={{width: '60%', float:"left"}}>
        </div>
        <div style={{width: '40%', float:"right"}}>
            {/* <AddContact getData={() => this.getAllContacts()}/> */}
        </div>
          </div>
        <script src="https://media-library.cloudinary.com/global/all.js"></script>  
      </div>
    )
  }
}

export default MembershipRequests;