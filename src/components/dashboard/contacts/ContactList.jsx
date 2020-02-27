import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ContactList extends Component {
  constructor(){
      super();
      this.state = { 
        listOfContacts: [],
     };
  }

  getAllContacts = () => {
    axios.get(`http://localhost:5000/api/contacts`, {withCredentials:true})
    .then(responseFromApi => {
      console.log(responseFromApi)
      this.setState({
        listOfContacts: responseFromApi.data
      })
    })
  }

  componentDidMount() {
    this.getAllContacts();
  }

  render(){
    return(
      <div className="big-container manage-products-wrapper">
        <h3 className="manage-products-title">Manage your contacts</h3>
        <div className="modal-dialog">
          <div className="modal-content">
            <table className="product-manage-table">
              <thead>
                <tr className="table-row">
                  <th className="table-head">Contact's avatar</th>
                  <th className="table-head">Last Name</th>
                  <th className="table-head">First name</th>
                </tr>
              </thead>
              <tbody>
                {/* {{#each contacts}} */}
                { this.state.listOfContacts.map(contacts => {
                  return (
                    <tr>
                      <td key={contacts._id}>
                        <Link to={`/contacts/${contacts._id}`}>
                          <h3 key={contacts._id}>{contacts.firstName}{contacts.lastName}</h3>
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
            <Link to={`/new`}>
              <button className="btn btn-secondary btn-sm">Create new contact</button>
            </Link>
          </div>
          <div style={{width: '60%', float:"left"}}>
        </div>
        <div style={{width: '40%', float:"right"}}>
            {/* <AddContact getData={() => this.getAllContacts()}/> */}
        </div>
          </div>
      </div>
    )
  }
}

export default ContactList;