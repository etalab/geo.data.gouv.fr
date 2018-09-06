import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import hoist from 'hoist-non-react-statics'

export default (mapStateWithProps, options) => Component => {
  mapStateWithProps = mapStateWithProps || (state => state)
  options = options || {}

  const Extended = translate()(class extends React.Component {
    static propTypes = {
      promise: PropTypes.oneOfType([
        PropTypes.instanceOf(Promise),
        PropTypes.arrayOf(PropTypes.instanceOf(Promise))
      ]),

      i18n: PropTypes.shape({
        exists: PropTypes.func.isRequired
      }).isRequired,
      t: PropTypes.func.isRequired
    }

    static defaultProps = {
      promise: null
    }

    state = {
      loading: true,
      data: null,
      error: null
    }

    async resolvePromise(promise) {
      if (!promise) {
        return null
      }

      if (Array.isArray(promise)) {
        if (promise.some(p => !p)) {
          return null
        }

        promise = Promise.all(promise)
      }

      try {
        const data = mapStateWithProps(await promise)

        this.setState(() => ({
          data,
          loading: false
        }))
      } catch (error) {
        this.setState(() => ({
          error,
          loading: false
        }))
      }
    }

    componentDidMount() {
      const {promise} = this.props

      if (promise) {
        this.resolvePromise(promise)
      }
    }

    componentDidUpdate(prevProps) {
      const {promise} = this.props

      if (promise && promise !== prevProps.promise) {
        this.resolvePromise(promise)
      }
    }

    render() {
      const {t, i18n, promise, ...props} = this.props
      const {loading, data, error} = this.state

      if (loading) {
        return options.Loader ? <options.Loader /> : t('loading')
      }

      if (error) {
        const message = i18n.exists(`errors.http.${error.code}`) ? t(`errors.http.${error.code}`) : t('errors.unknown')

        return (
          <div>
            {message}

            <style jsx>{`
              @import 'colors';

              div {
                color: $red;
              }
            `}</style>
          </div>
        )
      }

      return (
        <Component {...data} {...props} />
      )
    }
  })

  return hoist(Extended, Component)
}
