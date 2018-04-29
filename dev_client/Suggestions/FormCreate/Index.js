// Javascript
import React, { Component } from 'react';
import { render } from 'react-dom';
import FileDrop from 'react-file-drop';
import { Redirect } from 'react-router-dom';
// Data
import { api, events } from '../../globals';
import { WithContext as ReactTags } from 'react-tag-input';

// Styles


export default class CreateSuggestionsForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            previewImage: 'images/draghere.jpg',
            fields: {},
            tags: [],
            tagSuggest: [],
            notifications: [],
            saved: false,
        };
        // tags: [{ id: 1, text: "Thailand" }],
        // tagSuggest: ['USA']


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileDrop = this.handleFileDrop.bind(this);
        this.fileLoaded = this.fileLoaded.bind(this);

        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleTagAddition = this.handleTagAddition.bind(this);
        this.handleTagDrag = this.handleTagDrag.bind(this);
    }

    componentDidMount() {
        this.checkIfEditOrCreate();
        this.getSuggestedTags();
    }

    getSuggestedTags() {
        fetch(api.tag.get , {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                let suggested = [];
                for (const key in data.message) {
                    suggested.push(data.message[key].name);
                }
                this.setState({
                    tagSuggest: suggested
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleTagDelete(i) {
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
    }

    handleTagAddition(tag) {
        let tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
    }

    handleTagDrag(tag, currPos, newPos) {
        let tags = this.state.tags;

        // mutate array
        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: tags });
    }

    checkIfEditOrCreate(){
        // get state from routing inherit properties:
        const ingoingState = this.props.location.state;
        // if it exist, the form edits
        if(ingoingState){
            // from the tags array to the tag object expected from tag component:
            let tags = ingoingState.itemContents.tags;
            tags.forEach(function (value, i) {
                tags[i] = { id: i , text : value }
            });
            // remove tags from contents
            delete ingoingState.itemContents.tags;
            this.setState({
                previewImage: ingoingState.itemContents.image,
                fields: ingoingState.itemContents,
                tags: tags
            });
            // set the correct api to call
            this.api = api.suggestion.update;
        } else {
            // no inherit state: the form creates
            // set the correct api to call
            this.api = api.suggestion.create;
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        let value;
        switch (event.target.type) {
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
        let file = event.dataTransfer.files[0];
        // get it for db
        this.state.fields.image = file;
        // render it in preview
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = this.fileLoaded;
    }

    fileLoaded(e) {
        this.setState({
            previewImage: e.target.result
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        const fieldsValues = this.state.fields;
        const tagsValues = this.state.tags;
        const tagsToPost = [];
        for (const key in fieldsValues) {
            data.append(key, fieldsValues[key]);
        }
        for (const key in tagsValues) {
            tagsToPost.push(tagsValues[key].text);
        }
        data.append('tags',tagsToPost);

        fetch(this.api, {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(data => {
                if(data.code === 200) {
                    this.setState({ saved: true });
                } else {
                    this.setState({ notifications: data.message });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        let image = this.state.previewImage;
        let contents = this.state.fields;
        let notifications = this.state.notifications;
        const notificationClass = (notifications.length > 0) ? 'alert alert-danger' : 'hidden';
        const { tags, tagSuggest } = this.state;
        let dropZoneStyle = {
            backgroundSize: 'cover',
            backgroundImage: "url(" + image + ")"
        };
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
                            <input type="text" className="form-control" name="title"
                                   onChange={this.handleInputChange} placeholder={contents.title}/>
                        </div>
                        <div className="form-group">
                            <div className="drop-zone" style={dropZoneStyle}>
                                <FileDrop frame={document} onDrop={this.handleFileDrop} />
                            </div>
                        </div>
                        <ReactTags tags={tags}
                                   suggestions={tagSuggest}
                                   handleDelete={this.handleTagDelete}
                                   handleAddition={this.handleTagAddition}
                                   handleDrag={this.handleTagDrag} />
                        <div className="form-group">
                            <textarea className="form-control" name="description" rows="3"
                                      placeholder={contents.description} onChange={this.handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Url</label>
                            <input type="text" className="form-control" name="url"
                                   onChange={this.handleInputChange} placeholder={contents.url}/>
                        </div>

                        <button type="submit" className="btn btn-primary">Invia</button>
                    </form>
                </div>
            );
        }
    }
}

