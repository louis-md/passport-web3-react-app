import React, { Component } from 'react'
import FileList from './FileList'
import Browse from '../Browse'

export default class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    getFilesFromMembers = (organizationId) => {
        const graph = this.props.graph;
        const organizationObject = graph[3].map(organization => {
            if (organizationId === organization._id) {
                return organization
            }
        })
        if (organizationObject) {
            const filterNulls = organizationObject.filter(objects => {
                if (objects) return objects
            })
        return filterNulls[0].filesFromMembers;
        }
    }

    // getContactsFromPartners = (organizationId) => {
    //     const graph = this.props.graph;
    //     const listOfOrganizations = graph[3].map(organization => {
    //         if (organizationId === organization._id) {
    //             return organization
    //         }
    //     })
    //     return organizationObject.filesFromPartners;
    // }

    getFiles = (organizationId) => {
        const graph = this.props.graph;
        const organizationObject = graph[3].map(organization => {
            if (organizationId === organization._id) {
                return organization
            }
        })
        if (organizationObject) {
            const filterNulls = organizationObject.filter(objects => {
                if (objects) return objects
            })
        return filterNulls[0].files;        }
    }

    getTitle = (organizationId) => {
        const graph = this.props.graph;
        const organizationObject = graph[3].map(organization => {
            if (organizationId === organization._id) {
                return organization
            }
        })
        if (organizationObject) {
            const filterNulls = organizationObject.filter(objects => {
                if (objects) return objects
            })
        return filterNulls[0].title;
        }
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
                    {organization && this.getFiles(organization.organizationId) && (this.getFiles(organization.organizationId).length > 0) && <FileList graph={this.props.graph} files={this.getFiles(organization.organizationId)} title={`${this.getTitle(organization.organizationId)} shared:`}/>}
                    {organization && this.getFilesFromMembers(organization.organizationId) && (this.getFilesFromMembers(organization.organizationId).length > 0) && <FileList graph={this.props.graph} files={this.getFilesFromMembers(organization.organizationId)} title={`${this.getTitle(organization.organizationId)} members shared:`}/>}
                    {/* <FileList graph={this.props.graph} files={this.getFilesFromPartners(organization)} title=""/> */}
                    </div>}
                    </div>
                    )})
                    }
                </span>
                <span style={{width: '50%', float:"left"}}>
                    <div className="modal-dialog"><h1>Files</h1></div>
                    <Browse graph={this.props.graph}/>
                    <FileList buttons graph={this.props.graph} files={this.props.loggedInUser.files} title="Your files"/>  
                </span>
            </div>
        )
    }
}