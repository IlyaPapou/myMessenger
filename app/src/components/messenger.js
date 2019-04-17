import React, { Component } from 'react';
import defaultAvatar from '../images/empty-avatar.png';
import classNames from 'classnames';
import { OrderedMap } from 'immutable';
import { ObjectId } from '../helpers/objectid';
import SearchUser from './search-user';
import moment from 'moment';

export default class Messenger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: window.innerHeight,
      newMessage: '',
      searchUser: '',
    };

    this._onResize = this._onResize.bind(this);
    this._onCreateChannel = this._onCreateChannel.bind(this);
    this.addTestInfo = this.addTestInfo.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.scrollToTheLastMessage = this.scrollToTheLastMessage.bind(this);
  }

  _onResize() {
    this.setState({
      height: window.innerHeight,
    });
  }

  _onCreateChannel() {
    const { store } = this.props,
      channelId = new ObjectId().toString(),
      channel = {
        _id: channelId,
        title: '',
        lastMessage: '',
        created: new Date(),
        members: new OrderedMap(),
        messages: new OrderedMap(),
        isNew: true,
      };
    store.onCreateNewChannel(channel);
  }

  componentDidMount() {
    window.addEventListener('resize', this._onResize);
    this.addTestInfo();
  }

  componentDidUpdate() {
    this.scrollToTheLastMessage();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
  }

  handleMessageChange(event) {
    this.setState({ newMessage: event.target.value });
  }

  scrollToTheLastMessage() {
    if (this.messagesRef) {
      this.messagesRef.scrollTop = this.messagesRef.scrollHeight;
    }
  }

  handleSend() {
    const { store } = this.props,
      { newMessage } = this.state,
      messageId = new ObjectId().toString(),
      channelId = store.getActiveChannel()._id,
      currentUser = store.getCurrentUser();

    const message = {
      _id: messageId,
      channelId,
      text: newMessage.trim(),
      author: currentUser.name,
      avatar: defaultAvatar,
      me: true,
    };

    store.addMessage(messageId, message);
    this.setState({ newMessage: '' });
  }

  addTestInfo() {
    const { store } = this.props;
    let i = 0,
      j = 0,
      isMe;

    for (; i < 100; i++) {
      isMe = i % 2 === 0;

      const newMsg = {
        _id: `${i}`,
        author: `Author: ${i}`,
        text: 'Lorem ipsum dolor sit amet,consectetur adipiscing elit.',
        avatar: defaultAvatar,
        me: isMe,
      };
      store.addMessage(i, newMsg);
    }

    for (; j < 100; j++) {
      const newChannel = {
        _id: `${j}`,
        image: defaultAvatar,
        title: `Channel ${j}`,
        created: new Date(),
        info: `smth ${j}`,
        members: new OrderedMap({
          '1': true,
          '2': true,
        }),
        messages: new OrderedMap({
          '5': true,
          '6': true,
          '7': true,
        }),
      };
      store.addChannel(j, newChannel);
    }
  }

  render() {
    const { store } = this.props,
      { height } = this.state,
      style = { height },
      activeChannel = store.getActiveChannel(),
      channels = store.getChannels(),
      messagesFromChannel = store.getMessagesFromChannel(activeChannel),
      membersFromChannel = store.getMembersFromChannel(activeChannel);

    return (
      <div style={style} className="app-messenger">
        <header className="header">
          <div className="left">
            <div className="icons-action">
              <i className="icon-cog" />
            </div>
            <h3>Messenger</h3>
            <div onClick={this._onCreateChannel} className="icons-action">
              <i className="icon-feather" />
            </div>
          </div>
          <div className="content">
            {activeChannel &&
              (activeChannel.isNew ? (
                <div className="toolbar">
                  <label>To:</label>
                  <input
                    onChange={event => {
                      const searchUserText = event.target.value;
                      this.setState({ searchUser: searchUserText });
                    }}
                    type="text"
                    value={this.state.searchUser}
                  />
                  <SearchUser search={this.state.searchUser} store={store} />
                </div>
              ) : (
                <h2>{activeChannel.title}</h2>
              ))}
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
              {channels.map((channel, index) => {
                return (
                  <div
                    onClick={index => store.setActiveChannel(channel._id)}
                    key={channel._id}
                    className={classNames('channel', {
                      active: activeChannel._id === channel._id,
                    })}
                  >
                    <div className="channel-image">
                      <img src={channel.image} alt="" />
                    </div>
                    <div className="channel-info">
                      <h3>{channel.title}</h3>
                      <p>{channel.info}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          <section className="content">
            <div ref={ref => (this.messagesRef = ref)} className="messages">
              {messagesFromChannel.map((message, index) => {
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
                <textarea
                  value={this.state.newMessage}
                  onChange={this.handleMessageChange}
                  onKeyUp={event => {
                    if (
                      event.key === 'Enter' &&
                      !event.shiftKey &&
                      this.state.newMessage.trim()
                    ) {
                      this.handleSend();
                    }
                  }}
                  placeholder="Write your message here!"
                />
              </div>
              <div className="actions">
                <button
                  className="send"
                  onClick={() => {
                    if (this.state.newMessage.trim()) {
                      this.handleSend();
                    }
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </section>

          <aside className="sidebar-right">
            <div className="sidebar-title">
              <h3>Members:</h3>
            </div>
            {membersFromChannel.length > 0 ? (
              <div className="members">
                {membersFromChannel.map((member, index) => {
                  return (
                    <div key={member._id} className="member">
                      <div className="member-image">
                        <img src={member.avatar} alt="" />
                      </div>
                      <div className="member-info">
                        <h3>{member.name}</h3>
                        <p>Joined: {moment(member.created).fromNow()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </aside>
        </section>

        <footer className="footer">
          <h4>{new Date().getFullYear()}</h4>
        </footer>
      </div>
    );
  }
}
