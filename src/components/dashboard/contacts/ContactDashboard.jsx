import React, { Component } from 'react'
import ContactDetails from './ContactDetails'
import Friends from './Friends'
import ContactList from './ContactList'
import Browse from '../Browse'
import FriendRequests from './FriendRequests'

export default class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    getContactsFromMembers = (organizationId) => {

        const graph = this.props.graph;
        const organizationObject = graph[3].map(organization => {
            if (organizationId === organization._id) {
                return organization
            } else return null
        })

        if (organizationObject) {
            const filterNulls = organizationObject.filter(objects => {
                if (objects) return objects
            })
        return filterNulls[0].contactsFromMembers;
        }
    }

    // getContactsFromPartners = (organizationId) => {
    //     const graph = this.props.graph;
    //     const listOfOrganizations = graph[3].reduce(organization => {
    //         if (organizationId === organization._id) {
    //             return organization.contactsFromPartners
    //         }
    //     })
    //     // this.setState({listOfOrganizations: listOfOrganizations});
    // }

    getContacts = (organizationId) => {
        const graph = this.props.graph;
        const organizationObject = graph[3].map(organization => {
            if (organizationId === organization._id) {
                return organization
            } else return null
        })

        if (organizationObject) {
            const filterNulls = organizationObject.filter(objects => {
                if (objects) return objects
            })
        return filterNulls[0].contacts;
        }
    }

    getTitle = (organizationId) => {
        const graph = this.props.graph;
        const organizationObject = graph[3].map(organization => {
            if (organizationId === organization._id) {
                console.log(organization)
                return organization
            } else return null
        })
        if (organizationObject) {

            const filterNulls = organizationObject.filter(objects => {
                if (objects) return objects
            })
        return filterNulls[0].title;        }
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
                    {organization && this.getContacts(organization.organizationId) && <ContactList graph={this.props.graph} contacts={this.getContacts(organization.organizationId)} title={`${this.getTitle(organization.organizationId)} shared:`}/>}
                    {organization && this.getContactsFromMembers(organization.organizationId) && <ContactList graph={this.props.graph} contacts={this.getContactsFromMembers(organization.organizationId)} title={`${this.getTitle(organization.organizationId)} members shared:`}/>}
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