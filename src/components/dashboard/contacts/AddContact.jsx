import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class AddContact extends Component {
  constructor(props){
    super(props);
    this.state = { 
        firstName:'',
        lastName: '',
        bio: '',
        secondaryEmails: '',
        phoneNumbers: '',
        ethAddresses: '',
        postalAddresses: {
            streetName: '',
            streetNumber: 0,
            special: '',
            postCode: 0,
            city: '',
            country: '',
            principalResidency: false
        },
        socialAccounts: {
            googleId: "",
            twitterId: "",
            facebookId: "",
            githubId: "",
            asanaId: "" 
        },
        avatar: {},
    };
  }
  
  handleFormSubmit = (event) => {
    event.preventDefault();
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const bio = this.state.bio;
    const secondaryEmails = this.state.secondaryEmails;
    const phoneNumbers = this.state.phoneNumbers;
    const ethAddresses = this.state.ethAddresses;
    const postalAddresses = {
        streetName: this.state.postalAddresses.streetName,
        streetNumber:this.state.postalAddresses.streetNumber,
        special: this.state.postalAddresses.special,
        postCode:this.state.postalAddresses.postCode,
        city: this.state.postalAddresses.city,
        country: this.state.postalAddresses.country,
        principalResidency: this.state.postalAddresses.principalResidency,
    };

    const socialAccounts = {
        googleId: this.state.socialAccounts.googleId,
        twitterId: this.state.socialAccounts.twitterId,
        facebookId: this.state.socialAccounts.facebookId,
        githubId: this.state.socialAccounts.githubId,
        asanaId: this.state.socialAccounts.asanaId 
    };

    const avatar = {};
    axios
    .post("http://localhost:5000/api/contacts", {firstName, lastName, bio, secondaryEmails, phoneNumbers, ethAddresses, postalAddresses, socialAccounts, avatar}, {withCredentials:true})
    .then( () => {
        // this.props.getData();
        this.setState({
            firstName:'',
            lastName: '',
            bio: '',
            secondaryEmails: '',
            phoneNumbers: '',
            ethAddresses: '',
            postalAddresses: {
                streetName: '',
                streetNumber: 0,
                special: '',
                postCode: 0,
                city: '',
                country: '',
                principalResidency: false
            },
            socialAccounts: {
                googleId: "",
                twitterId: "",
                facebookId: "",
                githubId: "",
                asanaId: "" 
            },
            avatar: {},
        });
        this.props.history.push('/contacts');    
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){
    return(
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header p-4">
                    <h5 className="modal-title text-primary font-weight-bold">Create new contact</h5>
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
                                <label htmlFor="contact-email">Email</label>
                                <input id="contact-email" type="text" name="secondaryEmails" className="form-control" placeholder="steve.wozniak@apple.com" value={this.state.secondaryEmails} onChange={ e => this.handleChange(e)}/>
                                <div id="btn-add-email" className="btn btn-secondary btn-sm">Add another email</div>                    
                                <span id="btn-delete-email" className="btn btn-secondary btn-sm">Delete</span>
                            </div>
                        </div>
                        <div id="phone-numbers">
                            <div id="fieldPhoneNumber" className="form-group">
                                <label htmlFor="contact-phone">Phone number</label>
                                <input id="contact-phone" type="text" name="phoneNumbers" className="form-control" value={this.state.phoneNumbers} onChange={ e => this.handleChange(e)}/>
                                <div id="btn-add-number" className="btn btn-secondary btn-sm">Add another phone number</div>
                                <span id="btn-delete-number" className="btn btn-secondary btn-sm">Delete</span>
                            </div>
                        </div>
        
                        <div id="ethAddresses">
                            <div className="form-group">
                                <label htmlFor="contact-ethereumAddresses">Ethereum address</label>
                                <input id="contact-ethereumAddresses" type="text" name="ethAddresses" className="form-control" value={this.state.ethAddresses} onChange={ e => this.handleChange(e)}/>
                                <div id="btn-add-ethAddress" className="btn btn-secondary btn-sm">Add another ethereum address</div>
                                <span id="btn-delete-ethAddress" className="btn btn-secondary btn-sm">Delete</span>
                            </div>
                        </div>
        
                        <div>Postal Address</div>
                        <div id="postalAddresses">
                            <div className="form-group">
                                <label htmlFor="address-streetName">Street name</label>
                                <input id="address-streetName" type="text" name="streetName" className="form-control" value={this.state.postalAddresses.streetName} onChange={ e => this.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address-streetNumber">Street number</label>
                                <input id="address-streetNumber" type="number" name="streetNumber" className="form-control" value={this.state.postalAddresses.streetNumber} onChange={ e => this.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address-special">Special (bis, ter...)</label>
                                <input id="address-special" type="text" name="special" className="form-control" value={this.state.postalAddresses.special} onChange={ e => this.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address-postCode">Post code</label>
                                <input id="address-postCode" type="number" name="postCode" className="form-control" value={this.state.postalAddresses.postCode} onChange={ e => this.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address-city">City</label>
                                <input id="address-city" type="text" name="city" className="form-control" value={this.state.postalAddresses.city} onChange={ e => this.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address-country">Country</label>
                                <input id="address-country" type="text" name="country" className="form-control" value={this.state.postalAddresses.country} onChange={ e => this.handleChange(e)}/>
                            </div>
                            <div className="form-group">
                                <label className="label">Is it the principal residency ?</label>
                                    <label htmlFor="is-principalResidency">Yes</label>
                                    <input id="is-principalResidency" type="radio" name="principalResidency" value={this.state.postalAddresses.principalResidency} onChange={ e => this.handleChange(e)}/>
                                    <label htmlFor="is-not-principalResidency">No</label>
                                    <input id="is-not-principalResidency" type="radio" name="principalResidency" checked value={this.state.postalAddresses.principalResidency} onChange={ e => this.handleChange(e)}/>
                            </div>
                            <span id="btn-delete-postalAddress" className="btn btn-secondary btn-sm">Delete</span>
                            <hr/>
                        </div>
                        <div id="btn-add-postalAddress" className="btn btn-secondary btn-sm">Add another postal address</div>

                        <div><br/><br/>Social Accounts</div>
                        <div className="form-group">
                            <label htmlFor="socialAccounts-googleId">Google ID</label>
                            <input id="socialAccounts-googleId" type="text" name="googleId" className="form-control" value={this.state.socialAccounts.googleId} onChange={ e => this.handleChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="socialAccounts-twitterId">Twitter ID</label>
                            <input id="socialAccounts-twitterId" type="text" name="twitterId" className="form-control" value={this.state.socialAccounts.twitterId} onChange={ e => this.handleChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="socialAccounts-facebookId">Facebook ID</label>
                            <input id="socialAccounts-facebookId" type="text" name="facebookId" className="form-control" value={this.state.socialAccounts.facebookId} onChange={ e => this.handleChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="socialAccounts-githubId">Github ID</label>
                            <input id="socialAccounts-githubId" type="text" name="githubId" className="form-control" value={this.state.socialAccounts.githubId} onChange={ e => this.handleChange(e)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="socialAccounts-asanaId">Asana ID</label>
                            <input id="socialAccounts-asanaId" type="text" name="asanaId" className="form-control" value={this.state.socialAccounts.asanaId} onChange={ e => this.handleChange(e)}/>
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="contact-img" className="label-price label">Avatar</label>
                            <input id="contact-img" type="file" name="avatar" className="form-control" value={this.state.avatar} onChange={ e => this.handleChange(e)}/>
                        </div> */}
                        <button type="submit" className="btn btn-secondary btn-sm">Add to contacts</button>
                    </div>
                </form>
            </div>
        </div>
    )
  }
}

export default AddContact;