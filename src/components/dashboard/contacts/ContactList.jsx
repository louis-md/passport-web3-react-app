import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ContactList extends Component {
  constructor(props){
      super(props);
      this.state = {
        listOfContacts: null
      }
  }

  getContacts = () => {
    const contactList = this.props.contacts;
    const graph = this.props.graph;
    const contactObjects = graph[1].filter(contact => {
      return contactList.includes(contact._id)
    })
    
    this.setState({listOfContacts: contactObjects});
  }

  render(){
    return(
      <div className="big-container manage-products-wrapper">
        <div className="modal-dialog">
          <div className="modal-content">
            <h3 className="manage-products-title">{this.props.title && this.props.title}<br/><br/></h3>
            <table className="product-manage-table">
              <thead>
                {/* <tr className="table-row">
                  <th className="table-head">Contact's avatar</th>
                  <th className="table-head">Last Name</th>
                  <th className="table-head">First name</th>
                </tr> */}
              </thead>
              <tbody>
                {/* {{#each contacts}} */}
                {this.props.graph && !this.state.listOfContacts && this.getContacts()}
                {this.state.listOfContacts && this.state.listOfContacts.map(contact => {

                  return (
                    <tr>
                      <td key={contact._id}>
                      <div style={{margin: "5px 0 0 0"}}>
                        <Link to={`/contacts/${contact._id}`}>
                          <h3  key={contact._id}>{contact.firstName} {contact.lastName}</h3>
                        </Link>
                        </div>
                      </td>
                      <td>
                        {(contact.validatedEthAddresses.length > 0) && <img style={{ float: "left", verticalAlign: 'middle', width: '36px'}} src="https://c7.uihere.com/icons/272/575/804/confirm-826b3f9c92bc3fb1463cd5d406a82fec.png" alt="avatar"/>}
                        <img className="avatar" style={{ verticalAlign: 'bottom', width: '32px'}} src={contact.avatar && contact.avatar} alt="avatar"/>
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
            {this.props.buttons && 
            <div>
            <span> 
            <Link to={`/new/`}>
              <button className="btn btn-secondary btn-sm">Create new contact</button>
            </Link>
            <span> </span>
            <Link to={`/import/`}>
              <button className="btn btn-secondary btn-sm">Import contacts</button>
            </Link>
            </span>
            </div>}
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