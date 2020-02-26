import React from 'react';

class AddFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldToAdd: "", 
    };
  }

  addField = () => {
    if (this.state.fieldToAdd) {
      const valueCopy = this.props.value;
      const fieldCopy = this.props.field;
      const newValue = this.state.fieldToAdd;
      valueCopy.push(newValue);
      this.props.updateField(fieldCopy, valueCopy);
      this.setState({fieldToAdd: ""})
    }
  }

  deleteField = index => {
    const valueCopy = this.props.value;
    const fieldCopy = this.props.field;
    valueCopy.splice(index, 1);
    this.props.updateField(fieldCopy, valueCopy);
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div>
        <label htmlFor="field">{this.props.title}</label>
        <input id="field" type="text" name="fieldToAdd" className="form-control" placeholder={this.props.placeholder} value={this.state.fieldToAdd} onChange={ e => this.handleChange(e)}/>
        <span id="btn-add-number" className="btn btn-secondary btn-sm" onClick={() => this.addField(this.state.fieldToAdd)}>{this.props.buttonText}</span>
        <ul>
        {this.props.value.map((aValue, index) => {
          return (
          <div style={{padding:'30px'}} key={index}>
            <span style={{width: '70%', float:"left"}} id="field" type="text" className="form-control">{aValue}</span>
            <span key={index} id="btn-delete" className="btn btn-secondary btn-sm" onClick={()=> this.deleteField(index)}>Delete</span>
          </div>
          )
          })
        }
        </ul>
      </div>
    )
  }
}

export default AddFields;

