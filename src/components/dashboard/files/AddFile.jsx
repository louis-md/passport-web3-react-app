import React, { Component } from "react";
import service from '../../../api/upload';
import { Redirect } from 'react-router-dom'

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
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create' POST route
        uploadData.append("fileUrl", e.target.files[0]);
        
        service.handleUpload(uploadData)
        .then(response => {
            // console.log('response is: ', response);
            // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
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
        service.saveNewFile(this.state)
        .then(res => {
            console.log('added: ', res);
            this.props.history.push('/files')
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