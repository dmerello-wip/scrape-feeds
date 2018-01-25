import React, { Component } from 'react';
import { render } from 'react-dom';
import { _ } from "lodash";

// Data
import {events, api} from './globals';

// Components
import FormCreate from './Suggestions/FormCreate';
import List from './Suggestions/List';

// Styles
import './less/style.less';


export default class Suggestions extends Component {

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


render(<Suggestions />, document.getElementById('app'));