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
                    <FileList graph={this.props.graph} files={this.props.loggedInUser.filesFromFriends} title="Your files"/>  
                </span>
                <span style={{width: '50%', float:"left"}}>
                    <div className="modal-dialog"><h1>Files</h1></div>
                    <Browse graph={this.props.graph}/>
                    <FileList graph={this.props.graph} files={this.props.loggedInUser.filesFromFriends} title="Files your friends shared with you"/>
                    <FileList graph={this.props.graph} files={this.props.loggedInUser.filesFromOrganizations} title="Files your organizations shared with you"/>
                </span>
            </div>
        )
    }
}