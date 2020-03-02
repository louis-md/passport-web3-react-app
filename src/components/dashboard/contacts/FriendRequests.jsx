import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class FriendRequests extends Component {
  constructor(props){
      super(props);
  }

  render(){
    return(
      <div className="big-container manage-products-wrapper">
        <div className="modal-dialog">
          <div className="modal-content">
            <h3 className="manage-products-title">Friend requests<br/><br/></h3>
            <table className="product-manage-table">
              {/* <thead>
                <tr className="table-row">
                  <th className="table-head">Organization name</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead> */}
              <tbody>
                {/* {{#each files}} */}
                { this.props.members && this.props.members.map(member => {
                  return (
                    <tr>
                      <td key={member._id}>
                        <Link to={`/contacts/${member.profile}`}>
                          <h3 key={member._id}>{member.id}</h3>
                        </Link>
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
            <br/>
            <Link to={`/organizations/new`}>
              <span className="btn btn-secondary btn-sm">Invite new members</span>
            </Link>
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

export default FriendRequests;