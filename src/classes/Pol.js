import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

class Pol extends Component {
    render() {
        return (
        <div className="row border border-dark rounded mb-3">
            <h3>Polisa</h3>
            <div className="col-sm-6 ">
                <h3>Dane ubezpieczonego</h3>
            </div>
            <div className="col-sm-6">
                <h3>Dane polisy</h3>
            </div>
        </div>
            );
        }
}
export default Pol;