import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Nav from './views/nav.jsx';
import Home from './views/home.jsx';

const App = () => (
    <MuiThemeProvider>
        <div>
            <Nav />
            <Home />
        </div>      
    </MuiThemeProvider>
  );

ReactDOM.render(<App />, document.getElementById('app'));