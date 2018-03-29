import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {IntlProvider, addLocaleData} from 'react-intl';
import { connect } from 'react-redux'


import {cyan500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';

import NavigationBar from './containers/navigationBar.jsx';
import Footer from './containers/footer.jsx';
import HomePage from './pages/homePage.jsx';
import AboutPage from './pages/aboutPage.jsx';




let i18nConfigRu = {
  locale: 'ru',
  messages: {
    "button.signin": "Войти",
    "title.signin": "Вход"
  },
  pluralRuleFunction: function() { return ""; }
};

let i18nConfigEn = {
  locale: 'en',
  messages: {
    "button.signin": "Sign in",
    "title.signin": "Sirning"
  },
  pluralRuleFunction: function() { return ""; }
};

const i18nConfig = {
  "ru": i18nConfigRu,
  "en": i18nConfigEn
}

const NotFound = () => (
    <div>
        Page not found
    </div>
)

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});

class App extends React.Component {  
  constructor(props) {
    super(props);
  }
  render() {
    let lang = this.props.lang ? this.props.lang : 'en';
    addLocaleData([i18nConfig[lang]]);
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <IntlProvider locale={lang} messages={i18nConfig[lang].messages}>
        <div>
          <NavigationBar />
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/about" component={AboutPage} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
          <Footer />
        </div>        
        </IntlProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  lang: state.lang
});

export default connect(mapStateToProps)(App);