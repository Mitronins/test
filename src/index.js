import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';

import Root from './Root';
import store from './store.jsx';

ReactDOM.render((
    <Provider store={store}>
        <Root/>
    </Provider>
), document.getElementById('root'));
