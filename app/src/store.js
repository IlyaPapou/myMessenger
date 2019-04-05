import { OrderedMap } from 'immutable';

const users = new OrderedMap({
  1: { _id: 1, name: 'Ilya', created: new Date() },
  2: { _id: 2, name: 'Nastya', created: new Date() },
});

export default class Store {
  constructor(appComponent) {
    this.app = appComponent;
    this.messages = new OrderedMap();
    this.channels = new OrderedMap();
    this.activeChannelId = null;
    this.user = {
      _id: 0,
      user: 'Ilya',
      created: new Date(),
    };
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

  addMessage(index, message = {}) {
    this.messages = this.messages.set(`${index}`, message);
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

  getChannels() {
    return this.channels.valueSeq();
  }

  update() {
    this.app.forceUpdate();
  }
}
