import React, { Component } from 'react';
import { render } from 'react-dom';


// Styles
import './style.less';

export default class DragField extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    preventDefault(event) {
        event.preventDefault();
    }

    drop(){
        event.preventDefault();
        let data;
        try {
            data = JSON.parse(event.dataTransfer.getData('text'));
        } catch (e) {
            // If the text data isn't parsable we'll just ignore it.
            return;
        }
        // Do something with the data
        console.log(data);
        this.callback(data);
    }


    render() {
        return (
            <div className="drag-field" onDragOver={this.preventDefault} onDrop={this.drop}>
                Drop
            </div>
        );
    }
}