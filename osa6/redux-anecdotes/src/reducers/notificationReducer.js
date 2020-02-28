const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE':
      return action.notification
    default:
      return state
  }
}

let timer = null

export const setNotification = (notification, timeout) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch({
        type: 'REMOVE',
        notification: ''
      })
    }, (timeout * 1000))
  }
}

export default notificationReducer