import React from 'react';
import { Link } from 'react-router';

export default class HomePageContainer extends React.Component {
  static defaultProps = {};
  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <Link to="about">About</Link>
      </div>
    );
  }
}
