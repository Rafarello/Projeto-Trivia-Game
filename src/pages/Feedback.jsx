import React, { Component } from 'react';
import Header from '../componets/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="settings-title">Feedback</h1>
      </div>
    );
  }
}

export default Feedback;
