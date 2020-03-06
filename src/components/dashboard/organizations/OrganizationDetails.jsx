import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditOrganization from './EditOrganization';
import Members from "./Members";
import FileList from "../files/FileList";
import ContactList from "../contacts/ContactList";
import MembershipRequests from "./MembershipRequests.jsx";
import PartnershipRequests from "./PartnershipRequests.jsx";
import FilesFromOrganizations from '../files/FilesFromOrganizations';
import FilesFromUsers from '../files/FilesFromUsers';
import ContactsFromUsers from '../contacts/ContactsFromUsers'
import ContactsFromOrganizations from '../contacts/ContactsFromOrganizations'
import Partners from './Partners'
import Browse from "../Browse"
import Owner from './Owner.jsx'


class OrganizationDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      organization: null,
      hasAccessToMyContacts: null,
      hasAccessToMyFiles: null,
      userIsMember: null,
    };
  }

  getSingleOrganization = () => {
    console.log("getting organization")
      const { params } = this.props.match;
      const organizationId = params.id;
      console.log(organizationId)
      const graph = this.props.graph;
      const currentOrganization = graph[3].filter(organization => {
        if (organizationId === organization._id) {
          return organization
        }
      })
      const updatedOrganization = currentOrganization[0];
      console.log(currentOrganization)
      if (updatedOrganization) {
        if (updatedOrganization.members.includes(this.props.loggedInUser._id)) {
          this.setState({organization: updatedOrganization, userIsMember: true});
        } else {
          this.setState({organization: updatedOrganization, userIsMember: false});
        }
      }
        
  }

  getUserPermissions = () => {
    const { params } = this.props.match;
    const userOrganizations = this.props.loggedInUser.organizations;
    const updatedPermissions = userOrganizations.map(organizations => {
      if (organizations.organizationId === params.id) {
        return organizations
      }
    })

    this.setState({
      hasAccessToMyContacts: updatedPermissions.hasAccessToMyContacts, 
      hasAccessToMyFiles: updatedPermissions.hasAccessToMyFiles})

  }
  
  toggleShareContacts = () => {
    const userId = this.props.loggedInUser._id;
    const userOrganizations = this.props.loggedInUser.organizations;
    const targetOrganization = this.state.organization._id;
    const updatedOrganizations = userOrganizations.map((organizations) => {
      if (organizations.organizationId === targetOrganization) {
        console.log("found the organization, now replacing permission")
        const updatedOrganization = {
          _id: organizations._id,
          organizationId: organizations.organizationId,
          hasAccessToMyContacts: !organizations.hasAccessToMyContacts,
          hasAccessToMyFiles: organizations.hasAccessToMyFiles
        }
        console.log(`new permission: ${JSON.stringify(updatedOrganization)}`)
        return updatedOrganization;
      }
    })

    if (this.state.hasAccessToMyContacts && this.props.loggedInUser.contacts) {
      const contactsToRemove = this.props.loggedInUser.contacts;
      const currentContacts = this.state.organization.contactsFromMembers;
      const updatedContacts = currentContacts.filter((contact) => {
        if (!contactsToRemove.includes(contact)) {
          return contact
        } else return
      })

      const updatePermissionsCall = axios.put(
        `http://localhost:5000/api/users/${userId}`,
        { organizations: updatedOrganizations},
        { withCredentials: true }
      );
  
      const updateContactsCall = axios.put(
        `http://localhost:5000/api/organizations/${targetOrganization}`,
        { contactsFromMembers: updatedContacts},
        { withCredentials: true }
      );
      console.log(`Stop sharing my contacts, removing ${contactsToRemove}. New array is: ${updatedContacts}`)
      Promise.all([updatePermissionsCall, updateContactsCall])
      .then(() => {
        this.setState({hasAccessToMyContacts: !this.state.hasAccessToMyContacts});
      })
      .catch(error => console.log(error));

    } else if (!this.state.hasAccessToMyContacts && this.props.loggedInUser.contacts) {
      const contactsToAdd = this.props.loggedInUser.contacts;
      const currentContacts = this.state.organization.contactsFromMembers;
      var updatedContacts;
      if (currentContacts) {
        console.log("coucou")
        updatedContacts = currentContacts.concat(contactsToAdd)
      } else {
        updatedContacts = contactsToAdd
      }
      console.log(`${currentContacts}`)

      const updatePermissionsCall = axios.put(
        `http://localhost:5000/api/users/${userId}`,
        { organizations: updatedOrganizations},
        { withCredentials: true }
      );
  
      const updateContactsCall = axios.put(
        `http://localhost:5000/api/organizations/${targetOrganization}`,
        { contactsFromMembers: updatedContacts},
        { withCredentials: true }
      );
      console.log(`Start sharing my contacts, adding ${contactsToAdd}. New array: ${updatedContacts}`)

      Promise.all([updatePermissionsCall, updateContactsCall])
      .then(() => {
        this.setState({hasAccessToMyContacts: !this.state.hasAccessToMyContacts});
      })
      .catch(error => console.log(error));

    } else {

      axios
      .put(
        `http://localhost:5000/api/users/${userId}`,
        { organizations: updatedOrganizations},
        { withCredentials: true }
      )
      .then(() => {
        this.setState({hasAccessToMyContacts: !this.state.hasAccessToMyContacts})
      })
      .catch(error => console.log(error));
    }

  }

  toggleShareFiles = () => {
    const userId = this.props.loggedInUser._id;
    const userOrganizations = this.props.loggedInUser.organizations;
    const targetOrganization = this.state.organization._id;
    const updatedOrganizations = userOrganizations.map((organizations) => {
      if (organizations.organizationId === targetOrganization) {
        const updatedOrganization = {
          _id: organizations._id,
          organizationId: organizations.organizationId,
          hasAccessToMyContacts: organizations.hasAccessToMyContacts,
          hasAccessToMyFiles: !organizations.hasAccessToMyFiles
        }
        return updatedOrganization;
      }
    })

    if (this.state.hasAccessToMyFiles && this.props.loggedInUser.files) {
      const filesToRemove = this.props.loggedInUser.files;
      const currentFiles = this.state.organization.filesFromMembers;
      const updatedFiles = currentFiles.filter((file) => {if (!filesToRemove.includes(file)) {
        return file
      }
      })

      const updatePermissionsCall = axios.put(
        `http://localhost:5000/api/users/${userId}`,
        { organizations: updatedOrganizations},
        { withCredentials: true }
      );
  
      const updateFilesCall = axios.put(
        `http://localhost:5000/api/organizations/${targetOrganization}`,
        { filesFromMembers: updatedFiles},
        { withCredentials: true }
      );
      console.log(`Stop sharing my files, removing ${filesToRemove}. New array is: ${updatedFiles}`)
      Promise.all([updatePermissionsCall, updateFilesCall])
      .then(() => {
        this.setState({hasAccessToMyFiles: !this.state.hasAccessToMyFiles});
      })
      .catch(error => console.log(error));

    } else if (!this.state.hasAccessToMyFiles && this.props.loggedInUser.files) {
      const filesToAdd = this.props.loggedInUser.files;
      const currentFiles = this.state.organization.filesFromMembers;
      const updatedFiles = currentFiles.concat(filesToAdd);

      const updatePermissionsCall = axios.put(
        `http://localhost:5000/api/users/${userId}`,
        { organizations: updatedOrganizations},
        { withCredentials: true }
      );
  
      const updateFilesCall = axios.put(
        `http://localhost:5000/api/organizations/${targetOrganization}`,
        { filesFromMembers: updatedFiles},
        { withCredentials: true }
      );
      console.log(`Start sharing my files, adding ${filesToAdd}. New array: ${updatedFiles}`)

      Promise.all([updatePermissionsCall, updateFilesCall])
      .then(() => {
        this.setState({hasAccessToMyFiles: !this.state.hasAccessToMyFiles});
      })
      .catch(error => console.log(error));

    } else {

      axios
      .put(
        `http://localhost:5000/api/users/${userId}`,
        { organizations: updatedOrganizations},
        { withCredentials: true }
      )
      .then(() => {
        this.setState({hasAccessToMyFiles: !this.state.hasAccessToMyFiles});
      })
      .catch(error => console.log(error));
    }
  }

  leaveOrganization = () => {

  }

  renderEditForm = () => {
    if(!this.state.organization){
      this.getSingleOrganization();
    } else {
      return <EditOrganization theOrganization={this.state.organization} getTheOrganization={this.getSingleOrganization} {...this.props} />
    }
  }

// DELETE ORGANIZATION:
  deleteOrganization = () => {
    const { params } = this.props.match;
    axios.delete(`http://localhost:5000/api/organizations/${params.id}`, {withCredentials:true})
    .then( () =>{
        this.props.history.push('/organizations'); // !!!         
    })
    .catch((err)=>{
        console.log(err)
    })
  }

//   renderAddTaskForm = () => {
//     if(!this.state.title){
//         this.getSingleProject();
//       } else {     
//                 // pass the project and method getSingleProject() as a props down to AddTask component
//         return <AddTask theProject={this.state} getTheProject={this.getSingleProject} />
//       }
//   }

// ownershipCheck = (project) => {
//   if(this.props.loggedInUser && project.owner == this.props.loggedInUser._id){
//     return (
//       <div>
//         <div>{this.renderEditForm()} </div>
//         <button onClick={() => this.deleteProject(this.state._id)}>Delete project</button>
//       </div>
//     )
//   } 
// }

  render(){
    return(
      <div >
        {this.props.graph && !this.state.organization && this.props.loggedInUser && this.getSingleOrganization()}
        {this.props.loggedInUser && ((this.state.hasAccessToMyFiles === null) || (this.state.hasAccessToMyFiles === null))&& this.getUserPermissions()}
        {this.state.organization && <div>
        <span style={{width: '50%', float:"left"}}>
        <div className="modal-dialog"><img className="avatar" style={{ verticalAlign: 'middle', width: '60px', float:"left", margin:"0 8px 0 0"}} src={this.state.organization.logo && this.state.organization.logo} alt="avatar"/><span><h1>{this.state.organization.title}</h1></span></div>

        {this.state.organization && this.props.loggedInUser && this.state.organization.members && this.state.organization.members.includes(this.props.loggedInUser._id) && <div>
        <Browse graph={this.props.graph}/>
        <FileList graph={this.props.graph} files={this.state.organization.files} title={`${this.state.organization.title} Files`}/>
        <FileList graph={this.props.graph} files={this.state.organization.filesFromMembers} title={`Files shared by ${this.state.organization.title} members`}/>
        {/* <FileList graph={this.props.graph} files={this.state.organization.filesFromPartners} title={`Files shared by ${this.state.organization.title} partners`}/> */}
        <ContactList graph={this.props.graph} contacts={this.state.organization.contacts} title={`${this.state.organization.title} contacts`}/>
        <ContactList graph={this.props.graph} contacts={this.state.organization.contactsFromMembers} title={`Contacts shared by ${this.state.organization.title} members`}/>
        {/* <ContactList graph={this.props.graph} contacts={this.state.organization.contactsFromPartners} title={`Contacts shared by ${this.state.organization.title} partners`}/> */}
        </div>}
        </span>
        <span style={{width: '50%', float:"right"}}>
        {this.state.organization && this.props.loggedInUser && this.state.organization.members && this.state.organization.members.includes(this.props.loggedInUser._id) && <div> 
        <MembershipRequests membershipRequests={this.state.organization.membershipRequests} members={this.state.organization.members} organization={this.state.organization._id} updateOrganization={() => this.getSingleOrganization}/>
        </div>}
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header p-4">
                    <span><img className='avatar' style={{width: '30px'}} src={this.state.organization.logo} alt="profile picture" /></span>
                    <h5 className="modal-title text-primary font-weight-bold">{this.state.organization.title}</h5>
                </div>
                <div className="form-group">
                  <h2>Phone numbers</h2>
                  <ul>{this.state.organization.phoneNumbers && this.state.organization.phoneNumbers.map((phoneNumber, index) => {return (<li key={index}>{phoneNumber}</li>)})}</ul>
                </div>
                <div>
                  <h2>Emails</h2>
                  <ul>{this.state.organization.contactEmail && this.state.organization.contactEmail.map((contactEmail, index) => {return (<li key={index}>{contactEmail}</li>)})}</ul>
                </div>
                <div>
                  <h2>Ethereum address</h2>
                  <ul>{this.state.organization.ethAddresses && this.state.organization.ethAddresses.map((ethAddress, index) => {return (<li key={index}>{ethAddress}</li>)})}</ul>
                </div>
                 <h2>Postal address</h2>
                  {this.state.organization.postalAddresses && this.state.organization.postalAddresses.map((postalAddress, index) => {return (
                    <ul>
                      {postalAddress.streetNumber && <li key={index}>{postalAddress.streetNumber}</li>}
                      {postalAddress.special && <li key={index}>{postalAddress.special}</li>}
                      {postalAddress.streetName && <li key={index}>{postalAddress.streetName}</li>}
                      {postalAddress.city && <li key={index}>{postalAddress.city}</li>}
                      {postalAddress.postCode && <li key={index}>{postalAddress.postCode}</li>}
                      {postalAddress.country && <li key={index}>{postalAddress.country}</li>}
                      {postalAddress.principalResidency && <li key={index}>{postalAddress.principalResidency}</li>}
                    </ul>
                    )})}
                <div>
                  <h2>Social Links</h2>
                  {this.state.organization.socialLinks && 
                    <ul>
                    {this.state.organization.socialLinks.googleId && <li>{this.state.organization.socialLinks.googleId}</li>}
                    {this.state.organization.socialLinks.facebookId && <li>{this.state.organization.socialLinks.facebookId}</li>}
                    {this.state.organization.socialLinks.twitterId && <li>{this.state.organization.socialLinks.twitterId}</li>}
                    {this.state.organization.socialLinks.githubId && <li>{this.state.organization.socialLinks.githubId}</li>}
                    {this.state.organization.socialLinks.asanaId && <li>{this.state.organization.socialLinks.asanaId}</li>}
                    </ul>
                    } 
                <div>
                    <br/>
                    {!this.state.userIsMember &&
                    <Link to={`/join/${this.state.organization._id}`}>
                    <button className="btn btn-secondary btn-sm">Join organization</button>
                    </Link>}
                    <span> </span>
                    {this.state.userIsMember && <div>
                    {this.state.hasAccessToMyContacts && <button className="btn btn-sm" style={{color: "white", background: "firebrick"}} onClick={this.toggleShareContacts}>Stop sharing contacts</button>}
                    {!this.state.hasAccessToMyContacts && <button className="btn btn-secondary btn-sm" onClick={this.toggleShareContacts}>Share contacts</button>}
                    <span> </span>
                    {this.state.hasAccessToMyFiles && <button className="btn btn-sm" style={{color: "white", background: "firebrick"}} onClick={this.toggleShareFiles}>Stop sharing files</button>}
                    {!this.state.hasAccessToMyFiles && <button className="btn btn-secondary btn-sm" onClick={this.toggleShareFiles}>Share files</button>}<span> </span><br/><br/>
                    <button className="btn btn-sm" style={{color: "white", background: "firebrick"}} onClick={this.leaveOrganization}>Leave organization</button>
                    <br/><br/><br/>
                    </div>}
                    { this.props.loggedInUser._id == this.state.organization.owner && <div>
                    <div><h4>Admin priviledges</h4></div><br/>
                    <Link to={`/organizations/edit/${this.state.organization._id}`}>
                    <button className="btn btn-secondary btn-sm">Edit organization</button><span> </span>
                    </Link>
                    <button className="btn btn-secondary btn-sm">Manage members list</button><span> </span><br/><br/>
                    <button className="btn btn-sm" style={{color: "white", background: "firebrick"}} onClick={this.deleteOrganization}>Delete organization</button>
                </div>}
                </div>
                </div>
                </div>
                </div>
                <Members loggedInUser={this.props.loggedInUser} members={this.state.organization.members}/>
                {this.state.organization && this.props.loggedInUser && this.state.organization.members && this.state.organization.members.includes(this.props.loggedInUser._id) && <div>
                <Owner owner={this.state.organization.owner}/>
                <PartnershipRequests />
                </div>}
                <Partners />
            </span>
            </div>}
          </div>

    //   <div>
    //     <h1>{this.state.title}</h1>
    //     <p>{this.state.description}</p>
    //     <div >
    //     {this.ownershipCheck(this.state)}
    //     </div>
    //     {/* show the task heading only if there are tasks */}
    //     { this.state.tasks && this.state.tasks.length > 0 && <h3>Tasks </h3> }
    //     {/* map through the array of tasks and... */}
    //     { this.state.tasks && this.state.tasks.map((task, index) => {
    //         return(
    //             <div key={ index }>
    //             {/* ... make each task's title a link that goes to the task details page */}
    //                 <Link to={`/projects/${this.state._id}/tasks/${task._id}`}> 
    //                     { task.title }
    //                 </Link>
    //             </div>
    //         )
            
    //     }) }
    //     <div>{this.renderAddTaskForm()} </div>
    //     <br/><br/><br/><br/><br/>
    //     <Link to={'/projects'}>Back to projects</Link>
    //   </div>
    )
  }
}

export default OrganizationDetails;