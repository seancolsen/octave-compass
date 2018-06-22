import React from 'react';

export default class Toolbar extends React.Component {
  render() {
    return (
      <div>
        <button>-</button>Transpose<button>+</button>
        <button>-</button>Mode shift<button>+</button>
      </div>
    );
  }
}
