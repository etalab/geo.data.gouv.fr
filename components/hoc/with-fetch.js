import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

export default mapStateWithProps => Component => {
  mapStateWithProps = mapStateWithProps || (state => state)

  const Extended = translate()(class extends React.Component {
    static propTypes = {
      promise: PropTypes.instanceOf(Promise),

      i18n: PropTypes.shape({
        exists: PropTypes.func.isRequired
      }).isRequired,
      t: PropTypes.func.isRequired
    }

    state = {
      loading: true,
      data: null,
      error: null
    }

    async componentWillReceiveProps(newProps) {
      const { promise } = newProps

      if (promise === this.props.promise) {
        return
      }

      try {
        const data = mapStateWithProps(await promise)

        this.setState(() => ({
          data,
          loading: false
        }))
      } catch (err) {
        this.setState(() => ({
          error: err,
          loading: false
        }))
      }
    }

    render() {
      const { t, i18n, promise, ...props } = this.props
      const { loading, data, error } = this.state

      if (loading) {
        return t('loading')
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

  return Extended
}
