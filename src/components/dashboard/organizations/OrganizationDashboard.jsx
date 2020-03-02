import React, { Component } from 'react'
import OrganizationList from './OrganizationList'
import Browse from '../Browse'
import PublicOrganizations from "./PublicOrganizations"
import Invitations from "../contacts/Invtitations"

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <span style={{width: '50%', float:"left"}}>
                <div className="modal-dialog"><h1>Organizations</h1></div>
                <Browse />  
                <PublicOrganizations />      
                </span>
                <span style={{width: '50%', float:"right"}}>
                <Invitations />
                <OrganizationList />    
                </span>
            </div>
        )
    }
}