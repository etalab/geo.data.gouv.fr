import React from 'react'
import PropTypes from 'prop-types'

import withI18n from '../components/hoc/with-i18n'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'

class ErrorPage extends React.Component {
  static propTypes = {
    statusCode: PropTypes.number.isRequired,
    i18n: PropTypes.shape({
      exists: PropTypes.func.isRequired
    }).isRequired,
    t: PropTypes.func.isRequired
  }

  static getInitialProps ({ res, err }) {
    const statusCode = res ? res.statusCode : (err ? err.statusCode : null)
    return { statusCode }
  }

  render() {
    const { statusCode, i18n, t } = this.props

    const message = i18n.exists(`errors.${statusCode}`) ? t(`errors.${statusCode}`) : t('errors.unknown')

    return (
      <Page>
        <Meta title={t('errors.title', { code: statusCode })} description={message} />

        <Content>
          <div>
            {statusCode ? <h1>{statusCode}</h1> : null}
            <h2>{message}</h2>
          </div>
        </Content>

        <style jsx>{`
          div {
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: center;
            margin: 5em 0 3em;
          }

          h1 {
            border-right: 1px solid rgba(0, 0, 0,.3);
            margin: 0 20px 0 0;
            padding: 10px 20px 10px 0;
            font-size: 24px;
            fontWeight: 500;
          }

          h2 {
            margin: 0;
            font-size: 14px;
            font-weight: normal;
          }
        `}</style>
      </Page>
    )
  }
}

export default withI18n()(ErrorPage)
