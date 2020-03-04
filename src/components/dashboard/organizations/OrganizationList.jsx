import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class OrganizationList extends Component {
  constructor(props){
      super(props);
      this.state = { 
        listOfOrganizations: null,
     };
  }

  getOrganizations = () => {
    const organizationsId = this.props.organizations;
    console.log(organizationsId)
    const graph = this.props.graph;
    const listOfOrganizations = graph[3].filter(organization => {
      return organizationsId.includes(organization._id)
    })
    console.log(listOfOrganizations)
    this.setState({listOfOrganizations: listOfOrganizations});
  }

  // getAllOrganizations = () => {
  //   axios.get(`http://localhost:5000/api/organizations`, {withCredentials:true})
  //   .then(responseFromApi => {
  //     this.setState({
  //       listOfOrganizations: responseFromApi.data
  //     })
  //   })
  // }

  // componentDidMount() {
  //   this.getAllOrganizations();
  // }

  render(){
    return(
      <div className="big-container manage-products-wrapper">
        <div className="modal-dialog">
          <div className="modal-content">
            <h3 className="manage-products-title">{this.props.title}<br/><br/></h3>
            <table className="product-manage-table">
              {/* <thead>
                <tr className="table-row">
                  <th className="table-head">Organization name</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead> */}
              <tbody>
                {/* {{#each files}} */}
                {this.props.graph && !this.state.listOfOrganizations && this.getOrganizations()}
                {this.state.listOfOrganizations && this.state.listOfOrganizations.map(organization => {
                  return (
                    <tr>
                      <td key={organization._id}>
                      <span>
                        <Link to={`/organizations/${organization._id}`}>
                          <span style={{float:"left"}}><h3 key={organization._id}>{organization.title}</h3></span>
                        </Link>
                        <span style={{float:"right"}}>
                        <img className="avatar" style={{ verticalAlign: 'middle', width: '40px'}} src={organization.logo && organization.logo} alt="avatar"/>
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