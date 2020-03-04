import React, { Component } from 'react'
import OrganizationList from './OrganizationList'
import Browse from '../Browse'
import PublicOrganizations from "./PublicOrganizations"
import Invitations from "../contacts/Invtitations"

export default class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    getPublicOrganizations = () => {
        const graph = this.props.graph;
        const listOfOrganizations = graph[3].map(organization => {
          return organization._id
        })
        return listOfOrganizations;
    }

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
                <span style={{width: '50%', float:"left"}}>
                <div className="modal-dialog"><h1>Organizations</h1></div>
                <Browse graph={this.props.graph}/>  
                {this.props.graph && <OrganizationList graph={this.props.graph} title="Browse public organizations" organizations={this.getPublicOrganizations()}/>}      
                </span>
                <span style={{width: '50%', float:"right"}}>
                <Invitations />
                {this.props.graph && <OrganizationList graph={this.props.graph} title="Your organizations" organizations={this.getUserOrganizations()}/>    }
                </span>
            </div>
        )
    }
}