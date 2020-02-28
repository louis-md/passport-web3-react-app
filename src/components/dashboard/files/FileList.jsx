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
    // const script = document.createElement("script");

    // script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    // script.async = true;
    // script.type= "text/javascript";

    // // var myWidget = cloudinary.createUploadWidget({
    // //   cloudName: 'passport-web3', 
    // //   uploadPreset: 'my_preset'}, (error, result) => { 
    // //     if (!error && result && result.event === "success") { 
    // //       console.log('Done! Here is the image info: ', result.info); 
    // //     }
    // //   }
    // // )

    // // document.getElementById("upload_widget").addEventListener("click", function(){
    // //     myWidget.open();
    // //   }, false);

    // document.body.appendChild(script);
  }

  render(){
    return(
      <div className="big-container manage-products-wrapper">
        <div className="modal-dialog">
          <div className="modal-content">
            <h3 className="manage-products-title">Files<br/><br/></h3>
            <table className="product-manage-table">
              {/* <thead>
                <tr className="table-row">
                  <th className="table-head">File name</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead> */}
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
            <br/>
            <Link to={`/files/new`}>
              <span className="btn btn-secondary btn-sm">Save new file</span>
            </Link>
          </div>
          <div style={{width: '60%', float:"left"}}>
        </div>
        <div style={{width: '40%', float:"right"}}>
            {/* <AddContact getData={() => this.getAllContacts()}/> */}
        </div>
          </div>
        {/* <button id="upload_widget" class="cloudinary-button">Upload files</button> */}
        <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>  
        </div>
            )
          }
        }

export default FileList;