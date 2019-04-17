import { OrderedMap } from 'immutable';

const users = new OrderedMap({
  '1': {
    _id: '1',
    name: 'Ilya',
    created: new Date(),
    avatar: 'https://api.adorable.io/avatars/60/fgh@adorable.io.png',
  },
  '2': {
    _id: '2',
    name: 'Nastya',
    created: new Date(),
    avatar: 'https://api.adorable.io/avatars/60/fh@adorable.io.png',
  },
});

export default class Store {
  constructor(appComponent) {
    this.app = appComponent;
    this.messages = new OrderedMap();
    this.channels = new OrderedMap();
    this.activeChannelId = null;
    this.user = {
      _id: '1',
      name: 'Ilya',
      created: new Date(),
    };
  }

  searchUsers(search = '') {
    const searchName = search.trim();
    let searchNameRegex = new RegExp(searchName, 'i');
    let searchItems = new OrderedMap();

    if (searchName.length) {
      users.filter(user => {
        if (user.name.match(searchNameRegex)) {
          searchItems = searchItems.set(user._id, user);
        }
      });
    }

    return searchItems.valueSeq();
  }

  getCurrentUser() {
    return this.user;
  }

  setActiveChannel(id) {
    this.activeChannelId = id;
    this.update();
  }

  getActiveChannel() {
    const channel = this.activeChannelId
      ? this.channels.get(this.activeChannelId)
      : this.channels.first();

    return channel;
  }

  addMessage(id, message = {}) {
    this.messages = this.messages.set(`${id}`, message);
    const channelId = message.channelId;

    if (channelId) {
      const channel = this.channels.get(channelId);
      channel.messages = channel.messages.set(id, true);
      this.channels = this.channels.set(channelId, channel);
    }

    this.update();
  }

  getMessages() {
    return this.messages.valueSeq();
  }

  getMessagesFromChannel(activeChannel) {
    let messages = [];

    if (activeChannel) {
      activeChannel.messages.map((value, key) => {
        const message = this.messages.get(key);
        messages.push(message);
      });
    }

    return messages;
  }

  getMembersFromChannel(activeChannel) {
    let members = [];

    if (activeChannel) {
      activeChannel.members.map((value, key) => {
        const member = users.get(key);
        members.push(member);
      });
    }

    return members;
  }

  addChannel(index, channel = {}) {
    this.channels = this.channels.set(`${index}`, channel);
    this.update();
  }

  onCreateNewChannel(channel = {}) {
    const channelId = channel._id;
    this.addChannel(channelId, channel);
    this.setActiveChannel(channelId);
  }

  getChannels() {
    this.channels = this.channels.sort((a, b) => b.created - a.created);
    return this.channels.valueSeq();
  }

  update() {
    this.app.forceUpdate();
  }
}
