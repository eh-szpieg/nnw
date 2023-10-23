import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

class Chat extends Component {
    render() {
        return (
                <div>
                    <p>{this.props.value}</p>
                    {this.props.wait === true && (<div className="spinner-border text-primary" role="status"></div>)}
                </div>
            );
        }
    }

export default Chat;