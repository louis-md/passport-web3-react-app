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
                    <Browse />    
                    <ContactsFromUsers />
                    <ContactsFromOrganizations />
                </span>
                <span style={{width: '50%', float:"right"}}>
                    <FriendRequests />
                    <ContactList />
                    <Friends />   
                </span>
            </div>
        )
    }
}