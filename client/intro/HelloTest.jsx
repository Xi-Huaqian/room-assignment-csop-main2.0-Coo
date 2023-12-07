import React, { Component } from 'react'
import { Centered, AlertToaster } from "meteor/empirica:core";

export default class HelloTest extends Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, treatment } = this.props;
    return (
      <div><button onClick={onNext}>HelloTest</button></div>
    )
  }
}
