import React, { Component } from 'react';
import { render } from 'react-dom';


import FormCreate from '../FormCreate';

// Data
import {events, api} from '../../globals';


export default class Article extends Component {

    constructor(props) {
        super(props);

        this.state = {
            removed : false,
            editMode : false
        }

        this.remove = this.remove.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);

        this.updateEvent = events.contentUpdate.event;
        this.api = api.delete;
    }

    componentDidMount() {
    }

    remove(e){

        e.preventDefault();
        const data = new FormData()
        data.append('id', this.props.contents.id);
        console.log(data.entries());
        fetch(this.api, {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(data => {
                window.dispatchEvent(this.updateEvent);
            })
            .catch(error => {
                console.log(error);
            });
    }

    toggleEdit(){
        this.setState({
           editMode : !this.state.editMode
        });
    }

    render() {
        const contents = this.props.contents;
        const removingClass = (this.state.removed) ? 'hidden' : '';
        let updaterDom;
        if(this.state.editMode) {
            updaterDom = <FormCreate itemId={contents.id} />;
        } else {
            updaterDom = '';
        }

        return (
            <div>
                <div className="panel panel-default article" id={contents.id}>
                    <div className="panel-heading">{contents.title}</div>
                    <div className="panel-body">
                        <figure>
                            <img src={contents.image} />
                        </figure>
                        {contents.description}
                    </div>
                    <div className="panel-footer">
                        <button className="btn" onClick={this.remove}>remove</button>
                        <button className="btn" onClick={this.toggleEdit}>edit</button>
                    </div>
                </div>
                {updaterDom}
            </div>
        );
    }
}
