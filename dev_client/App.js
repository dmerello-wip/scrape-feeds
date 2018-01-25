// Javascript
import React, { Component } from 'react';
import { render } from 'react-dom';
import { _ } from "lodash";

// Components
import FormCreate from './Suggestions/FormCreate';
import FormUpdate from './Suggestions/FormUpdate';
import FormRemove from './Suggestions/FormRemove';
import List from './Suggestions/List';

// Styles
import './less/style.less';


export default class Suggestions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dbPending : false
        };

        this.apiBaseUrl = 'api/suggestion';
        this.api = {
            create  : this.apiBaseUrl + '/create',
            update  : this.apiBaseUrl + '/update',
            delete  : this.apiBaseUrl + '/delete',
            get     : this.apiBaseUrl + '/get'
        }

        this.events = {
            contentUpdate: {
                label : 'contentUpdate',
                event : new CustomEvent('contentUpdate')
            }
        }
    }

    componentDidMount() {

    }


    render() {
        return (
            <div className="container">
                <h1>ciao</h1>
                <div className="row">
                    <div className="col-md-6">
                        <List api={this.api.get} updateEventName={this.events.contentUpdate.label}/>
                    </div>
                    <div className="col-md-6">
                        <FormCreate api={this.api.create} updateEvent={this.events.contentUpdate.event}/>
                        <FormUpdate api={this.api.update} updateEvent={this.events.contentUpdate.event}/>
                        <FormRemove api={this.api.delete} updateEvent={this.events.contentUpdate.event}/>
                    </div>
                </div>
            </div>
        );
    }
}


render(<Suggestions />, document.getElementById('app'));