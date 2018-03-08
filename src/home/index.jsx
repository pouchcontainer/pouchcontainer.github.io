import React from 'react';
import ReactDom from 'react-dom';
import Exceed from 'exceed';

import './index.scss';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {}
    };
    this.exceed = new Exceed();
    this.getConfig('config/home.json');
  }
  setExceedApi = (path) => {
    this.exceed.use([{
      id: 'getConfig',
      urls: {
        production: path
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

  renderBanner = ()=> {
    const { banner } = this.state.config;
    if(!_.isEmpty(banner)) {
      return (
        <div className="pouch-home-banner-content">
          <h1>{banner.title}</h1>
          <p>{banner.description}</p>
          <br/>
          <a className="pouch-banner-btn pouch-banner-btn-white" href={banner.button.url}>
            {banner.button.text}
          </a>
        </div>
      )
    }
  };
  renderAdvantages = ()=> {
    const { advantages } = this.state.config;
    if(!_.isEmpty(advantages)) {
      return (
        <div className="pouch-cols-container pouch-home-advantages">
          <h1>Advantages</h1>
          <div className="pouch-home-advantages-item">
            <div className="pouch-home-advantages-item-img">
              <img src="https://img.alicdn.com/tfs/TB1HU1AXTtYBeNjy1XdXXXXyVXa-1200-1000.png"/>
            </div>
            <div className="pouch-home-advantages-item-content">
              <h2>{advantages[0].title}</h2>
              <div className="pouch-home-advantages-devider"></div>
              <p>{advantages[0].description}</p>
              <ul>
                {_.map(advantages[0].children, (child)=> {
                  return <li>{child}</li>;
                  })}
              </ul>
            </div>
          </div>
          <div className="pouch-home-advantages-item">
            <div className="pouch-home-advantages-item-content">
              <h2>{advantages[1].title}</h2>
              <div className="pouch-home-advantages-devider"></div>
              <p>{advantages[1].description}</p>
              <ul>
                {_.map(advantages[1].children, (child)=> {
                  return <li>{child}</li>;
                  })}
              </ul>
            </div>
            <div className="pouch-home-advantages-item-img">
              <img src="https://img.alicdn.com/tfs/TB1JU1AXTtYBeNjy1XdXXXXyVXa-1200-1002.png"/>
            </div>
          </div>
        </div>
      )
    }
  };
  renderFeatures = ()=> {
    const { features } = this.state.config;
    return (
      <ul className="pouch-home-features">
        {
          _.map(features, (feature)=> {
            return (
            <li>
              <img src={feature.img}/>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </li>
              )
            })
          }
      </ul>
    )
  };
  renderArchitecture = () => {
    const { architecture } = this.state.config;
    if(!_.isEmpty(architecture)) {
      return (
        <div className="pouch-home-architecture">
          <h1>{architecture.title}</h1>
          <p>{architecture.description}</p>
          <br/><br/>
          <a className="pouch-banner-btn pouch-banner-btn-orange" href={architecture.button.url}>
            {architecture.button.text}
          </a>
        </div>
      )
    }
  };
  render() {
    const { introduction } = this.state.config;
    return (
      <div className="pouch-home-body">
        <div className="pouch-home-banner">
          <div className="pouch-cols-container">
            <img className="pouch-home-banner-img" src="https://img.alicdn.com/tfs/TB1VCQyXpOWBuNjy0FiXXXFxVXa-434-762.png"/>
            <div className="pouch-home-banner-rotate-img-wrap">
              <img className="pouch-home-banner-rotate-img pouch-home-banner-rotate-img-1" src="https://img.alicdn.com/tfs/TB1E33GXwmTBuNjy1XbXXaMrVXa-856-856.png"/>
              <img className="pouch-home-banner-rotate-img pouch-home-banner-rotate-img-2" src="https://img.alicdn.com/tfs/TB1Iw3GXwmTBuNjy1XbXXaMrVXa-1188-1188.png"/>
              <img className="pouch-home-banner-rotate-img pouch-home-banner-rotate-img-3" src="https://img.alicdn.com/tfs/TB1lskJXqmWBuNjy1XaXXXCbXXa-1576-1576.png"/>
            </div>
            { this.renderBanner() }
          </div>
        </div>
        <div className="pouch-home-introduction">
          <div className="pouch-cols-container">
            <div className="pouch-home-introduction-title">
              <div className="pouch-home-introduction-title-bg">?</div>
              <div  className="pouch-home-introduction-title-text">What is <span>PouchContainer</span></div>
            </div>
            <div className="pouch-home-introduction-content">{introduction}</div>
          </div>
        </div>
        {this.renderAdvantages()}
        <div className="pouch-cols-container ">
          {this.renderFeatures()}
        </div>
        {this.renderArchitecture()}

      </div>
    );
  }
}
