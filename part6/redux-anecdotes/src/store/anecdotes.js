import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteReducer from '../reducer/anecdoteReducer'
import notificationReducer from '../reducer/notificationReducer'
import filterReducer from '../reducer/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer,
  anecdoteFilter: filterReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
