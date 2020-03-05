import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditContact from './EditContact';
// import AddTask from '../tasks/AddTask';


class ContactDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getSingleContact();
  }

  getSingleContact = () => {
    var contact;
    if (this.props.contact) {
      contact = this.props.contact
     } else {
      const { params } = this.props.match;
      contact = params.id;
     }
    axios.get(`http://localhost:5000/api/contacts/${contact}`, {withCredentials:true})
    .then( responseFromApi =>{
      const theContact = responseFromApi.data;
      this.setState(theContact);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  renderEditForm = () => {
    if(!this.state){
      this.getSingleContact();
    } else {
      return <EditContact theContact={this.state} getTheContact={this.getSingleContact} {...this.props} />
    }
  }

// DELETE PROJECT:
  deleteContact = () => {
    const contact = this.props.contact;
    axios.delete(`http://localhost:5000/api/contacts/${contact}`, {withCredentials:true})
    .then( () =>{
        this.props.history.push('/contacts'); // !!!         
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
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header p-4">
                    <h3 className="modal-title text-primary font-weight-bold">{this.state.firstName} {this.state.lastName}</h3>
                    {this.state.validatedEthAddresses && this.state.validatedEthAddresses.length > 0 && <div><span><img className="avatar" style={{width: '50px'}} src="https://c7.uihere.com/icons/272/575/804/confirm-826b3f9c92bc3fb1463cd5d406a82fec.png" alt="validated contact" /></span></div>}
                    <span><img className="avatar" style={{width: '50px'}} src={this.state.avatar} alt="profile picture" /></span>
                </div>
                <div className="form-group">
                  <br/><h5>Phone numbers</h5><br/>
                  <ul>{this.state.phoneNumbers && this.state.phoneNumbers.map((phoneNumber, index) => {return (<li key={index}>{phoneNumber}</li>)})}</ul>
                </div>
                <div>
                  <br/><h5>Emails</h5><br/>
                  <ul>{this.state.secondaryEmails && this.state.secondaryEmails.map((secondaryEmail, index) => {return (<li key={index}>{secondaryEmail}</li>)})}</ul>
                </div>
                {this.state.validatedEthAddresses && <div>
                  <br/><h5>Validated ethereum addresses</h5><br/>
                  <ul>{this.state.validatedEthAddresses.map((ethAddress, index) => {return (<li key={index}>
                    <img style={{ float: "left", verticalAlign: 'middle', width: '16px'}} src="https://c7.uihere.com/icons/272/575/804/confirm-826b3f9c92bc3fb1463cd5d406a82fec.png" alt="avatar"/>
                      <a href={`https://rinkeby.etherscan.io/address/${ethAddress}`} target="_blank">{ethAddress}</a>
                    </li>)})}
                  </ul>
                </div>}
                <div>
                  <br/><h5>Ethereum addresses</h5><br/>
                  <ul>{this.state.ethAddresses && this.state.ethAddresses.map((ethAddress, index) => {return (<li key={index}>{ethAddress}</li>)})}</ul>
                </div>
                 <br/><h5>Postal address</h5><br/>
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
                  <br/><h5>Social Accounts</h5><br/>
                  {this.state.socialAccounts && 
                    <ul>
                    {this.state.socialAccounts.googleId && <li>{this.state.socialAccounts.googleId}</li>}
                    {this.state.socialAccounts.facebookId && <li>{this.state.socialAccounts.facebookId}</li>}
                    {this.state.socialAccounts.twitterId && <li>{this.state.socialAccounts.twitterId}</li>}
                    {this.state.socialAccounts.githubId && <li>{this.state.socialAccounts.githubId}</li>}
                    {this.state.socialAccounts.asanaId && <li>{this.state.socialAccounts.asanaId}</li>}
                    </ul>
                    } 
                <br/>
                <div>
                    {/* todo : replacer this.props.loggedInUser.contacts.includes(this.props.contact) par graph[1].filter(contact => contact._id === this.props.contact)*/}
                    {this.state._id && 
                      <div>
                        <Link to={`/edit/${this.state._id}`}>
                          <button className="btn btn-secondary btn-sm">Edit contact</button>
                        </Link><span> </span>
                        {this.props.loggedInUser && this.state._id !== this.props.loggedInUser.profile && <button className="btn btn-secondary btn-sm" onClick={this.deleteContact}>Delete contact</button>}
                      </div>}
                </div>
                </div>
                </div>
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

export default ContactDetails;