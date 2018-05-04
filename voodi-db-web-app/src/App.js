import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux'


import { MuiThemeProvider, createMuiTheme, spacing } from 'material-ui/styles';


import './App.css';
import Request from './services/request';

import Footer from './containers/footer.jsx';
import HomeIndexPage from './pages/home/index';
import AccountSigninPage from './pages/account/signin';
import AdminIndexPage from './pages/admin/index';
import AboutPage from './pages/aboutPage';
import TreeView, { flatToNested } from './components/treeview/treeView';

import authorize from './services/authorization';
import TokenInfo from './models/tokenInfo';
import i18n from './localization/i18n';

const NotFound = () => (
  <div>
    Page not found
    </div>
)

const ForbiddenPage = () => (
  <div>
    This content is forbidden to you.
  </div>
)

class TreeViewTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNode: null,
      nodes: []
    }
  }



  componentWillMount = async () => {
    const list = await Request.get('/api/departments');
    const items = list.Items.map(item => ({
      id: item.Id,
      pid: item.ParentId,
      title: item.Name,
      content: (<div onClick={e => this.setState({ selectedNode: items.find(x => x.id === item.Id) })}>{item.Name}</div>)
    }));

    const flatData = flatToNested(items, 'id', 'pid', null);
    this.setState({
      selectedNode: null,
      nodes: flatData,
      test: 'atta'
    });
  }

  render() {
    const { selectedNode, nodes } = this.state;
    return (
      <div>
        <p>
          {
            selectedNode && <span>{selectedNode.title}</span>
          }
        </p>
        <TreeView nodes={nodes} />
      </div>
    );
  }
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#819ca9',
      main: '#546e7a',
      dark: '#29434e',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#1976d2',
      main: '#63a4ff',
      dark: '#004ba0',
      contrastText: '#ffffff',
    },
  },
  overrides: {
    MuiList: {
      padding: {
        paddingTop: 0,
        paddingBottom: 0
      }
    }
  }
});

class App extends React.Component {
  render() {
    let lang = this.props.lang ? this.props.lang : 'en';
    addLocaleData([i18n[lang]]);
    return (
      <MuiThemeProvider theme={theme}>
        <IntlProvider locale={lang} messages={i18n[lang].messages}>
          <div>
            <BrowserRouter>
              <Switch>
                <Route exact path={HomeIndexPage.GetRoutePath()} component={authorize(["Administrator", "User"], AccountSigninPage.GetRoutePath())(HomeIndexPage)} />
                <Route path={AccountSigninPage.GetRoutePath()} component={AccountSigninPage} />
                <Route path="/admin" component={authorize(["Administrator"], AccountSigninPage.GetRoutePath())(AdminIndexPage)} />
                <Route path="/about" component={authorize(["Guest"])(AboutPage)} />
                <Route path="/forbidden" component={ForbiddenPage} />
                <Route path="/treeview/test" component={TreeViewTest} />
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
  lang: state.lang,
  user: new TokenInfo(state.token)
});

export default connect(mapStateToProps)(App);