import React, { Component } from 'react';
import axios from 'axios';
import AddFields from './AddFields'
import AddPostalAddresses from './AddPostalAddresses';
import AddFile from './../files/AddFile'

class EditContact extends Component {
  constructor(props){
    super(props);
    this.state = {
        firstName:'',
        lastName: '',
        bio: '',
        secondaryEmails: [],
        phoneNumbers: [],
        ethAddresses: [],
        postalAddresses: [],
        socialAccounts: {},
        avatar: "",
    };
  }
  
  componentDidMount(){
    this.getSingleContact();
  }

  getSingleContact = () => {
    const { params } = this.props.match;
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/contacts/${params.id}`, {withCredentials:true})
    .then( responseFromApi => {
      const theContact = responseFromApi.data;
      console.log(theContact)
      if (theContact.socialAccounts) {
        const googleId = theContact.socialAccounts.googleId;
        const facebookId = theContact.socialAccounts.facebookId;
        const twitterId = theContact.socialAccounts.twitterId;
        const githubId = theContact.socialAccounts.githubId;
        const asanaId = theContact.socialAccounts.asanaId;
          this.setState({
            avatar: theContact.avatar,
            firstName: theContact.firstName,
            lastName: theContact.lastName,
            bio: theContact.bio,
            secondaryEmails: theContact.secondaryEmails,
            phoneNumbers: theContact.phoneNumbers,
            ethAddresses: theContact.ethAddresses,
            postalAddresses: theContact.postalAddresses,
            socialAccounts : {
                googleId: googleId,
                facebookId: facebookId,
                twitterId: twitterId,
                githubId: githubId,
                asanaId: asanaId,
              }
          })
      } else {
        this.setState({
            avatar: theContact.avatar,
            firstName: theContact.firstName,
            lastName: theContact.lastName,
            bio: theContact.bio,
            secondaryEmails: theContact.secondaryEmails,
            phoneNumbers: theContact.phoneNumbers,
            ethAddresses: theContact.ethAddresses,
            postalAddresses: theContact.postalAddresses,
            socialAccounts : {
                googleId: "",
                facebookId: "",
                twitterId: "",
                githubId: "",
                asanaId: "",
              }
        })
      }
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { params } = this.props.match;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const avatar = this.state.avatar;
    const bio = this.state.bio;
    const secondaryEmails = this.state.secondaryEmails;
    const phoneNumbers = this.state.phoneNumbers;
    const ethAddresses = this.state.ethAddresses;
    const postalAddresses = this.state.postalAddresses;
    const socialAccounts = {
        googleId: this.state.socialAccounts.googleId,
        twitterId: this.state.socialAccounts.twitterId,
        facebookId: this.state.socialAccounts.facebookId,
        githubId: this.state.socialAccounts.githubId,
        asanaId: this.state.socialAccounts.asanaId 
    };

    axios
    .put(`${process.env.REACT_APP_BACKEND_URL}/api/contacts/${params.id}`, {firstName, lastName, bio, secondaryEmails, phoneNumbers, ethAddresses, postalAddresses, socialAccounts, avatar}, {withCredentials:true})
    .then( () => {
        // this.props.getData();
        window.location.assign('/contacts');    
    })
    .catch( error => console.log(error) )
  }

  handleChange = event => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  updateFields = (field, value) => {
    this.setState({[field]: value});
  }

  updatePostalAddresses = value => {
    this.setState({ postalAddresses: value });
  }

  handleSocialAccountsChange = event => {
    const {name, value} = event.target;
    this.setState({ socialAccounts: {[name]: value}})
  }

  updateAvatar = value => {
      this.setState({avatar: value});
  }

  render(){
    return(
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header p-4">
                    <h5 className="modal-title text-primary font-weight-bold">Edit contact</h5>
                </div>
                <form onSubmit={this.handleFormSubmit} className="create-contact-form" encType="multipart/form-data">
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="contact-firstName">First name</label>
                            <input id="contact-firstName" type="text" name="firstName" className="form-control" placeholder="Steve" value={this.state.firstName} onChange={ e => this.handleChange(e)}/>
                        </div>
        
                        <div className="form-group">
                            <label htmlFor="contact-lastName">Last name</label>
                            <input id="contact-lastName" type="text" name="lastName" className="form-control" placeholder="Wozniak" value={this.state.lastName} onChange={ e => this.handleChange(e)}/>
                        </div>
        
                        <div id="emails">                            
                            <div id="fieldEmail" className="form-group">
                                <AddFields field="secondaryEmails" title="Email" buttonText="Add another email" placeholder="steve.wozniak@apple.com" value={this.state.secondaryEmails} updateField={() => this.updateFields()} />
                            </div>
                        </div>
                        <div id="phone-numbers">
                            <div id="fieldPhoneNumber" className="form-group">
                                <AddFields field="phoneNumbers" title="Phone numbers" buttonText="Add another phone number" placeholder="+1 (0) 444 333 7744" value={this.state.phoneNumbers} updateField={() => this.updateFields()} />
                            </div>
                        </div>
        
                        <div id="ethAddresses">
                            <div id="fieldPhoneNumber" className="form-group">
                                <AddFields field="ethAddresses" title="Ethereum addresses" buttonText="Add another Eth address" placeholder="0xbOiuh547NG5JE584G4jfoei564rj..." value={this.state.ethAddresses} updateField={() => this.updateFields()} />
                            </div>
                        </div>
        
                        <div>Postal Address</div>
                            <AddPostalAddresses value={this.state.postalAddresses} updatePostalAddress={(e) => this.updatePostalAddresses(e)} />


                        <div><br/><br/>Social Accounts</div>
                        <div className="form-group">
                            <label htmlFor="socialAccounts-googleId">Google ID</label>
                            <input id="socialAccounts-googleId" type="text" name="googleId" className="form-control" value={this.state.socialAccounts.googleId} onChange={ e => this.handleSocialAccountsChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="socialAccounts-twitterId">Twitter ID</label>
                            <input id="socialAccounts-twitterId" type="text" name="twitterId" className="form-control" value={this.state.socialAccounts.twitterId} onChange={ e => this.handleSocialAccountsChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="socialAccounts-facebookId">Facebook ID</label>
                            <input id="socialAccounts-facebookId" type="text" name="facebookId" className="form-control" value={this.state.socialAccounts.facebookId} onChange={ e => this.handleSocialAccountsChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="socialAccounts-githubId">Github ID</label>
                            <input id="socialAccounts-githubId" type="text" name="githubId" className="form-control" value={this.state.socialAccounts.githubId} onChange={ e => this.handleSocialAccountsChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="socialAccounts-asanaId">Asana ID</label>
                            <input id="socialAccounts-asanaId" type="text" name="asanaId" className="form-control" value={this.state.socialAccounts.asanaId} onChange={ e => this.handleSocialAccountsChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact-img" className="label-price label" style={{width: '75%', float:"left"}}>Set Avatar <br/><br/></label>                            
                            <span>
                            <AddFile loggedInUser={this.props.loggedInUser} updateAvatar={(e) => {this.updateAvatar(e)}}/>
                            </span>
                        </div>
                        <button type="submit" className="btn btn-secondary btn-sm">Edit contact</button>
                    </div>
                </form>
            </div>
        </div>
    )
  }
}

export default EditContact;