import loginService from '../services/logins'
import blogService from '../services/blogs'
import { notification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'USER_LOGIN':
    return action.data

  case 'SET_USER':
    return action.data

  case 'USER_LOGOUT':
    return null

  default:
    return state
  }
}

export const userLogin = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      if (user) {
        window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
        blogService.setToken(user.token)

        await dispatch({
          type: 'USER_LOGIN',
          data: user
        })
      }

    }catch (error) {
      dispatch(notification('Wrong credentials'))
    }

  }
}

export const setUser = () => {
  return async dispatch => {
    const loggedUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      await dispatch({
        type: 'SET_USER',
        data: user
      })
      blogService.setToken(user.token)
    }
  }
}

export const userLogout = (userName) => {
  return async dispatch => {
    if (window.confirm(`Are you sure to logout ? ${userName}`)) {

      window.localStorage.removeItem('loggedBlogUser')
      await dispatch({
        type: 'USER_LOGOUT',
      })

      dispatch(notification(`Logged out from ${userName}`))
    }
  }

}

export default userReducer
