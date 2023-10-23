import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import label from '../functions/labels';

class Med extends Component {

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


    render() {
        return (
        <div className="row border-bottom mb-3 text-left">
            <h5>Dokumentacja Medyczna</h5>
            <div className="col-sm-12 ">
            {this.props.value.map((item, index) => (
                    <ul className="list-group list-group-flush text-left" key={index}>
                            <li className="list-group-item"><span className='fw-bold'>{label(item.name)}</span>:
                            {this.spacja()}
                            {this.alcohol(item.name, item.value)}
                            {this.spacja()}
                            ({Math.round(item.confidence * 100)}%)</li>
                    </ul>
            ))}
            </div>
        </div>
            );
        }
}

export default Med;