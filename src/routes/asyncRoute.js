import React from 'react'

const defaultExport = module => module.default || module

const asyncRoute = getComponent => class AsyncRoute extends React.Component {
  state = {
    Component: null
  }

  async componentWillMount() {
    if (!this.state.Component) {
      const Component = defaultExport(await getComponent())

      if (this.isMounted) {
        this.setState({ Component })
      } else {
        this.state.Component = Component
      }
    }
  }

  componentDidMount() {
    this.isMounted = true
  }

  render() {
    const { Component } = this.state

    return Component && (
      <Component {...this.props} />
    )
  }
}

export default asyncRoute
