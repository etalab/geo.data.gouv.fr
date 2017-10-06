import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import colors from '../../styles/colors'

import NewsletterForm from './newsletter-form'
import Credits from './credits'
import SocialLinks from './social-links'
import LanguageSelector from './language-selector'

const Footer = ({ i18n }) => (
  <footer>
    <div className='space' />
    <div className='container'>
      <NewsletterForm />
      <LanguageSelector />

      <div className='info'>
        <Credits />
        <SocialLinks />
      </div>
    </div>

    <style jsx>{`
      footer {
        color: ${colors.blue}
        background-color: ${colors.darkgrey};
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 0;
      }

      .space {
        height: 340px;
        position: relative;
        z-index: -2;
        pointer-events: none;
      }

      .container {
        padding: 30px;
        bottom: 0;
        width: 100%;
        position: fixed;
        z-index: -1;
        will-change: transform;
        backface-visibility: hidden;
        transform: translate3d(0, 0, 0);
      }

      .info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      @media (max-width: 768px) {
        footer {
          text-align: center;
        }

        .space {
          height: 250px;
        }

        .info {
          flex-direction: column-reverse;
          align-items: center;
        }
      }

      @media (max-width: 1280px) {
        .space {
          height: 340px;
        }
      }
    `}</style>
  </footer>
)

Footer.propTypes = {
  i18n: PropTypes.shape({
    language: PropTypes.string.isRequired
  }).isRequired
}

export default translate()(Footer)
