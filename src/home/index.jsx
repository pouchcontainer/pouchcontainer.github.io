import React from 'react';
import ReactDom from 'react-dom';


import './index.scss';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="pouch-home-body">
        <div className="pouch-home-banner">
          <img className="pouch-home-banner-bg" src="https://img.alicdn.com/tfs/TB1LEsTXqmWBuNjy1XaXXXCbXXa-3840-1120.png"/>
          <div className="pouch-cols-container">
            <img className="pouch-home-banner-img" src="https://img.alicdn.com/tfs/TB1VCQyXpOWBuNjy0FiXXXFxVXa-434-762.png"/>
            <div className="pouch-home-banner-rotate-img-wrap">
              <img className="pouch-home-banner-rotate-img pouch-home-banner-rotate-img-1" src="https://img.alicdn.com/tfs/TB1E33GXwmTBuNjy1XbXXaMrVXa-856-856.png"/>
              <img className="pouch-home-banner-rotate-img pouch-home-banner-rotate-img-2" src="https://img.alicdn.com/tfs/TB1Iw3GXwmTBuNjy1XbXXaMrVXa-1188-1188.png"/>
              <img className="pouch-home-banner-rotate-img pouch-home-banner-rotate-img-3" src="https://img.alicdn.com/tfs/TB1lskJXqmWBuNjy1XaXXXCbXXa-1576-1576.png"/>
            </div>
            <div className="pouch-home-banner-content">
              <h1>Pouch - An Efficient Container Engine</h1>
              <p>Pouch is an open-source project created by Alibaba Group to promote the container technology movement.</p>
              <br/>
              <a className="pouch-banner-btn pouch-banner-btn-white" href="javascript:void(0)">
                Get Started
              </a>
            </div>
          </div>
        </div>
        <div className="pouch-home-introduction">
          <div className="pouch-cols-container">
          <img src="https://img.alicdn.com/tfs/TB1D_gQXqmWBuNjy1XaXXXCbXXa-304-206.png" />
          <div className="pouch-home-introduction-content">
            Pouch is a highly reliable container engine open sourced by Alibaba. It is an excellent software layer to fill up gap between business applications and underlying infrastructure. The strong-isolation ability and rich container are its representitive features.
          </div>
          </div>
        </div>
        <div className="pouch-cols-container pouch-home-advantages">
          <h1>Advantages</h1>
          <div className="pouch-home-advantages-item pouch-home-advantages-item-1">
            <img src="https://img.alicdn.com/tfs/TB1HU1AXTtYBeNjy1XdXXXXyVXa-1200-1000.png"/>
            <h2>Resource Utilization</h2>
            <div className="pouch-home-advantages-devider"></div>
            <div>
              <p>Pouch significantly improves resource utilization:</p>
              <p>- Pouch is compatible with OCI image spec. Applications can minimize their storage usage with layered image structure.</p>
              <p>- Incremental image distribution, saves datacenter bandwidth consumption.</p>
              <p>- Significantly less runtime overhead than VM-based technologies.</p>
            </div>
          </div>
          <div className="pouch-home-advantages-item pouch-home-advantages-item-2">
            <img src="https://img.alicdn.com/tfs/TB1JU1AXTtYBeNjy1XdXXXXyVXa-1200-1002.png"/>
            <h2>Application Centric</h2>
            <div className="pouch-home-advantages-devider"></div>
            <div>
              <p>Pouch offers a more "application centric" approach for application development:</p>
              <p>- Pouch provides strong runtime isolation between applications, with cutting-edge technology both within kernel support and beyond kernel mode.</p>
              <p>- Pouch enables cross-platform and cross-OS application delivery.</p>
              <p>- Pouch supports standardized application image spec, so application sharing and reusing becomes trivial for developers and operators.</p>
            </div>
          </div>
        </div>
        <ul className="pouch-cols-container pouch-home-features">
          <li>
            <img src="https://img.alicdn.com/tfs/TB1zWxzXuuSBuNjy1XcXXcYjFXa-78-80.png"/>
            <h2>Strong-Isolation</h2>
            <p>Pouch is designed to be secure by default. Include lots of security features, like hypervisor-based container technology, lxcfs, patched Linux kernel and so on.</p>
          </li>
          <li>
            <img src="https://img.alicdn.com/tfs/TB1XujgXDtYBeNjy1XdXXXXyVXa-78-80.png"/>
            <h2>Rich Container</h2>
            <p>Besides the common ways of running container, Pouch includes a rich container mode, which integrates more services, hooks, and many others container internals to guarantee container's running like usual.</p>
          </li>
          <li>
            <img src="https://img.alicdn.com/tfs/TB1RclwXwmTBuNjy1XbXXaMrVXa-78-80.png"/>
            <h2>P2P Image Distribution</h2>
            <p>Pouch utilizes Dragonfly, a P2P-base distribution system, to achieve lightning-fast container image distributio</p>
          </li>
          <li>
            <img src="https://img.alicdn.com/tfs/TB1FqxzXuuSBuNjy1XcXXcYjFXa-78-80.png"/>
            <h2>Kernel Compatibility</h2>
            <p>Enables OCI-compatible runtimes to work on old kernel versions, like linux kernel 2.6.32+.</p>
          </li>
          <li>
            <img src="https://img.alicdn.com/tfs/TB1BGxzXuuSBuNjy1XcXXcYjFXa-78-80.png"/>
            <h2>Stability</h2>
            <p>Pouch has been running on tens of thousand nodes in Alibaba stablely, and helped all online transactions of Alibaba's 2017 Singles Day smoothly on millions of containers.</p>
          </li>
          <li>
            <img src="https://img.alicdn.com/tfs/TB1DWxzXuuSBuNjy1XcXXcYjFXa-78-80.png"/>
            <h2>Simplicity</h2>
            <p>Very few steps needed to setup Pouch and we will continue to evolve as the developer community works together.</p>
          </li>
        </ul>
        <div className="pouch-home-architecture">
          <img src="https://img.alicdn.com/tfs/TB1M29FXTtYBeNjy1XdXXXXyVXa-3840-1360.png"/>
          <h1>Architecture</h1>
          <p>We describe Pouch's architecture from two dimensions: ecosystem architecture which illustrates how Pouch fits into the container ecosystem and component architecture which describes the interactions between various components inside Pouch. For more details, please refer to file architecture.md.</p>
          <br/><br/>
          <a className="pouch-banner-btn pouch-banner-btn-orange" href="javascript:void(0)">
            Read the Architecture
          </a>
        </div>
      </div>
    );
  }
}
