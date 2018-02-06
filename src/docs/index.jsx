import React from 'react';
import Exceed from 'exceed';
import path from 'path';
import _ from 'lodash';
import MarkdownIt from 'markdown-it';
import markdownItReplaceLink from "markdown-it-replace-link";
import markdownItTocAndAnchor from 'markdown-it-toc-and-anchor';
import markdownItLinkAttributes from 'markdown-it-link-attributes';
import hljs from 'highlight.js';
import { animateScroll, scroller } from 'react-scroll'

import MenuItem from './menuItem.jsx';

import 'highlight.js/styles/github.css';
import '../components/markdown.scss';
import './index.scss';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: null,
      docPath: '',
      config: {
        banner: {},
        menu: []
      }
    };
    this.exceed = new Exceed();
    this.setMd('');
    this.getConfig('config/docs.json');
    this.getMarkdown(props.location.pathname);
  }
  componentDidMount = ()=> {
    window.addEventListener('hashchange', this.onHashChange);
    document.getElementsByClassName('pouch-doc-body')[0].addEventListener('click', this.onAnchorClick);
  };
  setMd = (docPath)=> {
    docPath = `/${docPath}`
    this.md = new MarkdownIt({
      html: true,
      typographer: true,
      highlight: (str, lang) => {
        lang = _.isEmpty(lang) || lang==='shell' ? 'bash' : lang;
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value;
          } catch (__) {}
        }
        return '';
      },
      replaceLink: (link) => {
        if(link.match(/^(http|\/\/)/i)){

        } else if(link.match(/static_files\/.*\.(gif|jpeg|png|jpg|bmp)/i)){
          link = `${path.join(docPath, link)}`;
        } else  {
          link = `#${docPath}/${link}`;
        }
        return link;
      }
    })
      .use(markdownItLinkAttributes, [
        {
          pattern: /^(http|\/\/)/i,
          attrs: {
            target: '_blank'
          }
        }, {
          attrs: {
            className: 'pouch-doc-link'
          }
        }
      ])
      .use(markdownItReplaceLink)
      .use(markdownItTocAndAnchor, {
        anchorLink: false
      });
  };
  setExceedApi = (path) => {
    this.exceed.use([{
      id: 'getConfig',
      urls: {
        production: path
      }
    }]);
  };
  onAnchorClick = (e) => {
    const target = e.target;
    if(target.getAttribute('class')==='pouch-doc-link' && target.hash) {
      const hash = _.reject(target.hash.split('#'), (str)=> {
        return _.isEmpty(str);
      });
      if(hash.length > 1){
          const id = hash[hash.length-1];
          scroller.scrollTo(id, {
            duration: 1000,
            smooth: "easeInOutQuint"
          });
          e.preventDefault();
      }
    }
  };
  onHashChange = () => {
    this.getMarkdown(window.location.hash.replace(/^#/, ''));
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
    const docPath = _.reject(path.split('/'), (item)=>{return _.isEmpty(item) || item.match(/\.md/i) }).join("/");
    this.exceed
      .fetch({
        api: 'getConfig'
      }).then((res) => {
      this.setMd(docPath);
      this.setState({
        doc: this.md.render(_.isString(res) ? res : '')
      });
    }).fail((err) => {
      this.setState({
        doc: '<div style="text-align: center;padding: 50px 0"><img width="45%" src="https://img.alicdn.com/tfs/TB1CyRNjBTH8KJjy0FiXXcRsXXa-840-600.png" /></div>'
      });
    });
  };
  render() {
    const { menu, banner } = this.state.config;
    const { location } = this.props;
    return (
      <div>
        <div className="pouch-docs-banner">
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
        <div className="pouch-cols-container">
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
      </div>
    );
  }
}
