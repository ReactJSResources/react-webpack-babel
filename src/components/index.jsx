import React from 'react';
import { render } from 'react-dom';
import App from './app.jsx';
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAzPSc-CtNCs0zbU0KkIu5NzcRFnhkeabo",
    authDomain: "gridproject-fd25f.firebaseapp.com",
    databaseURL: "https://gridproject-fd25f.firebaseio.com",
    storageBucket: "gridproject-fd25f.appspot.com",
    messagingSenderId: "187144675114"
};
firebase.initializeApp(config);


render(<App/>, document.querySelector("#app"));
