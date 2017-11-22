import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'

import Markdown from '../../markdown'
import Infos from './infos'

const Header = ({ metadata, i18n: { language }, t }) => (
  <div>
    <section className='row'>
      <div className='left'>
        <h1>{metadata.title}</h1>
        <Infos metadata={metadata} />
      </div>

      {metadata.inspireTheme && (
        <a href={`${metadata.inspireTheme.uri}?lang=${language}`} target='_blank' rel='noopener noreferrer'>
          <img
            src={`/static/images/datasets/inspire/${metadata.inspireTheme.id}.svg`}
            title={metadata.inspireTheme.label[language]}
            alt={metadata.inspireTheme.label[language]}
          />
        </a>
      )}
    </section>

    <section>
      <Markdown markdown={metadata.description} />
    </section>

    <section>
      <p>
        <b>{t('labels.purpose')}</b> {metadata.purpose || t('common:enums.unknownData.notSpecified')}
      </p>
      <p>
        <b>{t('labels.dataOrigin')}</b> {metadata.lineage || t('common:enums.unknownData.notSpecified', {
          context: 'female'
        })}
      </p>
    </section>

    <style jsx>{`
      @import 'colors';

      section:not(:last-child) {
        border-bottom: 1px solid $lightgrey;
        margin-bottom: 1em;
        padding-bottom: 1em;
      }

      .row {
        display: flex;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;
      }

      .left {
        flex: 1;
      }

      h1 {
        font-size: 1.8rem;
        font-weight: 500;
        margin-bottom: 0.6rem;
      }

      a {
        display: block;
        padding-left: 15px;

        img {
          width: 40px;
        }
      }
    `}</style>
  </div>
)

Header.propTypes = {
  metadata: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,

  i18n: PropTypes.shape({
    language: PropTypes.string.isRequired
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('dataset')(Header)
