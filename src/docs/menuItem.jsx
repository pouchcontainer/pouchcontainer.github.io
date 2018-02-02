import React from 'react';

export default class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.item.open
    };
  }
  renderSubMenu = () => {
    const { item, location } = this.props;
    return (
      <ul className="pouch-doc-menu">
        { _.map(item.children, (child, index) => {
          return (
          <li key={index}>
            <a className={location.pathname === child.url ? 'pouch-doc-menu-item-selected' : ''} href={child.url ? `#${child.url}` : 'javascript:void(0)' }>{child.text}</a>
          </li>
            );
          }) }
      </ul>
    );
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
    const img = <img style={{transform: `rotate(${hasChildren && this.state.open ? 0:-90}deg)`}} className="pouch-doc-menu-toggle" src="https://img.alicdn.com/tfs/TB1BMUGXh9YBuNjy0FfXXXIsVXa-22-21.jpg" />;
    return (
      <li style={{height: hasChildren && this.state.open ? 40 * ( item.children.length + 1 ) : 40}}>
        <a onClick={this.toggle} className={location.pathname === item.url ? 'pouch-doc-menu-item-selected' : ''} href={item.url ? `#${item.url}` : 'javascript:void(0)' }>
          { item.text }
          { hasChildren ? img : null }
        </a>
        { hasChildren ?  this.renderSubMenu() : null }
      </li>
    );
  }
}
