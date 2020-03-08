import React, { Component } from 'react';
import axios from 'axios';
import AddFields from '../contacts/AddFields'
import AddPostalAddresses from '../contacts/AddPostalAddresses';
import AddFile from '../files/AddFile'

class EditOrganization extends Component {
  constructor(props){
    super(props);
    this.state = {
        title:'',
        contactEmail: [],
        phoneNumbers: [],
        ethAddresses: [],
        postalAddresses: [],
        logo: "",
    };
  }
  
  componentDidMount(){
    this.getSingleOrganization();
  }

  getSingleOrganization = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/organizations/${params.id}`, {withCredentials:true})
    .then( responseFromApi => {
      const theOrganization = responseFromApi.data;
      console.log(theOrganization)
        this.setState({
            logo: theOrganization.logo,
            title: theOrganization.title,
            contactEmail: theOrganization.contactEmail,
            phoneNumbers: theOrganization.phoneNumbers,
            ethAddresses: theOrganization.ethAddresses,
            postalAddresses: theOrganization.postalAddresses,
        })
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { params } = this.props.match;
    const title = this.state.title;
    const logo = this.state.logo;
    const contactEmail = this.state.contactEmail;
    const phoneNumbers = this.state.phoneNumbers;
    const ethAddresses = this.state.ethAddresses;
    const postalAddresses = this.state.postalAddresses;

    axios
    .put(`http://localhost:5000/api/organizations/${params.id}`, {title, contactEmail, phoneNumbers, ethAddresses, postalAddresses, logo}, {withCredentials:true})
    .then( () => {
        // this.props.getData();
        window.location.assign(`/organizations/${params.id}`);    
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

  updatelogo = value => {
      this.setState({logo: value});
  }

  render(){
    return(
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header p-4">
                    <h5 className="modal-title text-primary font-weight-bold">Edit organization</h5>
                </div>
                <form onSubmit={this.handleFormSubmit} className="create-contact-form" encType="multipart/form-data">
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input id="title" type="text" name="title" className="form-control" placeholder="Steve" value={this.state.title} onChange={ e => this.handleChange(e)}/>
                        </div>
        
                        <div id="email">                            
                            <div id="contactEmail" className="form-group">
                                <AddFields field="contactEmail" title="Contact email" buttonText="Add another email" placeholder="steve.wozniak@apple.com" value={this.state.contactEmail} updateField={() => this.updateFields()} />
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

                        <div className="form-group">
                            <label htmlFor="contact-img" className="label-price label" style={{width: '75%', float:"left"}}>Set logo <br/><br/></label>                            
                            <span>
                            <AddFile loggedInUser={this.props.loggedInUser} updateAvatar={(e) => {this.updatelogo(e)}}/>
                            </span>
                        </div>
                        <button type="submit" className="btn btn-secondary btn-sm">Edit organization</button>
                    </div>
                </form>
            </div>
        </div>
    )
  }
}

export default EditOrganization;