import React, { Component } from 'react';
import defaultAvatar from '../images/empty-avatar.png';

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
        <header className="header">
          <div className="left">
            <div className="actions">
              <button>New</button>
            </div>
          </div>
          <div className="content">
            <h2>Title</h2>
          </div>
          <div className="right">
            <div className="user-bar">
              <div className="profile-name">Name</div>
              <div className="profile-image">
                <img src={defaultAvatar} alt="" />
              </div>
            </div>
          </div>
        </header>
        <div className="main">
          <aside className="sidebar-left">Sidebar-left</aside>
          <section className="content">
            <div className="messages">
              <div className="message">
                <div className="message-user-image">
                  <img src={defaultAvatar} alt="" />
                </div>
                <div className="message-body">
                  <div className="message-author">
                    <h3>Author</h3>
                  </div>
                  <div className="message-text">
                    <p>Message</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <aside className="sidebar-right">Sidebar-right</aside>
        </div>
      </div>
    );
  }
}
