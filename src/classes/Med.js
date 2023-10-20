import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

class Med extends Component {

    label = (key) => {
        switch (key) {
            case "alcohol":
                return 'Czy pod wpływem alkoholu?';
            case "pesel":
                return 'PESEL';
            case "personalDetails":
                return "Dane osobowe";
            case "adressData":
                return "Dane adresowe";
            case "ICD10Code":
                return 'Kod ICD10';
            case "description":
                return 'Opis';
            default:
                return 'Nieznany';
        }
    }

    render() {
        return (
        <div className="row border border-dark rounded mb-3 text-left">
            <h3>Dokumentacja Medyczna</h3>
            <div className="col-sm-12 ">
            {this.props.value.map((item, index) => (
                    <ul class="list-group list-group-flush text-left" key={index}>
                         <li class="list-group-item">{this.label(item.name)}: {item.value} ({item.confidence * 100})</li>
                    </ul>
            ))}
            </div>
        </div>
            );
        }
}

export default Med;