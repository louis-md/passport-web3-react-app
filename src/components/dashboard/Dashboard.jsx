import React, { Component } from 'react'
import ContactList from './contacts/ContactList'
import FileList from './files/FileList'
import OrganizationList from './organizations/OrganizationList'
import Browse from './Browse'


export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Browse />    
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
