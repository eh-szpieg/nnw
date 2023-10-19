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

    redner() {

    }
}

export default Med;