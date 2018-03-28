import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavigationBar from '../containers/NavigationBar.js'
import HomePage from '../pages/HomePage.jsx';

const About = () => (
  <div>
    About page
  </div>
)

const NotFound = () => (
  <div>
    Page not found
  </div>
)

const App = () => (
  <div>
    <NavigationBar />
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={About} />
        <Route componen={NotFound} />
      </Switch>
    </Router>
  </div>
)

export default App
