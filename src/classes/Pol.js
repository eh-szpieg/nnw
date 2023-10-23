import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import label from '../functions/labels';

class Pol extends Component {
    spacja = () => {
        return " ";
      }

    render() {
        return (
        <div className="row border-bottom mb-3 text-left">
            <h5>Dane Polisy</h5>
            <div className="col-sm-12 ">
            {this.props.value.map((item, index) => (
                    <ul className="list-group list-group-flush text-left" key={index}>
                            <li className="list-group-item"><span className='fw-bold'>{label(item.name)}</span>:
                            {this.spacja()}
                            { item.value === null ? (<span className="text-dark">Brak danych</span>) : (item.value)}
                            {this.spacja()}
                            ({Math.round(item.confidence * 100)}%)</li>
                    </ul>
            ))}
            </div>
        </div>
            );
        }
}

export default Pol;