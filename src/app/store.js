import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduceLogin from 'login/redux/reduceLogin';
import reduceProject from 'project/redux/reduceProject'

const root = combineReducers({
    user: reduceLogin,
    project: reduceProject,
})
const store = createStore(root, composeWithDevTools(applyMiddleware(thunk)));

export default store;



