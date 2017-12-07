import React from 'react'
import PropTypes from 'prop-types'

import { getSession, clearSession } from '../../lib/user'

export default Page => class extends React.PureComponent {
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

  static async getInitialProps(context) {
    const props = Page.getInitialProps ? await Page.getInitialProps(context) : {}

    return {
      ...props,
      ssr: !process.browser
    }
  }

  state = {}

  getChildContext() {
    const { session } = this.state

    return {
      session: session ? {
        auth: session.auth,
        user: session.user,
        clear: clearSession
      } : null
    }
  }

  async componentDidMount() {
    const { ssr } = this.props

    const session = await getSession({
      force: ssr
    })

    this.setState(state => ({
      session
    }))
  }

  render() {
    return (
      <Page {...this.props} />
    )
  }
}
