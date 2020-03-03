import React, { Component } from "react";
import service from '../../../api/upload';
import { Redirect } from 'react-router-dom'
import axios from "axios";

class AddFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          fileUrl: '',
          owner: ''
        };
    }

    handleChange = e => {  
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    // this method handles just the file upload
    handleFileUpload = e => {
        console.log("The file to be uploaded is: ", e.target.files[0]);

        const owner = this.props.loggedInUser._id
        const uploadData = new FormData();
        uploadData.append("fileUrl", e.target.files[0]);
        
        service.handleUpload(uploadData)
        .then(response => {
            this.setState({ fileUrl: response.secure_url, owner: owner });
            if (this.props.updateAvatar) {
                const url = this.state.fileUrl;
                this.props.updateAvatar(url);
                this.setState({name : "Contact avatar"})
            }
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
          });
    }

    // this method submits the form
    handleSubmit = e => {
        e.preventDefault();
        const user = this.props.loggedInUser;
        service.saveNewFile(this.state)
        .then(res => {
            console.log('added: ', res);
            if (user.files) {
                user.files.push(res._id)
            } else user.files = res._id;

            axios.put(`http://localhost:5000/api/users/${user._id}`, {files: user.files})
            .then(() => {
                console.log("done!")
                this.props.history.push('/files');
            })    
        })
        .catch(err => {
            console.log("Error while adding the thing: ", err);
        });
    }  
    
    render() {
        return (
          <div>
            <form onSubmit={e => this.handleSubmit(e)}>
                {!this.props.updateAvatar && <label>Name</label>}
                {!this.props.updateAvatar && <input type="text" name="name" value={ this.state.name } onChange={ e => this.handleChange(e)} />}
                <input type="file" onChange={(e) => this.handleFileUpload(e)} /> 
                {!this.props.updateAvatar && <button type="submit">Save new file</button>}
            </form>
          </div>
        );
    }
}

export default AddFile;