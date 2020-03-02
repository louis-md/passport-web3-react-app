import React, { Component } from 'react'
import FilesFromUsers from './FilesFromUsers'
import FilesFromOrganizations from './FilesFromOrganizations'
import FileList from './FileList'
import Browse from '../Browse'


export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <span style={{width: '50%', float:"right"}}>
                    <FileList />  
                </span>
                <span style={{width: '50%', float:"left"}}>
                    <div className="modal-dialog"><h1>Files</h1></div>
                    <Browse />
                    <FilesFromUsers />
                    <FilesFromOrganizations />  
                </span>
            </div>
        )
    }
}