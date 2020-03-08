import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class FileList extends Component {
  constructor(props){
      super(props);
      this.state = { 
        listOfFiles: null,
     };
  }

  getFiles = () => {
    const filesId = this.props.files;
    const graph = this.props.graph;
    const listOfFiles = graph[2].filter(file => {
      if (filesId)
      return filesId.includes(file._id)
    })
    this.setState({listOfFiles: listOfFiles});
  }
  //   openMediaLibrary()

  // getAllFiles = () => {
  //   const files = this.props.targetId;
  //   const title = this.props.title;
  //   this.setState({
  //       listOfFiles: responseFromApi.data
    //     })

  //   axios.get(`http://localhost:5000/api/files`, {withCredentials:true})
  //   .then(responseFromApi => {
  //     this.setState({
  //       listOfFiles: responseFromApi.data
  //     })
  //   })
  // }

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



  // componentDidMount() {

  //   // const script = document.createElement("script");

  //   // script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
  //   // script.async = true;
  //   // script.type= "text/javascript";

  //   // // var myWidget = cloudinary.createUploadWidget({
  //   // //   cloudName: 'passport-web3', 
  //   // //   uploadPreset: 'my_preset'}, (error, result) => { 
  //   // //     if (!error && result && result.event === "success") { 
  //   // //       console.log('Done! Here is the image info: ', result.info); 
  //   // //     }
  //   // //   }
  //   // // )

  //   // // document.getElementById("upload_widget").addEventListener("click", function(){
  //   // //     myWidget.open();
  //   // //   }, false);

  //   // document.body.appendChild(script);
  // }

  render(){
    return(
      <div className="big-container manage-products-wrapper">
        <div className="modal-dialog">
          <div className="modal-content">
            <h3 className="manage-products-title">{this.props.title && this.props.title}<br/><br/></h3>
            <table className="product-manage-table">
              {/* <thead>
                <tr className="table-row">
                  <th className="table-head">File name</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead> */}
              <tbody>
                {/* {{#each files}} */}
                {this.props.graph && !this.state.listOfFiles && this.getFiles()}
                {this.state.listOfFiles && this.state.listOfFiles.map(file => {
                  return (
                    <tr>
                      <td key={file}>
                        {/* <Link to={`/contacts/${contacts}`}> */}
                        
                          <span style={{width: '50%', float:"left"}}><h4 key={file}>{file.name}</h4></span>
                          <a href={file.fileUrl}><span style={{width: '50%', float:"right"}} key={file}>{file._id}</span></a>
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
            {this.props.buttons && 
            <Link to={`/files/new`}>
              <span className="btn btn-secondary btn-sm">Import files</span>
            </Link>}
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