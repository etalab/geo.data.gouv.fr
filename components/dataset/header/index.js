import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import MarkdownPreview from '../../markdown-preview'
import Warning from '../../warning'

import Infos from './infos'
import LifeCycle from './life-cycle'

const shouldWarn = status => [
  'obsolete',
  'underDevelopment'
].includes(status)

const Header = ({metadata, i18n: {language}, t}) => (
  <div>
    {shouldWarn(metadata.status) && (
      <div className='warning'>
        <Warning>{t(`warnings.${metadata.status}`)}</Warning>
      </div>
    )}

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
      <MarkdownPreview markdown={metadata.description} />
    </section>

    <section className='origin'>
      <h5>{t('labels.dataOrigin')}</h5>
      {metadata.lineage ? (
        <MarkdownPreview markdown={metadata.lineage} />
      ) : (
        <i>{t('common:enums.unknownData.notSpecified', {
          context: 'female'
        })}</i>
      )}
    </section>

    <section>
      <p>
        <b>{t('labels.purpose')}</b> {metadata.purpose || t('common:enums.unknownData.notSpecified')}
      </p>

      <LifeCycle
        updateFrequency={metadata.updateFrequency}
        creationDate={metadata.creationDate}
        status={metadata.status}
      />
    </section>

    <style jsx>{`
      @import 'colors';

      section:not(:last-child) {
        margin-bottom: 1em;
      }

      .warning {
        margin-bottom: 1em;
      }

      .row {
        display: flex;
        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-word;
        border-bottom: 1px solid $lightgrey;
        padding-bottom: 1em;
      }

      .origin {
        border-top: 1px solid $lightgrey;
        border-bottom: 1px solid $lightgrey;
        padding: 1em 0;
      }

      .left {
        flex: 1;
      }

      h1 {
        font-size: 1.8rem;
        font-weight: 500;
        margin: 0 0 0.6rem 0;
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
    title: PropTypes.string.isRequired,
    inspireTheme: PropTypes.shape({
      id: PropTypes.string.isRequired,
      uri: PropTypes.string.isRequired,
      label: PropTypes.object.isRequired
    }),
    updateFrequency: PropTypes.string,
    creationDate: PropTypes.string,
    status: PropTypes.string
  }).isRequired,

  i18n: PropTypes.shape({
    language: PropTypes.string.isRequired
  }).isRequired,

  t: PropTypes.func.isRequired
}

export default translate('dataset')(Header)
