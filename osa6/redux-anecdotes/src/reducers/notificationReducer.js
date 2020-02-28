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

export const notificationChange = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

export const notificationRemove = () => {
  return {
    type: 'REMOVE',
    notification: ''
  }
}

export default notificationReducer