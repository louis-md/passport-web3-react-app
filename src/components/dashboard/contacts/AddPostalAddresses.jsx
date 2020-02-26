import React from 'react';

class AddPostalAddresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        streetName: '',
        streetNumber: '',
        special: '',
        postCode: '',
        city: '',
        country: '',
        principalResidency: ''
    };
  }

  addField = () => {
    if (this.state) {
      const valueCopy = [...this.props.value];
      const newValue = this.state;
      valueCopy.push(newValue);
      this.props.updatePostalAddress(valueCopy);
      this.setState({
        streetName: '',
        streetNumber: '',
        special: '',
        postCode: '',
        city: '',
        country: '',
        principalResidency: ''
        })
    }
  }

  deleteField = index => {
    const valueCopy = [...this.props.value];
    valueCopy.splice(index, 1);
    this.props.updatePostalAddress(valueCopy);
  }

  handleChange = (event) => { 
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
    <div id="postalAddresses">
        <div className="form-group">
            <label htmlFor="address-streetName">Street name</label>
            <input id="address-streetName" type="text" name="streetName" className="form-control" value={this.state.streetName} onChange={ e => this.handleChange(e)}/>
        </div>
        <div className="form-group">
            <label htmlFor="address-streetNumber">Street number</label>
            <input id="address-streetNumber" type="number" name="streetNumber" className="form-control" value={this.state.streetNumber} onChange={ e => this.handleChange(e)}/>
        </div>
        <div className="form-group">
            <label htmlFor="address-special">Special (bis, ter...)</label>
            <input id="address-special" type="text" name="special" className="form-control" value={this.state.special} onChange={ e => this.handleChange(e)}/>
        </div>
        <div className="form-group">
            <label htmlFor="address-postCode">Post code</label>
            <input id="address-postCode" type="number" name="postCode" className="form-control" value={this.state.postCode} onChange={ e => this.handleChange(e)}/>
        </div>
        <div className="form-group">
            <label htmlFor="address-city">City</label>
            <input id="address-city" type="text" name="city" className="form-control" value={this.state.city} onChange={ e => this.handleChange(e)}/>
        </div>
        <div className="form-group">
            <label htmlFor="address-country">Country</label>
            <input id="address-country" type="text" name="country" className="form-control" value={this.state.country} onChange={ e => this.handleChange(e)}/>
        </div>
        <div className="form-group">
            <label className="label">Is it the principal residency ?</label>
                <label htmlFor="is-principalResidency">Yes</label>
                <input id="is-principalResidency" type="radio" name="principalResidency" value={this.state.principalResidency} onChange={ e => this.handleChange(e)}/>
                <label htmlFor="is-not-principalResidency">No</label>
                <input id="is-not-principalResidency" type="radio" name="principalResidency" checked value={this.state.principalResidency} onChange={ e => this.handleChange(e)}/>
        </div>
        <span className="btn btn-secondary btn-sm" onClick={() => this.addField()}>Add another postal address</span>
        <ul>
        {this.props.value.map((aValue, index) => {
          return (
          <div style={{padding:'30px'}} key={index}>
            {aValue.streetName && <div  type="text" className="form-control">{aValue.streetName}</div>}
            {aValue.streetNumber && <div  type="text" className="form-control">{aValue.streetNumber}</div>}
            {aValue.special && <div  type="text" className="form-control">{aValue.special}</div>}
            {aValue.postCode && <div  type="text" className="form-control">{aValue.postCode}</div>}
            {aValue.city && <div  type="text" className="form-control">{aValue.city}</div>}
            {aValue.country && <div  type="text" className="form-control">{aValue.country}</div>}
            {aValue.principalResidency && <div type="text" className="form-control">Principal residency</div>}
            <div key={index} id="btn-delete" className="btn btn-secondary btn-sm" onClick={()=> this.deleteField(index)}>Delete</div>
          </div>
          )
          })
        }
        </ul>
    </div>
    )
  }
}

export default AddPostalAddresses;

