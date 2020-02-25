import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddContact from './AddContact'; // <== !!!

class ContactList extends Component {
  constructor(){
      super();
      this.state = { 
        listOfContacts: [],
     };
  }

  getAllContacts = () =>{
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
                    <div key={contacts._id}>
                      <Link to={`/contacts/${contacts._id}`}>
                        <h3>{contacts.firstName}{contacts.lastName}</h3>
                      </Link>
                    </div>
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
            <Link to={`/contacts/new`}>
              <span className="navbar-brand font-weight-bold">Create new contact</span>
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