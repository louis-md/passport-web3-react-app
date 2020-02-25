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
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/contacts/${params.id}`, {withCredentials:true})
    .then( responseFromApi =>{
      const theContact = responseFromApi.data;
      this.setState(theContact);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  renderEditForm = () => {
    if(!this.state.title){
      this.getSingleContact();
    } else {
    //                                                    {...props} => so we can have 'this.props.history' in Edit.js
    //                                                                                          ^
    //                                                                                          |
      return <EditContact theContact={this.state} getTheContact={this.getSingleContact} {...this.props} />
    }
  }

// DELETE PROJECT:
  deleteProject = () => {
    const { params } = this.props.match;
    axios.delete(`http://localhost:5000/api/projects/${params.id}`, {withCredentials:true})
    .then( () =>{
        this.props.history.push('/projects'); // !!!         
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
                    {/* <span><img style="width: 30px" src={this.state.avatar} alt="profile picture" /></span> */}
                    <h5 className="modal-title text-primary font-weight-bold">{this.state.firstName}{this.state.lastName}</h5>
                </div>
            <div className="form-group">

        <h2>Phone numbers</h2>
            <ul>
                {/* {{#each this.state.phoneNumbers}}
                <li>{{this}}</li>
                {{/each}} */}
            </ul>
            </div>
            <div>
            <h2>Emails</h2>
            <ul>
                {/* {{#each this.state.secondaryEmails}}
                <li>{{this}}</li>
                {{/each}} */}
            </ul>
            </div>
            <div>
            <h2>Ethereum address</h2>
            <ul>
                {/* {{#each this.state.ethAddresses}}
                <li>{{this}}</li>
                {{/each}} */}
            </ul>
            </div>
            <h2>Postal address</h2>
            <ul>
            {/* {{#each this.state.postalAddresses}} */}
            <li>
                {/* {{#if this.principalResidency }}
                <h4>Principal Residency</h4> <br>
                {{else}}
                <h4>Secondary Residency </h4><br>
                {{/if}}
                {{this.streetNumber}} {{this.special}} {{this.streetName}} <br>
                {{this.postCode}}   {{this.city}} <br>
                {{this.country}} */}
            </li>
            {/* {{/each}} */}
            </ul>
            <div>
            <h2>Social Accounts</h2>
            <ul>
                {/* <li>Google : {this.state.socialAccounts.googleId}</li>
                <li>Twitter : {this.state.socialAccounts.twitterId}</li>
                <li>Facebook : {this.state.socialAccounts.facebookId}</li>
                <li>GitHub : {this.state.socialAccounts.githubId}</li> */}
            </ul>
            <div>
                {/* <button className="btn btn-secondary btn-sm"><a href="/contacts/contact-edit/{{contact._id}}" style="color:white">Update contact</a></button>
                <button className="btn btn-secondary btn-sm"><a href="/contacts/contact-delete/{{contact._id}}" style="color:white">Delete contact</a></button> */}
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