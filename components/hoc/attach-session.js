import React from 'react'
import PropTypes from 'prop-types'
import hoist from 'hoist-non-react-statics'

import {getSession, clearSession} from '../../lib/session'

import SessionContext from '../../contexts/session-context'

export default Page => {
  const Extended = hoist(class extends React.Component {
    static propTypes = {
      ssr: PropTypes.bool.isRequired
    }

    state = {}

    async componentDidMount() {
      const {ssr} = this.props

      const session = await getSession({
        force: ssr
      })

      this.setState({
        session: session ? {
          auth: session.auth,
          user: session.user,
          clear: clearSession
        } : null
      })
    }

    render() {
      const {session} = this.state

      return (
        <SessionContext.Provider value={session}>
          <Page {...this.props} />
        </SessionContext.Provider>
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
