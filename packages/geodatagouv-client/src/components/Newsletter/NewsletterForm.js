import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import { getUser } from '../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../helpers/components'

import style from './NewsletterForm.scss'

class NewsletterForm extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      user: null,
      value: '',
      errors: []
    }
  }

  componentDidMount() {
    return waitForDataAndSetState(getUser(), this, 'user')
      .then(() => {
        if (!this.state.user) return
        this.setState({ value: this.state.user.email })
      })
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  render() {
    const { t } = this.props
    const { value } = this.state

    return (
      <div id='mc_embed_signup' className={style.container}>
        <form action='//gouv.us15.list-manage.com/subscribe/post?u=f4e80584578b65fde5aadffb6&amp;id=a9e2a3104d' method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' className='validate' target='_blank' noValidate>
          <div id='mc_embed_signup_scroll'>
            <h2 className={style.title}>{t('components.NewsletterForm.newsletterSignUp')} :</h2>
            <div className={style.form}>
              <label htmlFor='mce-EMAIL'>{t('components.NewsletterForm.label')}</label>
              <input className={style.input} type='email' value={value} onChange={this.handleChange} name='EMAIL' id='mce-EMAIL' />
              <input type='submit' value={t('components.NewsletterForm.inputValue')} name='subscribe' id='mc-embedded-subscribe' className={style.button} />
            </div>

            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden='true'>
              <input type='text' name='b_f4e80584578b65fde5aadffb6_a9e2a3104d' tabIndex='-1' value='' />
            </div>

          </div>
        </form>
      </div>
    )
  }
}

export default translate('Common')(NewsletterForm)
