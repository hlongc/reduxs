const INIT_STATE = 0

export function counter(state = INIT_STATE, action) {
  console.log(action)
  switch(action.type) {
    case 'plus':
      return state + 1
    case 'subtract':
      return state - 1
    default:
      return INIT_STATE
  }
}

export function plusCounter() {
  return { type: 'plus' }
}

export function subCounter() {
  return { type: 'subtract' }
}

export function plusMultiple() {
  return [{ type: 'plus' }, plusCounter(), asyncPlusCounter()]
}

export function asyncPlusCounter() {
  return dispatch => {
    setTimeout(() => {
      console.log('异步')
      dispatch(plusCounter())
    }, 2000)
  }
}



// 创建store
// const store = createStore(counter)
// const listener = function() {
//   const state = store.getState()
//   console.log('counter', state)
// }
// store.subscribe(listener)

// store.dispatch({ type: 'plus' })
// store.dispatch({ type: 'plus' })
// store.dispatch({ type: 'subtract' })
// store.dispatch({ type: 'plus' })