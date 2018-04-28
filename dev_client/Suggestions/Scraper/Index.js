// Javascript
import React, {Component} from 'react';
import {render} from 'react-dom';
import {Redirect} from 'react-router-dom';
// Data
import {api, events} from '../../globals';

// Styles

export default class ScraperForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            notifications: []
        };
        //set the correct api to call
        this.api = api.suggestion.scrape;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        this.state.fields[target.name] = event.target.value;
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        const fieldsValues = this.state.fields;
        for (const key in fieldsValues) {
            data.append(key, fieldsValues[key]);
        }
        fetch(this.api, {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    console.log('scraper service called');

                    this.setState({ notifications: [] });
                    // this.setState({saved: true});
                } else {
                    this.setState({ notifications: data.message });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        let notifications = this.state.notifications;
        const notificationClass = (notifications.length > 0) ? 'alert alert-danger' : 'hidden';
        if (this.state.saved) {
            return <Redirect to='/list'/>;
        } else {
            return (
                <div>
                    <form action="" onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
                        <div className={notificationClass} >
                            <ul>
                                {notifications.map((msg, i) =>
                                    <li key={'field_'+i}><strong>{msg.name}:</strong> {msg.message}</li>
                                )}
                            </ul>
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" name="url"
                                   onChange={this.handleInputChange} placeholder="https://somedomain.est/etcetera"/>
                        </div>

                        <button type="submit" className="btn btn-primary">Scrape</button>
                    </form>
                </div>
            );
        }
    }
}
