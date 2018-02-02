import React from 'react';
import Exceed from 'exceed';
import _ from 'lodash';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';

import MenuItem from './menuItem.jsx';

import 'highlight.js/styles/github.css';
import '../components/markdown.scss';
import './index.scss';


const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return '';
  }
});

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: null,
      config: {
        banner: {},
        menu: []
      }
    };
    this.exceed = new Exceed();
    this.getConfig('config/docs.json');
    this.getMarkdown(props.location.pathname);
    window.addEventListener('hashchange', this.onHashChange)
  }
  setExceedApi = (path) => {
    this.exceed.use([{
      id: 'getConfig',
      urls: {
        production: `./${path.replace(/^\//,'')}`
      }
    }]);
  };
  onHashChange = () => {
    const path = window.location.hash.replace(/^#/, '');
    this.getMarkdown(path);
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
  getMarkdown = (path) => {
    this.setExceedApi(path);
    this.exceed
      .fetch({
        api: 'getConfig'
      }).then((res) => {
      this.setState({
        doc: md.render(res)
      });
    });
  };
  render() {
    const { menu, banner } = this.state.config;
    const { location } = this.props;
    return (
      <div>
        <div className="pouch-docs-banner">
          <div className="pouch-docs-banner-inner">
            <img src="https://img.alicdn.com/tfs/TB1l4EFXeuSBuNjSsplXXbe8pXa-1932-600.png" />
            <div className="pouch-docs-banner-content">
              <h1>{banner.text}</h1>
              <div>
                { _.map(banner.buttons, (item, key) =>{
                  return <a key={key} className={`pouch-banner-btn pouch-banner-btn-${item.type}`} href={item.url}>
                    {item.text}
                  </a>
                }) }
              </div>
            </div>
          </div>
        </div>
        <div className="pouch-docs-container">
          <div className="pouch-doc-sidebar">
            <ul className="pouch-doc-menu">
              { _.map(menu, (item, key) => {
                return <MenuItem location={location} key={key} item={item} />;
              }) }
            </ul>
          </div>
          <div className="pouch-doc-body">
            <div className="markdown-body" dangerouslySetInnerHTML={{__html: this.state.doc}} />
          </div>
        </div>
      </div>
    );
  }
}
