// Javascript
import React, { Component } from 'react';
import { render } from 'react-dom';
import { _ } from "lodash";

// Components
import FormCreate from './Suggestions/FormCreate';
import FormUpdate from './Suggestions/FormUpdate';
import FormRemove from './Suggestions/FormRemove';

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
            <div>
                <h1>Welcome Dude!</h1>
                <FormCreate />
                <FormUpdate />
                <FormRemove />
            </div>
        );
    }
}


render(<Suggestions />, document.getElementById('app'));