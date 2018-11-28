import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'tachyons';
import * as serviceWorker from './serviceWorker';
import {createStore,combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Reducer,ImageBox} from './redux/reducers/reducer';

const allReducers=combineReducers({
      urlSearch:Reducer,
      imageBox:ImageBox,
})

const store=createStore(allReducers,{urlSearch:"",imageBox:{}},window.devToolsExtension && window.devToolsExtension())
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
