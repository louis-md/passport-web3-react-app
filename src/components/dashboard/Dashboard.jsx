import React, { Component } from 'react'
import ContactList from './contacts/ContactList'
import FileList from './files/FileList'
import OrganizationList from './organizations/OrganizationList'
import Browse from './Browse'


export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Browse graph={this.props.graph}/>
                <span style={{width: '50%', float:"left"}}>
                <FileList files={this.props.loggedInUser.files} title="Your files" graph={this.props.graph}/>
                </span>
                <span style={{width: '50%', float:"right"}}>
                {this.props.graph && <OrganizationList graph={this.props.graph} title="Your organizations" organizations={this.props.loggedInUser.organizations}/>}
                <ContactList graph={this.props.graph} contacts={this.props.loggedInUser.contacts} title="Your contacts"/>
                </span>
            </div>
        )
    }
}
