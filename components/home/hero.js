import React from 'react'
import Link from 'next/link'
import { translate } from 'react-i18next'

import colors from '../../styles/colors'

import SearchInput from '../search-input'

const Hero = ({ t }) => (
  <div>
    <h1>
      {t('tagline')}
    </h1>
    <SearchInput
      placeholder={t('SearchInputPlaceholder')}
      onSearch={() => {}}
      hasButton
    />
    <Link href='/search?availability=yes'>
      <a>{t('datasetsLink')}</a>
    </Link>

    <style jsx>{`
      div {
        padding: 20vh 8%;
        text-align: center;
      }

      h1 {
        font-size: xx-large;
        font-weight: 100;
        margin-bottom: 2em;
        color: #fff;
      }

      a {
        color: ${colors.darkgrey};
        display: block;
        margin-top: 2em;
        font-size: 1em;
      }

      a:focus,
      a:hover {
        color: #000;
      }

      @media (max-width: 768px) {
        div {
          padding: 0;
        }
      }

      @media (max-width: 551px) {
        h1 {
          font-size: larger;
          margin: 2em;
          padding-top: 2em;
        }
      }
    `}</style>
  </div>
)

export default translate('home', {
  wait: process.browser
})(Hero)
