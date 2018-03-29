import { combineReducers } from 'redux';
import token from './token.js';
import lang from './lang.js';

export default combineReducers({
    lang,
    token
});