// Javascript
import React, { Component } from 'react';
import { render } from 'react-dom';


export default class CreateSuggestionsForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            actionDone: false,
            fields : {}
        }
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
        fetch('/api/suggestion/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.fields)
        }).then(res => res.json()).then(
            (result) => {
                this.setState({actionDone: true})
            },
            (error) => {
                console.log(error)
            }
        );

    }

    render() {
        return (
            <div>
                <div className="container">
                    <h3>test create post</h3>
                    <form action="" onSubmit={this.handleSubmit}  method="post" >
                        <div className={this.state.actionDone ? 'row hidden' : 'row'}>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <input type="text" className="form-control" name="image"  placeholder="immagine" onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <textarea className="form-control" name="description" rows="3" placeholder="descrizione" onChange={this.handleInputChange}></textarea>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <button type="submit" className="btn btn-block btn-default" >Invia</button>
                            </div>
                        </div>
                        <div className={this.state.actionDone ? 'row' : 'row hidden'}>
                            ok done!
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

