import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

class Med extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pesel: '',
            firstName: '',
            lastName: '',
            admissionDate: '',
            city: '',
            postalCode: '',
            street: '',
            houseNumber: '',
            icd10: '',
            alcohol: false,
            proline: '',
            underInfluence: false
        };
    }
    
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the form data
        console.log(this.state);
    }

    render() {
        return (
        <div className="row border border-dark rounded mb-3">
            <h3>Dokumentacja Medyczna</h3>
            <div className="col-sm-6 ">
                <h3>Dane poszkodowanego</h3>
            </div>
            <div className="col-sm-6">
                <h3>Diagnoza medyczna</h3>
            </div>
        </div>
            );
        }
}

export default Med;