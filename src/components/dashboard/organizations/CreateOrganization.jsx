import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddFields from "../contacts/AddFields";
import AddPostalAddresses from "../contacts/AddPostalAddresses";
import AddFile from "../files/AddFile";

class CreateOrganization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      owner: "",
      members: [],
      contactEmail: [],
      ethAddresses: [],
      layers: [],
      phoneNumbers: [],
      website: "",
      socialLinks: [],
      postalAddresses: [],
      logo: "",
      publicFiles: [],
      privateFiles: [],
      publicContacts: [],
      privateContacts: []
    };
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const owner = this.props.loggedInUser._id;
    const members = this.props.loggedInUser._id;
    const ethAddresses = this.state.ethAddresses;
    const layers = this.state.layers;
    const contactEmail  = this.state.contactEmail;
    const phoneNumbers = this.state.phoneNumbers;
    const website = this.state.website;
    const socialLinks = this.state.socialLinks;
    const postalAddresses = this.state.postalAddresses;
    const logo = this.state.logo;
    const publicFiles = this.state.publicFiles;
    const privateFiles = this.state.privateFiles;
    const publicContacts = this.state.publicContacts;
    const privateContacts = this.state.privateContacts;
    const contacts = [this.props.loggedInUser.profile];
    
    axios
      .post(
        "http://localhost:5000/api/organizations",
        {
            title,
            description,
            owner,
            members,
            contactEmail,
            phoneNumbers,
            layers,
            ethAddresses,
            website,
            socialLinks,
            postalAddresses,
            logo,
            publicFiles,
            privateFiles,
            publicContacts,
            privateContacts,
            contacts
        },
        { withCredentials: true }
      )
      .then((res) => {
        const userId = this.props.loggedInUser._id;
        var userOrganizations = this.props.loggedInUser.organizations;
        const newOrganization = {organizationId: res.data._id, hasAccessToMyContacts: false, hasAccessToMyFiles: false};
        console.log(`Id de la nouvelle org: ${res.data._id}`)
        if (userOrganizations.length) {
          console.log(`une org existe déjà: ${JSON.stringify(userOrganizations)}`)
          userOrganizations.push(newOrganization);
        } else userOrganizations = newOrganization;

        axios.put(
          `http://localhost:5000/api/users/${userId}`,
          { organizations: userOrganizations},
          { withCredentials: true }
        ).then(()=> {
          this.setState({
            title: "",
            description: "",
            owner: "",
            members: [],
            contactEmail: [],
            ethAddresses: [],
            layers: [],
            phoneNumbers: [],
            website: [],
            socialLinks: [],
            postalAddresses: [],
            logo: "",
            publicFiles: [],
            privateFiles: [],
            publicContacts: [],
            privateContacts: []
        });
        this.props.history.push("/organizations");
        })
        console.log(`Joining organization, new permitted organizations: ${JSON.stringify(userOrganizations)}`)        
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  updateFields = (field, value) => {
    this.setState({ [field]: value });
  };

  updatePostalAddresses = value => {
    this.setState({ postalAddresses: value });
  };

  updateAvatar = value => {
    this.setState({logo: value});
  }
//   handleSocialAccountsChange = event => {
//     const { name, value } = event.target;
//     this.setState({ socialAccounts: { [name]: value } });
//   };

  render() {
    return (
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header p-4">
            <h5 className="modal-title text-primary font-weight-bold">
              Create organization
            </h5>
          </div>
          <form
            onSubmit={this.handleFormSubmit}
            className="create-organization-form"
            encType="multipart/form-data"
          >
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="organization-title">Title</label>
                <input
                  id="organization-title"
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Apple Inc."
                  value={this.state.title}
                  onChange={e => this.handleChange(e)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="organization-description">Description</label>
                <input
                  id="organization-description"
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Apple designs, develops, and sells consumer electronics, computer software and online services."
                  value={this.state.description}
                  onChange={e => this.handleChange(e)}
                />
              </div>

              <div id="emails">
                <div id="fieldEmail" className="form-group">
                  <AddFields
                    field="contactEmail"
                    title="Contact email"
                    buttonText="Add another email"
                    placeholder="contact@apple.com"
                    value={this.state.contactEmail}
                    updateField={() => this.updateFields()}
                  />
                </div>
              </div>
              <div id="phone-numbers">
                <div id="fieldPhoneNumber" className="form-group">
                  <AddFields
                    field="phoneNumbers"
                    title="Phone numbers"
                    buttonText="Add another phone number"
                    placeholder="+1 (0) 444 333 7744"
                    value={this.state.phoneNumbers}
                    updateField={() => this.updateFields()}
                  />
                </div>
              </div>

              <div id="ethAddresses">
                <div id="fieldEthAddresses" className="form-group">
                  <AddFields
                    field="ethAddresses"
                    title="Ethereum addresses"
                    buttonText="Add another Eth address"
                    placeholder="0xbOiuh547NG5JE584G4jfoei564rj..."
                    value={this.state.ethAddresses}
                    updateField={() => this.updateFields()}
                  />
                </div>
              </div>

              <div>Postal Address</div>
              <AddPostalAddresses value={this.state.postalAddresses} updatePostalAddress={e => this.updatePostalAddresses(e)}/>
              <div className="form-group">
                <label
                  htmlFor="organization-img"
                  className="label-price label"
                  style={{ width: "75%", float: "left" }}
                >
                  Logo <br />
                  <br />
                </label>
                <span>
                  <AddFile
                    loggedInUser={this.props.loggedInUser}
                    updateAvatar={e => {
                      this.updateAvatar(e);
                    }}
                  />
                </span>
              </div>
              <button type="submit" className="btn btn-secondary btn-sm">
                Save organization
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateOrganization;
