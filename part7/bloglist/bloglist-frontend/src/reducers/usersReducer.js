import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch(action.type){
  case 'INITILIZE_USERS':
    return action.data

  case 'ONE_USER':
    return state.filter(user => user.id === action.data.id)

  case 'ADD_USER':
    return [...state, action.data]

  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const data = await userService.getAll()
    console.log(data)
    dispatch({
      type: 'INITILIZE_USERS',
      data
    })
  }
}

export const getOneUser = (id) => {
  return async dispatch => {
    if(id){
      const data = await userService.getOne(id)
      console.log('data', data)

      dispatch({
        type: 'ONE_USER',
        data
      })
    }
  }
}

export const addNewUser = (content) => {
  return async dispatch => {
    const data = await userService.addUser(content)

    dispatch({
      type: 'ADD_USER',
      data
    })
  }
}

export default usersReducer