import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, IndexRoute } from 'react-router-dom'
import { createStore } from 'redux'


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import rootReducer from './reducers/index.js';
import HomePage from './pages/homePage.jsx';
import AboutPage from './pages/aboutPage.jsx';

const store = createStore(rootReducer);

  
const NotFound = () => (
    <div>
        Page not found
    </div>
)

const App =() => (
    <Router>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/about" component={AboutPage} />
            <Route component={NotFound} />
        </Switch>
    </Router>    
);

render(
    <MuiThemeProvider>
        <Provider store={store}>
        <App/>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById("app")
);