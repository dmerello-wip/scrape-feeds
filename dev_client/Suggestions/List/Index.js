// Javascript
import React, { Component } from 'react';
import { render } from 'react-dom';
import Article from '../Article';

// Data
import {events, api} from '../../globals';

export default class List extends Component {
    //TODO: update the list once a new entry is created

    constructor(props) {
        super(props);

        this.state = {
            items : []
        };
        this.api = api.suggestion.get;
    }

    componentDidMount() {
        this.fetchContents();
    }

    fetchContents() {
        const jsonUrl = this.api;

        if (jsonUrl === undefined) {
            throw new Error('api not responding to react app');
        }
        fetch(jsonUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: result.message
                    });
                    //console.dir(this.state.items);
                },
                (error) => {console.log(error)}
            );
    }


    render() {
        const items = this.state.items;
        return (
            <div>
                {items.map((item) =>
                    <Article key={item.id} contents={item} />
                )}
            </div>
        );
    }
}

