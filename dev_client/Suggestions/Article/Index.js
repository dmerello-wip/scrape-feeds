import React, { Component } from 'react';
import { render } from 'react-dom';


import FormUpdate from '../FormUpdate';

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
        fetch(this.api, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id : this.props.contents.id})
        }).then(res => res.json()).then(
            (result) => {
                console.log(result);
                window.dispatchEvent(this.updateEvent);
            },
            (error) => {
                console.log(error)
            }
        );
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
            updaterDom = <FormUpdate itemId={contents.id} />;
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
