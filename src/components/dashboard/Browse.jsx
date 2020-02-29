import React, { Component } from 'react';
import SearchField from './SearchField';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Results = props => (
  <div className="list-example">
    <div className="list-body">
      { props.users &&
        props.users.map((item, index) => (
        <Link to={`/users/${item._id}`}>
          <ul key={index}>
            <li>User {item._id} </li>
          </ul>
          </Link>))
      }
      { props.contacts &&
        props.contacts.map((item, index) => (
        <Link to={`/contacts/${item._id}`}>
          <ul key={index}>
            <li> {item.firstName} {item.lastName} (Contact)<img className='avatar' src={item.avatar} style={{float: 'right', verticalAlign: 'middle', width: '16px'}}/></li>
          </ul></Link>))
      }
      { props.files &&
        props.files.map((item, index) => (
        <Link to={`/files/${item._id}`}>
          <ul key={index}>
            <li> {item.name} (file)</li>
          </ul></Link>))
      }
      { props.organizations &&
        props.organizations.map((item, index) => (
        <Link to={`/organizations/${item._id}`}>
          <ul key={index}>
            <li>{item.title} (Organization) <img className='avatar' src={item.logo} style={{float: 'right', verticalAlign: 'middle', width: '16px'}}/></li>
          </ul></Link>))
      }
    </div>
  </div>
);

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: [],
      matchedUsers: [],
      matchedContacts: [],
      matchedFiles: [],
      matchedOrganizations: []
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const getMatchedUsers = (searchText) => {
        return this.state.graph[0].filter(item => 
            item.email.toLowerCase().includes(searchText.toLowerCase()));
    };

    const getMatchedContacts = (searchText) => {
        return this.state.graph[1].filter(item => 
            item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            item.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
            item.secondaryEmails.join().toLowerCase().includes(searchText.toLowerCase()) ||
            item.phoneNumbers.join().toLowerCase().includes(searchText.toLowerCase()) ||
            JSON.stringify(item.postalAddresses).toLowerCase().includes(searchText.toLowerCase()) ||
            item.ethAddresses.join().toLowerCase().includes(searchText.toLowerCase()) ||
            JSON.stringify(item.socialAccounts).toLowerCase().includes(searchText.toLowerCase())
            );
    };

    const getMatchedFiles = (searchText) => {
        return this.state.graph[2].filter(item => 
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.fileUrl.toLowerCase().includes(searchText.toLowerCase())
            );
    };

    const getMatchedOrganizations = (searchText) => {
        return this.state.graph[3].filter(item => 
            item.title.toLowerCase().includes(searchText.toLowerCase()) ||
            item.phoneNumbers.join().toLowerCase().includes(searchText.toLowerCase()) ||
            JSON.stringify(item.postalAddresses).toLowerCase().includes(searchText.toLowerCase()) ||
            item.ethAddresses.join().toLowerCase().includes(searchText.toLowerCase()) ||
            item.socialLinks.join().toLowerCase().includes(searchText.toLowerCase()) ||
            item.website.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    if (value) {
        this.setState({
            matchedUsers: getMatchedUsers(value),
            matchedContacts: getMatchedContacts(value),
            matchedFiles: getMatchedFiles(value),
            matchedOrganizations: getMatchedOrganizations(value),
          });
    } else {
        this.setState({
            matchedUsers: "",
            matchedContacts: "",
            matchedFiles: "",
            matchedOrganizations: "",
          });
    }
  }

    getGraph = () => {
        axios.get(`http://localhost:5000/api/graph`, {withCredentials:true})
        .then(responseFromApi => {
            console.log(responseFromApi)
            this.setState({
            graph: responseFromApi.data
            })
        })
    }

    componentDidMount() {
    this.getGraph();
    }

  render() {
    return (
    <div className="big-container manage-products-wrapper">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="react-search-field-demo container">
                <div>
                    <SearchField
                    placeholder="Browse contacts, files, eth addresses, organizations... "
                    onChange={this.onChange}
                    />
                    <Results
                    users={this.state.matchedUsers}
                    contacts={this.state.matchedContacts}
                    files={this.state.matchedFiles}
                    organizations={this.state.matchedOrganizations}
                    />
                </div>
            </div>
          </div>
        </div> 
    </div>
    )}
}

export default Browse;
