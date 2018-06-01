import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import App from 'App';
import registerServiceWorker from 'registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// Disable default drag-related behaviors
document.body.ondrag = () => false;
document.body.ondragstart = () => false;
document.body.ondrop = () => false;
document.body.ondblclick = () => false;

registerServiceWorker();
