import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Container from '../container'

class NewsletterForm extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired
  }

  render() {
    const { t } = this.props

    return (
      <div>
        <Container>
          <form action='//gouv.us15.list-manage.com/subscribe/post?u=f4e80584578b65fde5aadffb6&amp;id=a9e2a3104d' method='post'name='mc-embedded-subscribe-form' target='_blank' noValidate>
            <h2>{t('newsletter.title')}</h2>
            <input type='email' name='EMAIL' placeholder={t('newsletter.placeholder')} />

            <button type='submit' name='subscribe'>
              {t('newsletter.button')}
            </button>
          </form>
        </Container>

        <style jsx>{`
          @import 'colors';

          div {
            background-color: $whitesmoke;
            padding: 6em 0;
            text-align: center;

            @media (max-width: 768px) {
              text-align: left;
              padding: 3em 0;
            }
          }

          form {
            max-width: 640px;
            margin: auto;
          }

          h2 {
            margin-top: 0;

            @media (max-width: 768px) {
              font-size: 1.4rem;
            }
          }

          input {
            display: block;
            width: 100%;
            border: 0;
            outline: 0;
            padding: 16px 20px;
            font: inherit;
            line-height: 1.6;
            font-size: 1.3em;
            border-radius: 2px;
            margin-bottom: 1em;
          }

          button {
            padding: 0.85em 3em;
            margin-top: 1em;
            width: 100%;
            text-transform: uppercase;
            font-size: 1.2em;
            font-weight: bold;
            color: $white;
            background-color: $blue;
            border: 1px solid $white;

            &:hover {
              color: $blue;
              background-color: #fff;
              border-color: $blue;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default translate('home')(NewsletterForm)
