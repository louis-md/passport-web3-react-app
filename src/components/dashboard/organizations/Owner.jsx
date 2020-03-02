import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Owner extends Component {
  constructor(props){
      super(props);
  }

  render(){
    return(
      <div className="big-container manage-products-wrapper">
        <div className="modal-dialog">
          <div className="modal-content">
            <h3 className="manage-products-title">Owner<br/><br/></h3>
              {this.props.owner && 
                <Link to={`/users/${this.props.owner}`}>
                <h3>{this.props.owner}</h3>
              </Link>}
            <br/>
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

export default Owner;