import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';


class Form extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pack: "1",
        model: '1',
        med_type: "",
        nnw_type: "",
        pol_type: "",
        med_wait: null,
        pol_wait: null,
        nnw_wait: null,
        process: false,
      };
    }

    handlePackChange = (event) => {
      this.setState({ pack: event.target.value });
    }

    handleModelChange = (event) => {
      this.setState({ model: event.target.value });
    }
    

    handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the form data
        this.setState({process: true});
        this.setState({med_wait: true});
        this.setState({pol_wait: true});
        this.setState({nnw_wait: true});
        this.props.setMedWait(true);
        this.props.setPolWait(true);
        this.props.setNnwWait(true);
        setTimeout(() => {
          this.setState({med_wait: false});
          this.setState({pol_wait: false});
          this.setState({nnw_wait: false});
          this.props.setMedWait(false);
          this.props.setPolWait(false);
          this.props.setNnwWait(false);
        }, 2000);
        this.props.updateChat("Analizuę pakiet: " + this.state.pack + " z wykorzystaniem modelu: " + this.state.model);
        console.log(this.state.pack);
        console.log(this.state.model);

    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
        <label htmlFor="selectField">Wybierz model do analizy</label>
          <select className="form-select" id="selectField" value={this.state.model} onChange={this.handleModelChange}>
            <option value="1">Model 1</option>
            <option value="2">Model 2</option>
          </select>
        </div>
        <div className="form-group">
        <label htmlFor="selectField">Wybierz dokument do analizy</label>
          <select className="form-select" id="selectField" value={this.state.pack} onChange={this.handlePackChange}>
            <option value="1">Paczka 1</option>
            <option value="2">Paczka 2</option>
            <option value="3">Paczka 3</option>
            <option value="4">Paczka 4</option>
            <option value="5">Paczka 5</option>
            <option value="6">Paczka 6</option>
            <option value="7">Paczka 7</option>
            <option value="8">Paczka 8</option>
            <option value="9">Paczka 9</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-2 mt-2">Analizuj</button>
        {this.state.process && 
        <ul className="list-group mb-2">
          <li className="list-group-item">Dokument1: {this.state.med_wait ? (<div className="pl-2 spinner-border spinner-border-sm" role="status"></div>) : (<span>✅</span>)}</li>
          <li className="list-group-item">Dokument2: {this.state.nnw_wait ? (<div className="pl-2 spinner-border spinner-border-sm" role="status"></div>) : (<span>✅</span>)}</li>
          <li className="list-group-item">Dokument3: {this.state.pol_wait ? (<div className="pl-2 spinner-border spinner-border-sm" role="status"></div>) : (<span>✅</span>)}</li>
        </ul>
        }
        </form>
      );
    }
  }
  
  export default Form;