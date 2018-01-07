// Javascript
import React, { Component } from 'react';
import { render } from 'react-dom';


export default class UpdateSuggestionsForm extends Component {

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
                    <h3>test update post</h3>
                    <form action="api/suggestion/update" method="post">
                        <div className="row row-form-contact-1">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <input type="text" className="form-control" name="id"  placeholder="id" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <input type="text" className="form-control" name="image"  placeholder="immagine" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <textarea className="form-control" name="description" rows="3" placeholder="descrizione"></textarea>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <button type="submit" className="btn btn-block btn-default">Invia</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

