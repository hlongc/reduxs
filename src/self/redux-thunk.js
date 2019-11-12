const thunk = ({ dispatch, getState }) => next => action => {
  // 普通的action就是一个对象{ type: 'plus' },如果是function，那么就是一个异步操作
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }
  return next(action)
}

export default thunk