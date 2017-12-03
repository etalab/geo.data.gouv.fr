import React from 'react'
import PropTypes from 'prop-types'
import { flowRight } from 'lodash'

import withI18n from '../components/hoc/with-i18n'
import withAuth from '../components/hoc/with-auth'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'
import Box from '../components/box'

class ErrorPage extends React.Component {
  static propTypes = {
    code: PropTypes.number,
    i18n: PropTypes.shape({
      exists: PropTypes.func.isRequired
    }).isRequired,
    t: PropTypes.func.isRequired
  }

  static getInitialProps ({ res, err }) {
    const code = res ? res.statusCode : (err ? err.statusCode : null)

    return { code }
  }

  render() {
    const { code, i18n, t } = this.props

    const message = i18n.exists(`errors.http.${code}`) ? t(`errors.http.${code}`) : t('errors.unknown')

    return (
      <Page>
        <Meta title={t('errors.title', { code })} description={message} />

        <Content clouds>
          <div>
            <Box>
              <section>
                <h1>{t('errors.title', { code })}</h1>
                <h2>{message}</h2>
              </section>
            </Box>
          </div>
        </Content>

        <style jsx>{`
          div {
            margin: 7em 15px 2em;
            text-align: center;

            @media (min-width: 552px) {
              display: flex;
              flex: 1;
              align-items: center;
              justify-content: center;
            }
          }

          section {
            padding: 10px;

            @media (min-width: 552px) {
              display: flex;
              align-items: center;
            }
          }

          h1 {
            font-size: 24px;
            fontWeight: 500;

            @media (min-width: 552px) {
              margin: 0 20px 0 0;
              border-right: 1px solid rgba(0, 0, 0,.3);
              padding: 10px 20px 10px 0;
            }
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

export default flowRight(
  withI18n(),
  withAuth()
)(ErrorPage)
