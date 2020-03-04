import React, { Component } from 'react'
import ContactDetails from './ContactDetails'
import Friends from './Friends'
import ContactList from './ContactList'
import Browse from '../Browse'
import FriendRequests from './FriendRequests'
import ContactsFromUsers from './ContactsFromUsers'
import ContactsFromOrganizations from './ContactsFromOrganizations'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <span style={{width: '50%', float:"left"}}>
                    <div className="modal-dialog"><h1>Contacts</h1></div>
                    <Browse graph={this.props.graph}/>    
                    <ContactList graph={this.props.graph} contacts={this.props.loggedInUser.contactsFromFriends} title="Contacts your friends shared with you"/>
                    <ContactList graph={this.props.graph} contacts={this.props.loggedInUser.contactsFromOrganizations} title="Contacts your organizations shared with you"/>
                </span>
                <span style={{width: '50%', float:"right"}}>
                    <FriendRequests />
                    <Friends />   
                    <ContactList graph={this.props.graph} contacts={this.props.loggedInUser.contacts} title="Your contacts"/>
                </span>
            </div>
        )
    }
}