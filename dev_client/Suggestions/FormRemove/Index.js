// Javascript
import React, { Component } from 'react';
import { render } from 'react-dom';


export default class RemoveSuggestionsForm extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div className="container">
                    <h3>test remove post</h3>
                    <form action="api/suggestion/delete" method="post">
                        <div className="row row-form-contact-1">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <input type="text" className="form-control" name="id"  placeholder="id" />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <button type="submit" className="btn btn-block btn-default">Invia</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

