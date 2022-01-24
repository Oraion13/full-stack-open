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

const setNotification = (message) => {
  return {
    type: 'SET_NOTIFY',
    message,
  }
}

const removeNotification = () => {
  return {
    type: 'CLEAR_NOTIFY',
  }
}

let timeOutID

const clearMessage = async () => {
  clearTimeout(timeOutID)
}

export const notification = (content, timer = 5) => {
  return async (dispatch) => {
    await clearMessage()
    await dispatch(setNotification(content))
    timeOutID = setTimeout(async () => {
      await dispatch(removeNotification(''))
    }, timer * 1000)
  }
}

export default notificationReducer
