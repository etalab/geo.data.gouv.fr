import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import Container from '../container'
import Button from '../button'

class NewsletterForm extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired
  }

  render() {
    const {t} = this.props

    return (
      <div>
        <Container>
          <form
            noValidate
            action='//gouv.us15.list-manage.com/subscribe/post?u=f4e80584578b65fde5aadffb6&amp;id=a9e2a3104d'
            method='post'
            name='mc-embedded-subscribe-form'
            target='_blank'
          >
            <h3>{t('newsletter.title')}</h3>
            <input type='email' name='EMAIL' placeholder={t('newsletter.placeholder')} />

            <Button block type='submit' name='subscribe' size='large'>
              <span>{t('newsletter.button')}</span>
            </Button>
          </form>
        </Container>

        <style jsx>{`
          @import 'colors';

          div {
            background-color: $whitesmoke;
            padding: 6em 0;

            @media (max-width: 767px) {
              padding: 4em 0;
            }
          }

          form {
            width: 100%;
            max-width: 640px;
            margin: auto;
          }

          h3 {
            margin-top: 0;
          }

          input {
            display: block;
            width: 100%;
            border: 0;
            outline: 0;
            padding: 12px 16px;
            line-height: 1.6;
            font-size: 1.2em;
            border-radius: 2px;
            margin-bottom: 1em;
          }

          span {
            text-transform: uppercase;
            font-weight: 600;
          }
        `}</style>
      </div>
    )
  }
}

export default translate('home')(NewsletterForm)
