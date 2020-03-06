import React, { Component } from 'react'
import FilesFromUsers from './FilesFromUsers'
import FilesFromOrganizations from './FilesFromOrganizations'
import FileList from './FileList'
import Browse from '../Browse'


export default class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    getFilesFromMembers = (organizationId) => {
        const graph = this.props.graph;
        const organizationObject = graph[3].reduce(organization => {
            if (organizationId === organization._id) {
                return organization
            }
        })
        return organizationObject.filesFromMembers;
    }

    // getContactsFromPartners = (organizationId) => {
    //     const graph = this.props.graph;
    //     const listOfOrganizations = graph[3].reduce(organization => {
    //         if (organizationId === organization._id) {
    //             return organization
    //         }
    //     })
    //     return organizationObject.filesFromPartners;
    // }

    getFiles = (organizationId) => {
        const graph = this.props.graph;
        const organizationObject = graph[3].reduce(organization => {
            if (organizationId === organization._id) {
                return organization
            }
        })
        console.log(organizationObject)
            return organizationObject.files;
    }

    getTitle = (organizationId) => {
        const graph = this.props.graph;
        const organizationObject = graph[3].reduce(organization => {
            if (organizationId === organization._id) {
                return organization
            }
        })
        return organizationObject.title;
    }

    render() {
        return (
            <div>
                <span style={{width: '50%', float:"right"}}>
                    <br/><br/><br/><br/>
                    <div className="modal-dialog"><h3 className="manage-products-title">Files your friends shared:<br/><br/></h3></div>

                    <div className="modal-dialog"><h3 className="manage-products-title">Files your organizations shared:<br/><br/></h3></div>
                    {this.props.loggedInUser && this.props.graph && this.props.loggedInUser.organizations.map((organization) => {
                    return (
                    <div>{this.props.graph && this.props.loggedInUser && <div>
                    {organization.length && <FileList graph={this.props.graph} files={this.getFiles(organization)} title={`${this.getTitle(organization)} shared:`}/>}
                    {organization.length && <FileList graph={this.props.graph} files={this.getFilesFromMembers(organization)} title={`${this.getTitle(organization)} members shared:`}/>}
                    {/* <FileList graph={this.props.graph} files={this.getFilesFromPartners(organization)} title=""/> */}
                    </div>}
                    </div>
                    )})
                    }
                </span>
                <span style={{width: '50%', float:"left"}}>
                    <div className="modal-dialog"><h1>Files</h1></div>
                    <Browse graph={this.props.graph}/>
                    <FileList graph={this.props.graph} files={this.props.loggedInUser.files} title="Your files"/>  
                </span>
            </div>
        )
    }
}