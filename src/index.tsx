import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';
import { store } from 'store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'reactjs-popup/dist/index.css';

ReactDOM.render(
  <React.StrictMode>
    <div className="App antialiased text-gray-900">
      <Provider store={store}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </Provider>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
