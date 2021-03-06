import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import netlifyIdentity from 'netlify-identity-widget';
import ReactGA from 'react-ga';

// Utilize google analytics
ReactGA.initialize('UA-201254265-1');
ReactGA.pageview(window.location.pathname + window.location.search);

// Utilize netlify identity
netlifyIdentity.init();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
