const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFY':
      return action.message

    case 'CLEAR_NOTIFY':
      return null

    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFY',
    message,
  }
}

export const removeNotification = () => {
  return {
    type: 'CLEAR_NOTIFY',
  }
}

export default notificationReducer
