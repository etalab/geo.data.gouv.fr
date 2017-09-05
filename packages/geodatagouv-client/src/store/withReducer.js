import React from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'

import { injectReducer } from './reducers'

const withReducer = (key, reducer) => Component => {
  return hoistStatics(class extends React.Component {
    static displayName = `withReducer(${Component.displayName || Component.name})`
    static WrappedComponent = Component
    static contextTypes = {
      store: PropTypes.object.isRequired
    }

    componentWillMount() {
      injectReducer(this.context.store, { key, reducer })
    }

    render() {
      return (
        <Component {...this.props} />
      )
    }
  }, Component)
}

export default withReducer
