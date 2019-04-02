import React, { Component } from 'react';

export default class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = { height: window.innerHeight };
    this._onResize = this._onResize.bind(this);
  }

  _onResize() {
    this.setState({
      height: window.innerHeight,
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this._onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
  }

  render() {
    const { height } = this.state;
    const style = { height };
    return (
      <div style={style} className="app-messenger">
        <header className="header">Header</header>
        <div className="main">
          <aside className="sidebar-left">Sidebar-left</aside>
          <section className="content">Content</section>
          <aside className="sidebar-right">Sidebar-right</aside>
        </div>
      </div>
    );
  }
}
