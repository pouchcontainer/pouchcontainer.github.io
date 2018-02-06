import React from 'react';
import { Link } from 'react-router-dom';

export default class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.item.open
    };
  }
  renderSubMenu = () => {
    const { item, location } = this.props;

    if(location && location.pathname) {
      return (
        <ul className="pouch-doc-menu">
          { _.map(item.children, (child, index) => {
            const cls = `pouch-doc-menu-item ${location.pathname === child.url ? 'pouch-doc-menu-item-selected' : ''}`
            return (
            <li key={index}>
              <Link className={cls} to={child.url}>{child.text}</Link>
            </li>
              );
            }) }
        </ul>
      );
    }


  };
  onNavClick = (item)=> {
    if(item.url) {
      this.props.onNavClick(item)
    }
  };
  toggle = ()=> {
    this.setState({
      open: !this.state.open
    })
  };
  render() {
    const { item, location } = this.props;
    const hasChildren  = item.children && item.children.length;
    const style = {
      height: hasChildren && this.state.open ? 40 * ( item.children.length + 1 ) : 40
    };
    if(hasChildren) {
      const url = `/docs/${item.text.toLowerCase()}/README.md`;
      const cls = `pouch-doc-menu-item ${location.pathname === url ? 'pouch-doc-menu-item-selected' : ''}`
      return (
        <li style={style}>
          <a onClick={this.toggle} className={cls} href="javascript:void(0)">
            {item.text}
            <img style={{transform: `rotate(${this.state.open ? 0:-90}deg)`}} className="pouch-doc-menu-toggle" src="https://img.alicdn.com/tfs/TB1BMUGXh9YBuNjy0FfXXXIsVXa-22-21.jpg" />
          </a>
          { this.renderSubMenu() }
        </li>
      )
    } else {
      const cls = `pouch-doc-menu-item ${location.pathname === item.url ? 'pouch-doc-menu-item-selected' : ''}`
      return (
        <li style={style}>
          <Link className={cls} to={ item.url }>{item.text}</Link>
        </li>
      )
    }
  }
}
