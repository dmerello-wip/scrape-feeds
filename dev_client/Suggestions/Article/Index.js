import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

// Data
import {events, api} from '../../globals';


export default class Article extends Component {

    constructor(props) {
        super(props);

        this.state = {
            removed : false
        }

        this.remove = this.remove.bind(this);
        this.api = api.suggestion.delete;
    }

    componentDidMount() {
    }

    remove(e){
        e.preventDefault();
        const data = new FormData()
        data.append('id', this.props.contents.id);
        fetch(this.api, {
            method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(data => {
                this.setState({removed:true});
            })
            .catch(error => {
                console.log(error);
            });
    }

    getFooterPanel() {
        if (this.props.editable) {
            return (
            <div>
                <div className="panel-footer">
                    <button className="btn" onClick={this.remove}>remove</button>
                    <Link to={{
                        pathname: '/create',
                        state: { itemContents: this.props.contents }
                    }} className="btn" >edit</Link>
                </div>
            </div>
            );
        }
    }



    render() {
        const contents = this.props.contents;
        const footer = this.getFooterPanel();

        if(this.state.removed){
            return <Redirect to='/list'/>;
        } else {
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
                        {footer}
                    </div>
                </div>
            );
        }
    }
}
