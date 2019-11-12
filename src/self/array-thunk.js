const arrayThunk = ({ dispatch, getState }) => next => action => {
  // 普通的action就是一个对象{ type: 'ADD' },如果是数组，那么依次执行并且返回
  if (Array.isArray(action)) {
    return action.forEach(act => dispatch(act))
  }
  return next(action)
}

export default arrayThunk