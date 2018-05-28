// Javascript
import React, { Component } from 'react';
import { render } from 'react-dom';

// Data
import {events, api} from '../../globals';

export default class FormLogin extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <a href="/auth/google" className="btn-primary" >login with google</a>
            </div>
        );
    }
}

