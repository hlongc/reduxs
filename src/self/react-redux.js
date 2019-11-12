import React from 'react'
import PropTypes from 'prop-types'

function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

function bindActionCreators(creators, dispatch) {
  return Object.keys(creators).reduce((sum, cur) => {
    sum[cur] = bindActionCreator(creators[cur], dispatch)
    return sum
  }, {})
}

export const connect = (mapStateToProps = state => state, mapDispatachToProps = {}) => WrapComponent => {
  return class ConnectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object.isRequired
    }

    constructor(props, context) {
      super(props, context)
      this.state = {
        props: {}
      }
    }

    componentDidMount() {
      const { store } = this.context
      store.subscribe(() => this.update())
      this.update()
    }

    update() {
      const { getState, dispatch } = this.context.store
      const stateProps = mapStateToProps(getState())
      const dispatchProps = bindActionCreators(mapDispatachToProps, dispatch)
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      })
    }

    render() {
      return <WrapComponent { ...this.state.props } />
    }
  }
}

export class Provider extends React.Component {

  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext() {
    return { store: this.store }
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  render() {
    return this.props.children
  }
}