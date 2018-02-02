import React from 'react';
import ReactDom from 'react-dom';
import Exceed from 'exceed';
import _ from 'lodash';
import PageHome from './home/index.jsx';
import PageDocs from './docs/index.jsx';
import PageCommunity from './community/index.jsx';

import {
  HashRouter,
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import './components/index.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        header: {},
        footer: {}
      }
    };
    this.exceed = new Exceed();
    this.getConfig('config/layout.json');
  }
  setExceedApi = (path) => {
    this.exceed.use([{
      id: 'getConfig',
      urls: {
        production: `./${path.replace(/^\//,'')}`
      }
    }]);
  };
  getConfig = (path) => {
    this.setExceedApi(path);
    this.exceed
      .fetch({
        api: 'getConfig'
      }).then((config) => {
      this.setState({ config });
    });
  };
  render() {
    const { header, footer } = this.state.config;
    return (
      <HashRouter>
        <div>
          <header className="pouch-header">
            <div className="pouch-footer-inner">
              <Link className="pouch-logo" to="/">
                <img src="https://img.alicdn.com/tfs/TB1Qv19XbGYBuNjy0FoXXciBFXa-185-64.png"/>
              </Link>
              <ul className="pouch-header-menu">
                { _.map(header.menu, (item, key)=> {
                  return <li key={key}>
                    <Link className={`pouch-header-${item.type}`} to={item.url}>{item.text}</Link>
                  </li>
                  }) }
              </ul>
            </div>
          </header>

        <div className="pouch-body">
          <Route exact path="/" component={PageHome}/>
          <Route path="/docs" component={PageDocs}/>
          <Route path="/community" component={PageCommunity}/>
        </div>

        <footer className="pouch-footer">
          <div className="pouch-footer-inner">
            <div className="pouch-footer-cols">
              <div className="pouch-footer-col">
                <img height="45" src="https://img.alicdn.com/tfs/TB1zf2aXmCWBuNjy0FhXXb6EVXa-282-104.png"/>
              </div>
              <div className="pouch-footer-col">
                <dl className="pouch-footer-menu">
                  <dt>GitHub</dt>
                  <dd><a href="javascript:void(0)">Getting Started</a></dd>
                  <dd><a href="javascript:void(0)">Introduction</a></dd>
                  <dd><a href="javascript:void(0)">Features</a></dd>
                  <dd><a href="javascript:void(0)">Architecture</a></dd>
                  <dd><a href="javascript:void(0)">CLI Manual</a></dd>
                  <dd><a href="javascript:void(0)">API Manual</a></dd>
                  <dd><a href="javascript:void(0)">FAQ</a></dd>
                </dl>
              </div>
              <div className="pouch-footer-col">
                <dl className="pouch-footer-menu">
                  <dt>Cotribution</dt>
                  <dd><a href="javascript:void(0)">Contributing</a></dd>
                  <dd><a href="javascript:void(0)">Reporting security issues</a></dd>
                  <dd><a href="javascript:void(0)">Reporting general issues</a></dd>
                  <dd><a href="javascript:void(0)">Code and doc contribution</a></dd>
                  <dd><a href="javascript:void(0)">Roadmap</a></dd>
                  <dd><a href="javascript:void(0)">Contact</a></dd>
                  <dd><a href="javascript:void(0)">License</a></dd>
                </dl>
              </div>
            </div>
            <div className="pouch-footer-copyright">
              Copyright &copy; 1999 - 2018 Alibaba Inc. All Rights Reserved.
            </div>
          </div>
        </footer>
        </div>
      </HashRouter>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
