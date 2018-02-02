// Javascript
import React, { Component } from 'react';
import { render } from 'react-dom';
import FileDrop from 'react-file-drop';

// Data
import {events, api} from '../../globals';

// Styles


export default class CreateSuggestionsForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: {
                id : (this.props.itemId) ? this.props.itemId : null
            }
        };

        this.updateEvent = events.contentUpdate.event;
        this.api = (this.props.itemId) ? api.update : api.create;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileDrop = this.handleFileDrop.bind(this);
        this.fileLoaded = this.fileLoaded.bind(this);
    }

    componentDidMount() {
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        let value;
        switch(event.target.type) {
            case 'file':
                // input file (alternative to file drop)
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

    handleFileDrop(files, event) {
        // limit to one file:
        let file    = event.dataTransfer.files[0];
        // get it for db
        this.setState({
            fields: {
                image : file
            }
        });
        // render it in preview
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = this.fileLoaded;
    }

    fileLoaded(e){
        this.setState({
            previewImage : e.target.result
        });
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
                window.dispatchEvent(this.updateEvent);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        let image = this.state.previewImage;
        return (
            <div>
                <form action="" onSubmit={this.handleSubmit}  method="post" encType="multipart/form-data" >
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control" name="title"  onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group">
                                <div className="drop-zone">
                                    <FileDrop frame={document} onDrop={this.handleFileDrop}></FileDrop>
                                </div>
                                <img src={image} />
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

