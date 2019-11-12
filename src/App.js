import React from 'react';
import { connect } from './self/react-redux'
import { plusCounter, subCounter, asyncPlusCounter, plusMultiple } from './counter'

class App extends React.Component {
  render() {
    const { counter, plusCounter, subCounter, asyncPlusCounter, plusMultiple } = this.props
    return (
      <div>
        <p>counter: { counter }</p>
        <p>
          <button onClick={ plusCounter }>增加</button>
          <button onClick={ subCounter }>减少</button>
          <button onClick={ asyncPlusCounter }>异步增加</button>
          <button onClick={ plusMultiple }>数组式增加</button>
        </p>
      </div>
    )
  }
}

App = connect(
  state => ({ counter: state }),
  { plusCounter, subCounter, asyncPlusCounter, plusMultiple }
)(App)

export default App;
