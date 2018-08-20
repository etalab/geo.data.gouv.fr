import React from 'react'
import {translate} from 'react-i18next'
import PropTypes from 'prop-types'

import DatasetDownload from './dataset-download'
import Preview from './preview'

class Downloads extends React.Component {
  static propTypes = {
    distributions: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
      name: PropTypes.string,
      location: PropTypes.string
    })).isRequired,

    extent: PropTypes.object,

    t: PropTypes.func.isRequired
  }

  static defaultProps = {
    extent: null
  }

  state = {}

  setPreview = (distribution, link, name) => {
    this.setState(() => distribution ? ({
      preview: {
        distribution,
        link,
        name
      }
    }) : {
      preview: null
    })
  }

  clearPreview = () => {
    this.setPreview(null)
  }

  render() {
    const {distributions, extent, t} = this.props
    const {preview} = this.state

    if (distributions.length === 0) {
      return t('downloads.noDownloads')
    }

    const vectorDistributions = distributions.filter(distribution => !distribution.originalDistribution)
    const otherDistributions = distributions.filter(distribution => distribution.originalDistribution === true)

    return (
      <div>
        {vectorDistributions.length > 0 && (
          <section>
            <h5>{t('downloads.vectorData')}</h5>
            {vectorDistributions.map(distribution => (
              <div key={distribution._id} className='distribution'>
                <DatasetDownload distribution={distribution} setPreview={this.setPreview} />
              </div>
            ))}

            {preview && (
              <Preview
                title={preview.name}
                link={preview.link}
                extent={extent}
                onClose={this.clearPreview}
              />
            )}
          </section>
        )}
        {otherDistributions.length > 0 && (
          <section>
            <h5>{t('downloads.otherData')}</h5>
            <ul>
              {otherDistributions.map(distribution => (
                <li key={distribution._id}>
                  {distribution.available ? (
                    <a download href={distribution.location}>
                      {distribution.name}
                    </a>
                  ) : distribution.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        <style jsx>{`
          section {
            margin-bottom: 1rem;

            &:last-child {
              margin-bottom: 0;
            }
          }

          ul {
            margin: 0;
            padding: 0;
            list-style-position: inside;
          }

          .distribution {
            margin-bottom: 1.4em;

            &:last-child {
              margin-bottom: 0;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default translate('dataset')(Downloads)
