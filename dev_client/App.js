// Javascript
import React, { Component } from 'react';
import { render } from 'react-dom';
import { _ } from "lodash";

// Components
import CrudForm from './CrudForm';

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
                <CrudForm />
            </div>
        );
    }
}


render(<Suggestions />, document.getElementById('app'));