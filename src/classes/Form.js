import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedDocument: "option1",
        radioModel: 'model1'
      };
    }

    handleSelectChange = (event) => {
        this.setState({ selectedDocument: event.target.value });
    }

    handleRadioChange = (event) => {
      this.setState({ radioModel: event.target.value });
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the form data
        console.log(this.state.selectedDocument);
        console.log(this.state.radioModel);
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
        <label htmlFor="selectField">Wybierz dokument do analizy</label>
          <select className="form-select" id="selectField" value={this.state.selectValue} onChange={this.handleSelectChange}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="radioGroup" value="model1" id="model1" checked={this.state.radioModel === 'model1'} onChange={this.handleRadioChange} />
          <label className="form-check-label" htmlFor='model1'>
            Model 1
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="radioGroup" value="model2" id="model2" checked={this.state.radioModel === 'model2'} onChange={this.handleRadioChange} />
          <label className="form-check-label" htmlFor='model2'>
            Model 2
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Analizuj</button>
        </form>
      );
    }
  }
  
  export default Form;