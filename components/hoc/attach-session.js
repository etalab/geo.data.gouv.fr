import React from 'react'
import PropTypes from 'prop-types'
import hoist from 'hoist-non-react-statics'

import {getSession, clearSession} from '../../lib/session'

export default Page => {
  const Extended = hoist(class extends React.Component {
    static propTypes = {
      ssr: PropTypes.bool.isRequired
    }

    static childContextTypes = {
      session: PropTypes.shape({
        auth: PropTypes.bool,
        user: PropTypes.shape({
          id: PropTypes.string.isRequired,
          first_name: PropTypes.string.isRequired,
          last_name: PropTypes.string.isRequired,
          avatar_thumbnail: PropTypes.string.isRequired
        }),
        clear: PropTypes.func.isRequired
      })
    }

    state = {}

    getChildContext() {
      const {session} = this.state

      return {
        session: session ? {
          auth: session.auth,
          user: session.user,
          clear: clearSession
        } : null
      }
    }

    async componentDidMount() {
      const {ssr} = this.props

      const session = await getSession({
        force: ssr
      })

      this.setState({
        session
      })
    }

    render() {
      return (
        <Page {...this.props} />
      )
    }
  }, Page)

  Extended.getInitialProps = async context => {
    const props = Page.getInitialProps ? await Page.getInitialProps(context) : {}

    return {
      ...props,
      ssr: !process.browser
    }
  }

  return Extended
}
