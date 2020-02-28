import React, { Component } from 'react'
import FilesFromContacts from './FilesFromContacts'
import FilesFromOrganizations from './FilesFromOrganizations'
import FileList from './FileList'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <span style={{width: '50%', float:"left"}}>
                    {/* <FilesFromContacts /> */}
                </span>
                <span style={{width: '50%', float:"left"}}>
                    {/* <FilesFromOrganizations />     */}
                </span>
                <span style={{width: '50%', float:"left"}}>
                    {/* <BrowseFiles />     */}
                </span>
                <span style={{width: '50%', float:"right"}}>
                    <FileList />
                </span>
            </div>
        )
    }
}