import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch(action.type){
  case 'INITILIZE_USERS':
    return action.data

  case 'ONE_USER':
    return state.filter(user => user.id === action.data.id)

  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const data = await userService.getAll()
    dispatch({
      type: 'INITILIZE_USERS',
      data
    })
  }
}

export const getOneUser = (id) => {
  return async dispatch => {
    const data = await userService.getOne(id)

    dispatch({
      type: 'ONE_USER',
      data
    })
  }
}

export default usersReducer