import React, { Component } from 'react';
import './App.css';
import Wheel from "./Wheel.js";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Wheel />
      </div>
    );
  }
}
