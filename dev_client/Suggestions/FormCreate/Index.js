// Javascript
import React, { Component } from 'react';
import { render } from 'react-dom';

// Data
import {events, api} from '../../globals';


export default class CreateSuggestionsForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: {}
        };


        this.updateEvent = events.contentUpdate.event;
        this.api = api.create;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        let value;
        switch(event.target.type) {
            case 'file':
                value = target.files[0];
                break;
            case 'checkbox':
                value = target.checked;
                break;
            default:
                value = target.value;
        }
        this.state.fields[name] = value;
    }


    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData()
        const values = this.state.fields;
        for (const key in values) {
            data.append(key, values[key]);
        }

        fetch(this.api, {
                method: 'POST',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                // TODO: invece che un evento farsi dire dal response che callback fare:
                window.dispatchEvent(this.updateEvent);
            })
            .catch(error => {
                console.log(error);
            })
    }



render() {
        return (
            <div>
                <h3>Create post</h3>
                <form action="" onSubmit={this.handleSubmit}  method="post" encType="multipart/form-data" >
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group">
                                <input type="file" className="form-control" name="image"  onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="title" rows="3" placeholder="titolo" onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" name="description" rows="3" placeholder="descrizione" onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <button type="submit" className="btn btn-primary" >Invia</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

