import React, { Component } from 'react';

export default class SearchUser extends Component {
  render() {
    const { store, search } = this.props;
    const users = store.searchUsers(search);

    return (
      <div className="search-user">
        <div className="user-list">
          {users.map((user, index) => {
            return (
              <div key={user._id} className="user">
                <img src={user.avatar} alt="" />
                <h3>{user.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
