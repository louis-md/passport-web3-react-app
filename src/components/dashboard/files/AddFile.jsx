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
                window.location.assign('/files');
            })    
        })
        .catch(err => {
            console.log("Error while adding the thing: ", err);
        });
    }  
    
    render() {
        return (
          <div>
           <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header p-4">
                    <h5 className="modal-title text-primary font-weight-bold">Import new file</h5>
                </div>
            <form onSubmit={e => this.handleSubmit(e)}>
            <div className="modal-body">
                        <div className="form-group"></div>
                {!this.props.updateAvatar && <label htmlFor="name">Name</label>}
                {!this.props.updateAvatar && <input type="text" id="name" className="form-control" name="name" value={ this.state.name } onChange={ e => this.handleChange(e)} />}<br/><br/>
                <label className="btn btn-secondary btn-sm">Select file...
                <input className="form-control btn btn-secondary btn-sm" id="selectedFile" style={{display: "none"}} type="file" accept="*" onChange={(e) => this.handleFileUpload(e)} />
                </label><span>  </span>
                {!this.props.updateAvatar && <button className="btn btn-secondary btn-sm" type="submit">Upload</button>}
                </div>
            </form>
            </div>
            </div>
          </div>
        );
    }
}

export default AddFile;