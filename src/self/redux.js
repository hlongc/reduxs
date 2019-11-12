export const createStore = (reducer, heightener) => {
  if (heightener) { // 如果存在heightener则返回包装后的结果
    return heightener(createStore)(reducer)
  }
  let currenState = {}
  const watcher = []

  function getState() {
    return currenState
  }

  function subscribe(fn) {
    if (typeof fn === 'function') {
      watcher.push(fn)
    } else {
      console.warn('The argument must be a function')
    }
  }

  function dispatch(action) {
    currenState = reducer(currenState, action)
    watcher.forEach(fn => fn())
    return action
  }

  dispatch({ type: '@@SELF_REDUX_INIT' })
  return { getState, subscribe, dispatch }
}


export function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer)
    let { getState, dispatch } = store
    const params = {
      getState: getState,
      dispatch: (...args) => dispatch(...args)
    }
    const middlewareArr = middlewares.map(middleware => middleware(params))
    dispatch = compose(...middlewareArr)(dispatch)
    return { ...store, dispatch }
  }
}

export function compose(...fns) {
  if (fns.length === 0) return arg => arg
  if (fns.length === 1) return fns[0]
  return fns.reduce((res, cur) => (...args) => res(cur(...args)))
}