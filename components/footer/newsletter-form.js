import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import colors from '../../styles/colors'

const NewsletterForm = ({ t }) => (
  <form
    action='//gouv.us15.list-manage.com/subscribe/post?u=f4e80584578b65fde5aadffb6&amp;id=a9e2a3104d'
    method='post'
    name='mc-embedded-subscribe-form'
    className='validate'
    target='_blank'
    noValidate
  >
    <h2>{t('components.NewsletterForm.newsletterSignUp')} :</h2>
    <div className='fields'>
      <label htmlFor='mce-EMAIL'>{t('components.NewsletterForm.label')}</label>
      <span>
        <input type='email' name='EMAIL' id='mce-EMAIL' />
        <button type='submit' name='subscribe'>
          {t('components.NewsletterForm.inputValue')}
        </button>
      </span>
    </div>

    <input type='hidden' name='b_f4e80584578b65fde5aadffb6_a9e2a3104d' value='' />

    <style jsx>{`
      form {
        padding: 80px 0;
      }

      h2 {
        text-align: center;
      }

      .fields {
        display: flex;
        flex-flow: wrap;
        align-items: center;
        justify-content: center;
        color: #fff;
      }

      input[type=email] {
        padding: 10px 15px;
        margin-left: 1em;
        border: 0;
        color: ${colors.blue};
      }

      button {
        background-color: ${colors.blue};
        border: 0;
        padding: 10px 15px;
        color: #fff;
        cursor: pointer;
      }

      button:hover {
        background-color: ${colors.highlightBlue};
      }

      @media (max-width: 768px) {
        form {
          padding: 30px 0;
        }
      }
    `}</style>
  </form>
)

NewsletterForm.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate()(NewsletterForm)
