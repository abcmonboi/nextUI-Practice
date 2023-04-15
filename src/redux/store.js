import {applyMiddleware, createStore } from 'redux';
//xử lý bất đồng bộ
import rootReducer from '../redux/reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;