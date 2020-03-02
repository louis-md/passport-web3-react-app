import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditOrganization from './organizations/EditOrganization';
import Members from "./organizations/Members";
import Friends from './contacts/Friends'
import FileList from "./files/FileList";
import ContactList from "./contacts/ContactList";
import MembershipRequests from "./organizations/MembershipRequests.jsx";
import PartnershipRequests from "./organizations/PartnershipRequests.jsx";
import FilesFromOrganizations from './files/FilesFromOrganizations';
import FilesFromUsers from './files/FilesFromUsers';
import ContactsFromUsers from './contacts/ContactsFromUsers'
import ContactsFromOrganizations from './contacts/ContactsFromOrganizations'
import Partners from './organizations/Partners'
import Browse from "./Browse"
import OrganizationList from './organizations/OrganizationList';


class UserDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getSingleOrganization();
  }

  getSingleOrganization = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/organizations/${params.id}`, {withCredentials:true})
    .then( responseFromApi =>{
      const theOrganization = responseFromApi.data;
      this.setState(theOrganization);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  renderEditForm = () => {
    if(!this.state){
      this.getSingleOrganization();
    } else {
      return <EditOrganization theOrganization={this.state} getTheOrganization={this.getSingleOrganization} {...this.props} />
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
        <div className="modal-dialog"><h1>User details</h1></div>
        <OrganizationList />
        <Friends />
        </span>
        <span style={{width: '50%', float:"right"}}> 
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header p-4">
                    <span><img className='avatar' style={{width: '30px'}} src={this.state.logo} alt="profile picture" /></span>
                    <h5 className="modal-title text-primary font-weight-bold">{this.state.title}</h5>
                </div>
                <div className="form-group">
                  <h2>Phone numbers</h2>
                  <ul>{this.state.phoneNumbers && this.state.phoneNumbers.map((phoneNumber, index) => {return (<li key={index}>{phoneNumber}</li>)})}</ul>
                </div>
                <div>
                  <h2>Emails</h2>
                  <ul>{this.state.contactEmail && this.state.contactEmail.map((contactEmail, index) => {return (<li key={index}>{contactEmail}</li>)})}</ul>
                </div>
                <div>
                  <h2>Ethereum address</h2>
                  <ul>{this.state.ethAddresses && this.state.ethAddresses.map((ethAddress, index) => {return (<li key={index}>{ethAddress}</li>)})}</ul>
                </div>
                 <h2>Postal address</h2>
                  {this.state.postalAddresses && this.state.postalAddresses.map((postalAddress, index) => {return (
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
                  {this.state.socialLinks && 
                    <ul>
                    {this.state.socialLinks.googleId && <li>{this.state.socialLinks.googleId}</li>}
                    {this.state.socialLinks.facebookId && <li>{this.state.socialLinks.facebookId}</li>}
                    {this.state.socialLinks.twitterId && <li>{this.state.socialLinks.twitterId}</li>}
                    {this.state.socialLinks.githubId && <li>{this.state.socialLinks.githubId}</li>}
                    {this.state.socialLinks.asanaId && <li>{this.state.socialLinks.asanaId}</li>}
                    </ul>
                    } 
                <div>
                    <br/>
                    <Link to={`/join/${this.state._id}`}>
                    <button className="btn btn-secondary btn-sm">Become friends</button>
                    </Link>
                    <span> </span>
                    <Link to={`/join/${this.state._id}`}>
                    <button className="btn btn-secondary btn-sm">Invite to organisation</button>
                    </Link>
                    <br/><br/><br/>
                    { this.props.loggedInUser._id == this.state.owner && <div>
                    <div><h4>Admin priviledges</h4></div><br/>
                    <Link to={`/edit/${this.state._id}`}>
                    <button className="btn btn-secondary btn-sm">Edit organization profile</button><span> </span>
                    </Link>
                    <button className="btn btn-sm" style={{color: "white", background: "firebrick"}} onClick={this.deleteOrganization}>Delete organization</button>
                </div>}
                </div>
                </div>
                </div>
                </div>
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

export default UserDetails;