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
      },
      headerMenuOpen: false
    };
    this.exceed = new Exceed();
    this.getConfig('config/layout.json');

    document.addEventListener('click', ()=>{
      this.setState({
        headerMenuOpen: false
      })
    })

  }
  setExceedApi = (path) => {
    this.exceed.use([{
      id: 'getConfig',
      urls: {
        production: `./${path.replace(/^\//, '')}`
      }
    }]);
  };
  getConfig = (path) => {
    this.setExceedApi(path);
    this.exceed
      .fetch({
        api: 'getConfig'
      }).then((config) => {
      this.setState({config});
    });
  };
  onTopMenuToggleClick = () => {
    this.setState({
      headerMenuOpen: true
    })
  };
  render() {
    const { header, footer } = this.state.config;
    return (
      <HashRouter>
        <div>
          <header className="pouch-header">
            <div className="pouch-cols-container">
              <Link className="pouch-logo" to="/">
                <img src="https://img.alicdn.com/tfs/TB1MZjRXHSYBuNjSspfXXcZCpXa-304-379.png" />
                PouchContainer
              </Link>
              <div className={`pouch-header-menu ${this.state.headerMenuOpen ? 'pouch-header-menu-open' : ''}`}>
                <img onClick={this.onTopMenuToggleClick} className="pouch-header-menu-toggle"
                     src="https://img.alicdn.com/tfs/TB1xSmoXGmWBuNjy1XaXXXCbXXa-200-200.png"/>
                <ul>
                  { _.map(header.menu, (item, key)=> {
                    return <li key={key}>
                      <a className={`pouch-header-${item.type}`} href={item.url}>{item.text}</a>
                    </li>
                    }) }
                </ul>
              </div>
            </div>
          </header>
          <div className="pouch-body">
            <Route exact path="/" component={PageHome}/>
            <Route path="/pouch/docs" component={PageDocs}/>
            <Route path="/community" component={PageCommunity}/>
          </div>
          <footer className="pouch-footer">
            <div className="pouch-cols-container">
              <div className="pouch-footer-cols">
                <div className="pouch-footer-col">
                  <dl className="pouch-footer-menu">
                    <img className="pouch-logo" height="45"
                         src="https://img.alicdn.com/tfs/TB1zf2aXmCWBuNjy0FhXXb6EVXa-282-104.png"/>
                  </dl>
                </div>
                { _.map(footer.menu, (item, key)=> {
                  return <div key={key} className="pouch-footer-col">
                    <dl className="pouch-footer-menu">
                      <dt>{item.text}</dt>
                      { _.map(item.children, (child, index)=> {
                        return <dd key={index}><a href={child.url}>{child.text}</a></dd>
                        })}
                    </dl>
                  </div>
                  }) }
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
