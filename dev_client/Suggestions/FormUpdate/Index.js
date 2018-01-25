import React, { Component } from 'react';
import { render } from 'react-dom';

// Data
import {events, api} from '../../globals';


export default class UpdateSuggestionsForm extends Component {

    //TODO: fare un componente notifiche
    constructor(props) {
        super(props);

        this.state = {
            fields: {
                id : this.props.itemId
            }
        };

        this.updateEvent = events.contentUpdate.event;
        this.api = api.update;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.state.fields[name] = value;
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch(this.api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.fields)
        }).then(res => res.json()).then(
            (result) => {
                this.setState({
                    actionDone: true,
                    fields: {}
                });
                console.dir(result);
                window.dispatchEvent(this.updateEvent);
            },
            (error) => {
                this.setState({
                    actionDone: true
                });
                console.dir(error)
            }
        );

    }


    render() {
        return (
            <div>
                <h3>Update post</h3>
                <form action="" onSubmit={this.handleSubmit} method="post">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group">
                                <input type="text" className="form-control" name="title" rows="3" placeholder="titolo" onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" name="description" rows="3" placeholder="descrizione"
                                          onChange={this.handleInputChange}/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="image" placeholder="immagine"
                                       onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <button type="submit" className="btn btn-primary">Invia</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

