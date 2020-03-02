import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class OrganizationList extends Component {
  constructor(){
      super();
      this.state = { 
        listOfOrganizations: [],
     };
  }

  getAllOrganizations = () => {
    axios.get(`http://localhost:5000/api/organizations`, {withCredentials:true})
    .then(responseFromApi => {
      console.log(responseFromApi)
      this.setState({
        listOfOrganizations: responseFromApi.data
      })
    })
  }

  componentDidMount() {
    this.getAllOrganizations();
  }

  render(){
    return(
      <div className="big-container manage-products-wrapper">
        <div className="modal-dialog">
          <div className="modal-content">
            <h3 className="manage-products-title">Your organizations<br/><br/></h3>
            <table className="product-manage-table">
              {/* <thead>
                <tr className="table-row">
                  <th className="table-head">Organization name</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead> */}
              <tbody>
                {/* {{#each files}} */}
                { this.state.listOfOrganizations.map(organization => {
                  return (
                    <tr>
                      <td key={organization._id}>
                      <span>
                        <Link to={`/organizations/${organization._id}`}>
                          <span style={{float:"left"}}><h3 key={organization._id}>{organization.title}</h3></span>
                        </Link>
                        <span style={{float:"right"}}>
                          {organization.logo}
                        </span>
                        </span>
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
              <span className="btn btn-secondary btn-sm">Create organization</span>
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

export default OrganizationList;