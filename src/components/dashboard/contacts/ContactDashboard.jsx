import React, { Component } from 'react'
import ContactDetails from './ContactDetails'
import Friends from './Friends'
import ContactList from './ContactList'
import Browse from '../Browse'
import FriendRequests from './FriendRequests'
import ContactsFromUsers from './ContactsFromUsers'
import ContactsFromOrganizations from './ContactsFromOrganizations'

export default class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    getContactsFromMembers = (organizationId) => {
        const graph = this.props.graph;
        const organizationObject = graph[3].reduce(organization => {
            if (organizationId === organization._id) {
                return organization.contactsFromMembers
            }
        })
        return organizationObject.contactsFromMembers;
    }

    getContactsFromPartners = (organizationId) => {
        const graph = this.props.graph;
        const listOfOrganizations = graph[3].reduce(organization => {
            if (organizationId === organization._id) {
                return organization.contactsFromPartners
            }
        })
        // this.setState({listOfOrganizations: listOfOrganizations});
    }

    getContacts = (organizationId) => {
        const graph = this.props.graph;
        const organizationObject = graph[3].reduce(organization => {
            if (organizationId === organization._id) {
                return organization
            }
        })

        return organizationObject.contacts;
        // this.setState({listOfOrganizations: listOfOrganizations});
    }

    getTitle = (organizationId) => {
        const graph = this.props.graph;
        const organizationObject = graph[3].reduce(organization => {
            if (organizationId === organization._id) {
                return organization
            }
        })

        return organizationObject.title;
        // this.setState({listOfOrganizations: listOfOrganizations});
    }

    render() {
        return (
            <div>
                {/* {(this.state.listOfOrganizations !== null) && this.getOrganizations()} */}
                <span style={{width: '50%', float:"left"}}>
                    <div className="modal-dialog"><h1>Contacts</h1></div>
                    <Browse graph={this.props.graph}/>
                    <ContactList buttons graph={this.props.graph} contacts={this.props.loggedInUser.contacts} title="Your contacts"/>
                </span>
                <span style={{width: '50%', float:"right"}}>
                    <br/><br/><br/><br/>
                    <div className="modal-dialog"><h3 className="manage-products-title">Contacts your friends shared:<br/><br/></h3></div>
                    <div className="modal-dialog"><h3 className="manage-products-title">Contacts your organizations shared:<br/><br/></h3></div>
                    {this.props.loggedInUser && this.props.graph && this.props.loggedInUser.organizations.map((organization) => {
                    return (
                    <div>{this.props.graph && this.props.loggedInUser && <div>
                    <ContactList graph={this.props.graph} contacts={this.getContacts(organization)} title={`${this.getTitle(organization)} shared:`}/>
                    <ContactList graph={this.props.graph} contacts={this.getContactsFromMembers(organization)} title={`${this.getTitle(organization)} members shared:`}/>
                    {/* <ContactList graph={this.props.graph} contacts={this.getContactsFromPartners(organization)} title=""/> */}
                    </div>}
                    </div>
                    )})
                    }
                </span>
            </div>
        )
    }
}