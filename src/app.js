import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Sample from './components/Sample';


export const App = () => (
  <Fragment>
    <Router history={createBrowserHistory()}>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/sample" component={Sample}/>
      </Switch>
    </Router>
  </Fragment>
);
