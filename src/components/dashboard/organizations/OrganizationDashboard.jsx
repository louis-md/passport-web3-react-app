import React, { Component } from 'react'
import PublicOrganizations from './PublicOrganizations'
import OrganizationList from './OrganizationList'
import Browse from '../Browse'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <span style={{width: '50%', float:"left"}}>
                {/* <PublicOrganizations />     */}
                </span>
                <span style={{width: '50%', float:"left"}}>
                <Browse />    
                </span>
                <span style={{width: '50%', float:"right"}}>
                <OrganizationList />    
                </span>
            </div>
        )
    }
}