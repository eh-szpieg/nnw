import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import classifyDocument from '../functions/classify';
import recognizeDocument from '../functions/recognize';

class Form extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pack: "1",
        model: "1",
        med_type: "",
        nnw_type: "",
        pol_type: "",
        med_label: "",
        nnw_label: "",
        pol_label: "",
        med_wait: null,
        pol_wait: null,
        nnw_wait: null,
        process: false,
        med_url: "",
        pol_url: "",
        nnw_url: ""
      };
    }

    handlePackChange = (event) => {
      this.setState({ pack: event.target.value });
      this.generateUrl();
    }

    handleModelChange = (event) => {
      this.setState({ model: event.target.value });
    }

      generateUrl = async () => {
      this.setState({med_url: "https://sateam5euw01.blob.core.windows.net/lab/testy/"+ this.state.pack +"/DokumentacjaMedyczna.pdf",
      pol_url: "https://sateam5euw01.blob.core.windows.net/lab/testy/"+ this.state.pack +"/Polisa.pdf",
      nnw_url: "https://sateam5euw01.blob.core.windows.net/lab/testy/"+ this.state.pack +"/Zgloszenie.pdf",
    }, () => {
      console.log(this.state.med_url);
      console.log(this.state.pol_url);
      console.log(this.state.nnw_url);
    });
    }
    

    label = (type) => { 
      if (type === "med") {
        return "Dokumentacja Medyczna";
      } else if (type === "nnw") {
        return "Zgłoszenie";
      } else if (type === "pol") {  
        return "Polisa";
      } else {      
        return "Nieznany";
      }
    }


    handleSubmit = async (event) => {
        this.props.updateChat("Analizuę pakiet: " + this.state.pack + " z wykorzystaniem modelu: " + this.state.model);
        event.preventDefault();
        await this.generateUrl();
        // Do something with the form data
        this.setState({process: true,
          med_wait: true,
          nnw_wait: true,
          pol_wait: true
        });
        this.props.setMedWait(true);
        this.props.setPolWait(true);
        this.props.setNnwWait(true);
        
        try{
          const response = await classifyDocument(this.state.med_url, this.state.model)
          console.log(response['result']);
          this.setState({med_label: this.label(response['result'])});
          this.setState({med_type: response['result']});
        } catch (error) {
          console.log(error);
        }
        try{
          const response = await classifyDocument(this.state.pol_url, this.state.model)
          console.log(response['result']);
          this.setState({pol_label: this.label(response['result'])});
          this.setState({pol_type: response['result']});
        } catch (error) {
          console.log(error);
        }
        try{
          const response = await classifyDocument(this.state.nnw_url, this.state.model)
          console.log(response['result']);
          this.setState({nnw_label: this.label(response['result'])});
          this.setState({nnw_type: response['result']});
        } catch (error) {
          console.log(error);
        }

        try{
          const response = await recognizeDocument(this.state.med_url, this.state.med_type, this.state.model)
          console.log(response);
          this.props.updateMed(response);
          this.props.setMedWait(false);
          this.setState({med_wait: false});
        } catch (error) {
          console.log(error);
        }
        // try{
        //   const response = await recognizeDocument(this.state.pol_url, this.state.pol_type, this.state.model)
        //   console.log(response);

        //   this.props.setNnwWait(false);
        //   this.setState({pol_wait: false});
        // } catch (error) {
        //   console.log(error);
        // }
        // try{
        //   const response = await recognizeDocument(this.state.nnw_url, this.state.nnw_type, this.state.model)
        //   console.log(response);

        //   this.props.setPolWait(false);
        //   this.setState({nnw_wait: false});
        // } catch (error) {
        //   console.log(error);
        // }
        
        


        
        
        
        
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
          <select className="form-select" id="selectField" value={this.state.pack} onChange={this.handlePackChange} required>
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
          <li className="list-group-item">Dokument1: {this.state.med_label} {this.state.med_wait ? (<div className="pl-2 spinner-border spinner-border-sm" role="status"></div>) : (<span>✅</span>)}</li>
          <li className="list-group-item">Dokument2: {this.state.nnw_label}{this.state.nnw_wait ? (<div className="pl-2 spinner-border spinner-border-sm" role="status"></div>) : (<span>✅</span>)}</li>
          <li className="list-group-item">Dokument3: {this.state.pol_label}{this.state.pol_wait ? (<div className="pl-2 spinner-border spinner-border-sm" role="status"></div>) : (<span>✅</span>)}</li>
        </ul>
        }
        </form>
      );
    }
  }
  
  export default Form;