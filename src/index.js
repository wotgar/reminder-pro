import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import './index.css';

{/* Der Provider legt den Store an, für alle darin eingebetteten Apps */}
const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root')
)
