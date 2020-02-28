import React, { Component } from 'react'
import ContactList from './contacts/ContactList'
import FileList from './files/FileList'
import OrganizationList from './organizations/OrganizationList'


export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <span style={{width: '50%', float:"left"}}>
                <ContactList />    
                </span>
                <span style={{width: '50%', float:"right"}}>
                <FileList />
                <OrganizationList />    
                </span>
            </div>
        )
    }
}
