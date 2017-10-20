import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Container from '../Container'
import Button from '../Buttons/Button'

import styles from './NewsletterForm.scss'

class NewsletterForm extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired
  }

  render() {
    const { t } = this.props

    return (
      <div className={styles.container}>
        <Container>
          <form className={styles.form} action='//gouv.us15.list-manage.com/subscribe/post?u=f4e80584578b65fde5aadffb6&amp;id=a9e2a3104d' method='post'name='mc-embedded-subscribe-form' target='_blank' noValidate>
            <h2>{t('components.NewsletterForm.newsletterSignUp')}</h2>
            <input type='email' name='EMAIL' placeholder={t('components.NewsletterForm.label')} />

            <Button type='submit' text={t('components.NewsletterForm.inputValue')} name='subscribe' style={{
              padding: '0.85em 3em',
              marginTop: '1em',
              width: '100%',
              textTransform: 'uppercase',
              fontSize: '1.2em',
              fontWeight: 'bold'
            }} />
          </form>
        </Container>
      </div>
    )
  }
}

export default translate()(NewsletterForm)
