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
import Partners from './organizations/Partners'
import Browse from "./Browse"
import OrganizationList from './organizations/OrganizationList';
import ContactDetails from './contacts/ContactDetails'
import FriendRequests from './contacts/FriendRequests'
// import web3 from "web3"


class UserDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      userProfile: null,
      metamaskConnected: null,
      activeMetamaskAddress: null,
      validatedAddress: null
    };
  }

  componentDidMount(){
    this.getSingleContact();
  }

  getSingleContact = () => {
    console.log("getting contact")
    const profile = this.props.loggedInUser.profile;
    console.log(profile)

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/contacts/${profile}`, {withCredentials:true})
    .then( responseFromApi =>{
      const theContact = responseFromApi.data;
      console.log(theContact)
      this.setState({userProfile: theContact});
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  connect = () => {
    window.ethereum.enable().then(res => {
      this.setState({
        metamaskConnected: true,
        activeMetamaskAddress: res[0]
      })
    }).catch();
  }

  confirmEthAddress = (metamaskResponse) => {
    const ethAddresses = this.state.userProfile.ethAddresses

    const ethAddressesToLowerCase = ethAddresses.map(ethAddress => {
      return ethAddress.toLowerCase()
    })

    if (metamaskResponse === null && ethAddressesToLowerCase.includes(this.state.activeMetamaskAddress)) {
      const userProfile = this.props.loggedInUser.profile;
      const newValidatedAddress = this.state.activeMetamaskAddress;
      const currentValidatedAddresses = this.props.loggedInUser.validatedEthAddresses;
      var updatedValidatedAddresses;
      if (currentValidatedAddresses && !currentValidatedAddresses.includes(newValidatedAddress)) {
          updatedValidatedAddresses = currentValidatedAddresses.push(newValidatedAddress)
      } else updatedValidatedAddresses = newValidatedAddress;

      axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/api/contacts/${userProfile}`, {validatedEthAddresses: updatedValidatedAddresses}, {withCredentials:true})
      .then( () => {
        this.setState({
          validatedAddress: true
        });
        window.location.reload()
      })
      .catch( error => console.log(error) )
    }
  }

  signMessage = () => {
    window.web3.personal.sign(window.web3.fromUtf8("Please sign this message to confirm Eth address. We do not get access to your private keys. Passport web3 team"), window.web3.eth.coinbase, this.confirmEthAddress)
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
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/organizations/${params.id}`, {withCredentials:true})
    .then( () =>{
        window.location.assign('/organizations');        
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
        <FriendRequests />
        <ContactList buttons graph={this.props.graph} contacts="" title="Your friends"/>        </span>
        <span style={{width: '50%', float:"right"}}> 
        <ContactDetails contact={this.props.loggedInUser.profile} />
        <div className="modal-dialog">
            <div className="modal-content">
                <div>
                    <br/>
                    {this.state.userProfile && (this.props.loggedInUser._id !== this.state.userProfile.owner) && <div> 
                    <Link to={`/join/${this.state._id}`}>
                    <button className="btn btn-secondary btn-sm">Become friends</button>
                    </Link>
                    <span> </span>
                    <Link to={`/join/${this.state._id}`}>
                    <button className="btn btn-secondary btn-sm">Invite to organisation</button>
                    </Link>
                    </div>}
                    {this.state.userProfile && (this.props.loggedInUser._id === this.state.userProfile.owner) && <div>
                    <h3>Eth address validator</h3><br/>
                    <p>Connect to metamask and sign a message to validate your address. We do not get access to your funds nor private keys.</p>
                    {this.state.activeMetamaskAddress && 
                      <div><br/>
                        <span><img style={{width:"25px", float:"left"}} src="https://c7.uihere.com/icons/272/575/804/confirm-826b3f9c92bc3fb1463cd5d406a82fec.png"/></span>
                        <span><p style={{color: "limegreen", float:"left"}}> Connected to Metamask</p></span><br/><br/>
                        {this.state.validatedAddress && <div>
                          <span><img style={{width:"25px", float:"left"}} src="https://c7.uihere.com/icons/272/575/804/confirm-826b3f9c92bc3fb1463cd5d406a82fec.png"/></span>
                          <span><p style={{color: "limegreen", float:"left"}}> Successfully validated <br/>{this.state.activeMetamaskAddress}!</p></span><br/><br/><br/>
                        </div>}
                      </div>}
                    <br/>
                    <button className="btn btn-secondary btn-sm" onClick={this.connect}>Connect metamask</button><span> </span>
                    <button className="btn btn-secondary btn-sm" id="ethjsPersonalSignButton" onClick={this.signMessage} >Confirm ethereum address</button><span> </span>
                    </div>}
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