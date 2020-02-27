import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class FileList extends Component {
  constructor(){
      super();
      this.state = { 
        listOfFiles: [],
     };
  }

//   openMediaLibrary()

  getAllFiles = () => {
    axios.get(`http://localhost:5000/api/files`, {withCredentials:true})
    .then(responseFromApi => {
      console.log(responseFromApi)
      this.setState({
        listOfFiles: responseFromApi.data
      })
    })
  }

//     media library options: 
//   const mloptions = {
//     cloud_name: 'my_company',
//     api_key: '12345',
//     username: 'alex@mycompany.com',
//     timestamp: '1234567890',
//     signature: 'abcdefgh',
//     button_class: 'myBtn',
//     button_caption: 'Insert Images',
//     default_transformations: [
//       [{quality: "auto"},{fetch_format: "auto"}],
//       [{w_80,h_80,c_fill,g_auto,r_max},{f_auto,q_auto}]
//     ],    
//     }



  componentDidMount() {
    this.getAllFiles();
  }

  render(){
    return(
      <div className="big-container manage-products-wrapper">
        <h3 className="manage-products-title">Files</h3>
        <div className="modal-dialog">
          <div className="modal-content">
            <table className="product-manage-table">
              <thead>
                <tr className="table-row">
                  <th className="table-head">File name</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* {{#each files}} */}
                { this.state.listOfFiles.map(files => {
                  return (
                    <tr>
                      <td key={files._id}>
                        {/* <Link to={`/contacts/${contacts._id}`}> */}
                          <h3 key={files._id}>{files.name}</h3>
                        {/* </Link> */}
                      </td>
                    </tr>
                  )})
                }
                <tr className="table-row">
                  {/* {{> contactRow}} */}
                </tr>
                {/* {{/each}}
                {{#unless contacts}} */}
                {/* <tr>
                  <td colspan="4">sorry no contacts yet</td>
                </tr> */}
                {/* {{/unless}} */}
              </tbody>
            </table>
            <Link to={`/new`}>
              <span className="btn btn-secondary btn-sm">Save new file</span>
            </Link>
          </div>
          <div style={{width: '60%', float:"left"}}>
        </div>
        <div style={{width: '40%', float:"right"}}>
            {/* <AddContact getData={() => this.getAllContacts()}/> */}
        </div>
          </div>
        <script src="https://media-library.cloudinary.com/global/all.js"></script>  
      </div>
    )
  }
}

export default FileList;