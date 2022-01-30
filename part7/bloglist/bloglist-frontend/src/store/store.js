import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from '../reducers/notificationReducer'
import blogsReducer from '../reducers/blogsReducer'
import loginReducer from '../reducers/loginReducer'
import usersReducer from '../reducers/usersReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers(
  {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: loginReducer,
    users: usersReducer
  }
)

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store