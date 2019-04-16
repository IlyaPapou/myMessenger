import React, { Component } from 'react';
import _ from 'lodash';

export default class SearchUser extends Component {
  render() {
    return (
      <div className="search-user">
        <div className="user-list">
          <div className="user">user</div>
          <img
            src="https://api.adorable.io/avatars/60/wat@adorable.io.png"
            alt=""
          />
          <h3>Name</h3>
        </div>
        <div className="user-list">
          <div className="user">user</div>
          <img
            src="https://api.adorable.io/avatars/60/wat@adorable.io.png"
            alt=""
          />
          <h3>Name</h3>
        </div>
        <div className="user-list">
          <div className="user">user</div>
          <img
            src="https://api.adorable.io/avatars/60/wat@adorable.io.png"
            alt=""
          />
          <h3>Name</h3>
        </div>
      </div>
    );
  }
}
