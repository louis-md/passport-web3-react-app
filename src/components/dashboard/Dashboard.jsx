import React, { Component } from 'react'
import ContactList from './contacts/ContactList'
import FileList from './files/FileList'
import OrganizationList from './organizations/OrganizationList'
import Browse from './Browse'

export default class Dashboard extends Component {
    getUserOrganizations = () => {
        const userOrganizations = this.props.loggedInUser.organizations;
        const userOrganizationsId = userOrganizations.map(organization => {
            return organization.organizationId
          })
        return userOrganizationsId;
    }
    render() {
        return (
            <div>
                <Browse graph={this.props.graph}/>
                <span style={{width: '50%', float:"left"}}>
                <FileList files={this.props.loggedInUser.files} title="Your files" graph={this.props.graph}/>
                </span>
                <span style={{width: '50%', float:"right"}}>
                {this.props.graph && this.props.loggedInUser.organizations && <OrganizationList graph={this.props.graph} title="Your organizations" organizations={this.getUserOrganizations()}/>}
                <ContactList graph={this.props.graph} contacts={this.props.loggedInUser.contacts} title="Your contacts"/>
                </span>
            </div>
        )
    }
}
