import React, { Component } from 'react'
import ContactDetails from './ContactDetails'
import PublicContacts from './PublicContacts'
import ContactList from './ContactList'
import Browse from '../Browse'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <span style={{width: '50%', float:"left"}}>
                    {/* <ContactDetails /> */}
                </span>
                <span style={{width: '50%', float:"left"}}>
                    {/* <PublicContacts />     */}
                </span>
                <span style={{width: '50%', float:"left"}}>
                <Browse />    
                </span>
                <span style={{width: '50%', float:"right"}}>
                    <ContactList />
                </span>
            </div>
        )
    }
}