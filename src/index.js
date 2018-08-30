import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Config from './FirebaseConfig/Config';
import registerServiceWorker from './registerServiceWorker';
// multi theme
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// multi
ReactDOM.render(<MuiThemeProvider><App /></MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
