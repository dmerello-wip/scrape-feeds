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

        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="container">
                <h1>Welcome Dude!</h1>
                <div className="row">
                    <div className="col-md-6">
                        <List api="api/suggestion/get"/>
                    </div>
                    <div className="col-md-6">
                        <FormCreate api="api/suggestion/create" />
                        <FormUpdate api="api/suggestion/update" />
                        <FormRemove api="api/suggestion/delete" />
                    </div>
                </div>
            </div>
        );
    }
}


render(<Suggestions />, document.getElementById('app'));