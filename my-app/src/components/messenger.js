import React, { Component } from 'react';
import defaultAvatar from '../images/empty-avatar.png';
import classNames from 'classnames';

export default class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = { height: window.innerHeight, messages: [] };
    this._onResize = this._onResize.bind(this);
    this.addTestMessage = this.addTestMessage.bind(this);
  }

  _onResize() {
    this.setState({
      height: window.innerHeight,
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this._onResize);
    this.addTestMessage();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
  }

  addTestMessage() {
    let { messages } = this.state;
    let i = 0;
    let isMe;

    for (; i < 100; i++) {
      isMe = false;

      if (i % 2 === 0) {
        isMe = true;
      }

      const newMsg = {
        author: `Author: ${i}`,
        text: 'Lorem ipsum dolor sit amet,consectetur adipiscing elit.',
        avatar: defaultAvatar,
        me: isMe,
      };

      messages.push(newMsg);

      this.setState({ messages });
    }
  }

  render() {
    const { height, messages } = this.state;
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

        <section className="main">
          <aside className="sidebar-left">
            <div className="sidebar-title">
              <h3>Channels:</h3>
            </div>
            <div className="channels">
              <div className="channel">
                <div className="channel-image">
                  <img src={defaultAvatar} alt="" />
                </div>
                <div className="channel-info">
                  <h3>channel</h3>
                  <p>info</p>
                </div>
              </div>
              <div className="channel">
                <div className="channel-image">
                  <img src={defaultAvatar} alt="" />
                </div>
                <div className="channel-info">
                  <h3>channel</h3>
                  <p>info</p>
                </div>
              </div>
            </div>
          </aside>
          <section className="content">
            <div className="messages">
              {messages.map((message, index) => {
                return (
                  <div
                    key={index}
                    className={classNames('message', { my: message.me })}
                  >
                    <div className="message-user-image">
                      <img src={message.avatar} alt="" />
                    </div>
                    <div className="message-body">
                      <div className="message-author">
                        <h3>{message.me ? 'You say' : message.author}:</h3>
                      </div>
                      <div className="message-text">
                        <p>{message.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="message-input">
              <div className="text-input">
                <textarea placeholder="Write your message here!" />
              </div>
              <div className="actions">
                <button className="send">Send</button>
              </div>
            </div>
          </section>
          <aside className="sidebar-right">
            <div className="sidebar-title">
              <h3>Members:</h3>
            </div>
            <div className="members">
              <div className="member">
                <div className="member-image">
                  <img src={defaultAvatar} alt="" />
                </div>
                <div className="member-info">
                  <h3>member</h3>
                  <p>info</p>
                </div>
              </div>
              <div className="member">
                <div className="member-image">
                  <img src={defaultAvatar} alt="" />
                </div>
                <div className="member-info">
                  <h4>member</h4>
                  <p>info</p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <footer className="footer">
          <h4>{new Date().getFullYear()}</h4>
        </footer>
      </div>
    );
  }
}
