// Javascript
import React, { Component } from 'react';
import { render } from 'react-dom';


export default class Article extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }


    render() {
        const contents = this.props.contents;
        const id = 'article-'+this.props.contents.id;
        return (
            <div className="panel panel-default article" id={id}>
                <div className="panel-heading">{contents.title}</div>
                <div className="panel-body">
                    <figure>
                        <img src={contents.image} />
                    </figure>
                    {contents.description}
                </div>
            </div>
        );
    }
}

<div class="panel panel-default">
    <div class="panel-body">Panel Content</div>
    <div class="panel-footer">Panel Footer</div>
</div>