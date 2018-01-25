import React, { Component } from 'react';
import { render } from 'react-dom';

// Data
import {events, api} from '../../globals';

// Components
import FormCreate from '../FormCreate';
import List from '../List';


export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.events = events;
        this.api = api;

    }

    componentDidMount() {

    }


    render() {
        return (
            <div className="container">
                <h1>ciao</h1>
                <div className="row">
                    <div className="col-md-6">
                        <List/>
                    </div>
                    <div className="col-md-6">
                        <FormCreate />
                    </div>
                </div>
            </div>
        );
    }
}