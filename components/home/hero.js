import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import Link from '../link'
import Container from '../container'
import SearchInput from '../search-input'

const Hero = ({t}) => (
  <Container>
    <div>
      <h1>
        {t('tagline')}
      </h1>

      <SearchInput
        placeholder={t('SearchInputPlaceholder')}
        defaultQuery={{
          availability: 'yes'
        }}
        hasButton
      />

      <Link prefetch href='/search?availability=yes'>
        <a>{t('datasetsLink')}</a>
      </Link>
    </div>

    <style jsx>{`
      @import 'colors';

      div {
        padding: 12em 0 12em;
        text-align: center;

        @media (max-width: 767px) {
          padding: 3em 0;
        }
      }

      h1 {
        color: $white;
        font-size: 2.3em;
        font-weight: normal;
        margin: 0 0 2em;

        @media (max-width: 551px) {
          font-size: 1.6em;
        }
      }

      a {
        color: $darkgrey;
        display: block;
        margin-top: 2em;

        &:focus, &:hover {
          color: $black;
        }
      }
    `}</style>
  </Container>
)

Hero.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate('home')(Hero)
