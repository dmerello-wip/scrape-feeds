// Javascript
import React, { Component } from 'react';
import { render } from 'react-dom';


export default class RemoveSuggestionsForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            actionDone: false,
            fields: {}
        };
        this.api = props.api;
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
                console.log(result);
            },
            (error) => {
                this.setState({
                    actionDone: true
                });
                console.log(error)
            }
        );

    }


    render() {
        return (
            <div>
                <h3>Remove post</h3>
                <div className={this.state.actionDone ? 'alert alert-success' : 'hidden'}>
                    Ok, done!
                </div>
                <form action="api/suggestion/delete" onSubmit={this.handleSubmit} method="post">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group">
                                <input type="text" className="form-control" name="id" placeholder="id"
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

