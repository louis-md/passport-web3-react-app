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
      organization: {},
      hasAccessToMyContacts: false,
      hasAccessToMyFiles: false,
      userIsMember: false,
    };
  }

  componentDidMount(){
    this.getSingleOrganization();
  }

  getSingleOrganization = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/organizations/${params.id}`, {withCredentials:true})
    .then( responseFromApi =>{
      const theOrganization = responseFromApi.data;
      if (theOrganization.members.includes(this.props.loggedInUser._id)) {
        this.setState({organization: theOrganization, userIsMember: true});
      } else {
        this.setState({organization: theOrganization, userIsMember: false});
      }
    })
    .catch((err)=>{
        console.log(err)
    })
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
    console.log(updatedOrganizations)
    axios.put(
      `http://localhost:5000/api/users/${userId}`,
      { organizations: updatedOrganizations},
      { withCredentials: true }
    )
    .then(() => {
      this.setState({hasAccessToMyContacts: !this.state.hasAccessToMyContacts})
    })
    .catch(error => console.log(error));
  }

  toggleShareFiles() {

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
        <span style={{width: '50%', float:"left"}}>
        <div className="modal-dialog"><h1>{this.state.organization.logo}{this.state.organization.title}</h1></div>
          <Browse />
         <FileList />
        <FilesFromUsers />
        <ContactsFromUsers />
        <FilesFromOrganizations />
        <ContactsFromOrganizations />
        </span>
        <span style={{width: '50%', float:"right"}}> 
        <MembershipRequests membershipRequests={this.state.organization.membershipRequests} members={this.state.organization.members} organization={this.state.organization._id} updateOrganization={() => this.getSingleOrganization}/>
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
                    <button className="btn btn-secondary btn-sm" onClick={this.toggleShareFiles}>Share files</button>
                    <span> </span>
                    <button className="btn btn-sm" style={{color: "white", background: "firebrick"}} onClick={this.leaveOrganization}>Leave organization</button>
                    <br/><br/><br/>
                    </div>}
                    { this.props.loggedInUser._id == this.state.organization.owner && <div>
                    <div><h4>Admin priviledges</h4></div><br/>
                    <Link to={`/edit/${this.state.organization._id}`}>
                    <button className="btn btn-secondary btn-sm">Edit organization profile</button><span> </span>
                    </Link><br/><br/>
                    <button className="btn btn-secondary btn-sm">Manage members list</button><span> </span>
                    <button className="btn btn-sm" style={{color: "white", background: "firebrick"}} onClick={this.deleteOrganization}>Delete organization</button>
                </div>}
                </div>
                </div>
                </div>
                </div>
                <Members members={this.state.organization.members}/>
                <Owner owner={this.state.organization.owner}/>
                <PartnershipRequests />
                <ContactList />
                <Partners />
            </span>
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