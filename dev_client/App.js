import React, { Component } from 'react';
import {render} from 'react-dom';
import { _ } from "lodash";

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'


// Components
import FormCreate from './Suggestions/FormCreate';
import List from './Suggestions/List';


//import { Router, Route, IndexRoute, IndexLink, Link, hashHistory } from 'react-router';

import Dashboard from "./Suggestions/Dashboard";

// Styles
import './less/style.less';

const App = () => (
    <Router>
        <div>
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/list">List</Link></li>
                        <li><Link to="/create">Create</Link></li>
                    </ul>
                </nav>
            </header>

            <Route exact path="/" component={Dashboard}/>
            <Route path="/create" component={FormCreate}/>
            <Route path="/list" component={List}/>
        </div>
    </Router>
)



// render(<Dashboard />, document.getElementById('app'));
render(<App />, document.getElementById('app'));