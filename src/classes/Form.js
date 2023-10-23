import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import classifyDocument from '../functions/classify';
import recognizeDocument from '../functions/recognize';
import label from '../functions/labels';
import promptGPT from '../functions/prompt';
class Form extends Component {
    constructor(props) {
      super(props);
      this.state = {
        pack: "10",
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
        nnw_url: "",
        prompt: ""
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

    alcohol = (name, value) => {
      if(name === 'alcohol'){
        if(value === true){
          return "Tak";
        } else {  
          return "Nie";
        }
      } else if(value === null){
        return "Brak danych";
      } else {
        return value;
      }
  }

  spacja = () => {
    return " ";
  }

  addSpacja = (value) => {
    return value + " "; 
  }

    handleSubmit = async (event) => {
        this.props.updateChat("Analizuję... Myślę...");
        this.setState({process: true,
          med_wait: true,
          nnw_wait: true,
          pol_wait: true,
          med_type: "",
          nnw_type: "",
          pol_type: "",
          prompt: ""
        });
        this.props.setMedWait(true);
        this.props.setPolWait(true);
        this.props.setNnwWait(true);
        this.props.setChatWait(true);
        event.preventDefault();
        await this.generateUrl();

        // Do something with the form data

        
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
          this.state.prompt += "\n Dokumentacja medyczna: \n";
          for(let i=0; i < response.length; i++) {
            var value = response[i].value;
            this.state.prompt += " " + label(response[i].name) + ":"  + this.alcohol(response[i].name, value) + " ";
          }
          this.props.setMed(response);
          this.props.setMedWait(false);
          this.setState({med_wait: false});
        } catch (error) {
          console.log(error);
        }
        try{
          const response = await recognizeDocument(this.state.pol_url, this.state.pol_type, this.state.model)
          console.log(response);
          this.state.prompt += "\n Dokumentacja Polisy: \n";
          for(let i=0; i < response.length; i++) {
            var value = response[i].value;
            this.state.prompt += " " + label(response[i].name) + ":"  + value + " ";
          }
          this.props.setPol(response);
          this.props.setPolWait(false);
          this.setState({pol_wait: false});
        } catch (error) {
          console.log(error);
        }
        try{
          const response = await recognizeDocument(this.state.nnw_url, this.state.nnw_type, this.state.model)
          console.log(response);
          this.state.prompt += "\n Dokumentacja Szkody: \n";
          for(let i=0; i < response.length; i++) {
            var value = response[i].value;
            this.state.prompt += " " + label(response[i].name) + ":"  + value + " ";
          }
          this.props.setNnw(response);
          this.props.setNnwWait(false);
          this.setState({nnw_wait: false});
        } catch (error) {
            console.log(error);
        }
        this.state.prompt.replace(/\n/g, " ");
        console.log(this.state.prompt);
        const chat = await promptGPT(this.state.prompt);
        this.props.setChatWait(false);
        this.props.updateChat(chat['response']);
        
        
        
        
        console.log(this.state.pack);
        console.log(this.state.model);

    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
        </div>
        <div className="form-group">
        <label htmlFor="selectField">Wybierz dokument do analizy</label>
          <select className="form-select" id="selectField" value={this.state.pack} onChange={this.handlePackChange} required>
            <option value="10">Paczka 1</option>
            <option value="16">Paczka 2</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-2 mt-2 ">Analizuj</button>
        {this.state.process && 
        <ul className="list-group text-left mb-2">
          <li className="list-group-item"><a href={this.state.med_url}>Dokument1</a>: {this.spacja}{this.state.med_label == "" ? (<span></span>):(this.addSpacja(this.state.med_label))}{this.state.med_wait ? (<div className="pl-2 spinner-border spinner-border-sm" role="status"></div>) : (<span>✅</span>)}</li>
          <li className="list-group-item"><a href={this.state.nnw_url}>Dokument2</a>: {this.spacja}{this.state.nnw_label == "" ? (<span></span>):(this.addSpacja(this.state.nnw_label))}{this.state.nnw_wait ? (<div className="pl-2 spinner-border spinner-border-sm" role="status"></div>) : (<span>✅</span>)}</li>
          <li className="list-group-item"><a href={this.state.pol_url}>Dokument3</a>: {this.spacja}{this.state.pol_label == "" ? (<span></span>):(this.addSpacja(this.state.pol_label))}{this.state.pol_wait ? (<div className="pl-2 spinner-border spinner-border-sm" role="status"></div>) : (<span>✅</span>)}</li>
        </ul>
        }
        </form>
      );
    }
  }
  
  export default Form;