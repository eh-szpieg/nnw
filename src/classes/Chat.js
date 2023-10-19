import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

class Chat extends Component {
    render() {
        return (
                <div>
                    <p>{this.props.value}</p>
                </div>
            );
        }
    }

export default Chat;