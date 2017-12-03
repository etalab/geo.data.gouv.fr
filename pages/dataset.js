import React from 'react'
import PropTypes from 'prop-types'
import { uniqWith, isEqual } from 'lodash'

import { _get } from '../lib/fetch'

import withI18n from '../components/hoc/with-i18n'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'
import Container from '../components/container'
import Box from '../components/box'

import Producer from '../components/dataset/producer'
import Datagouv from '../components/dataset/datagouv'
import Contacts from '../components/dataset/contacts'

import Header from '../components/dataset/header'
import Downloads from '../components/dataset/downloads'

import Thumbnails from '../components/dataset/thumbnails'
import SpatialExtent from '../components/dataset/spatial-extent'
import Links from '../components/dataset/links'

import Metadata from '../components/dataset/metadata'

import { GEODATA_API_URL, DATAGOUV_API_URL } from '@env'

class DatasetPage extends React.Component {
  static propTypes = {
    dataset: PropTypes.shape({
      recordId: PropTypes.string.isRequired,
      revisionDate: PropTypes.string.isRequired,
      metadata: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        thumbnails: PropTypes.arrayOf(PropTypes.shape({
          originalUrlHash: PropTypes.string.isRequired
        })),
        spatialExtent: PropTypes.object,
        equivalentScaleDenominator: PropTypes.number,
        spatialResolution: PropTypes.object,
        contacts: PropTypes.array.isRequired,
        links: PropTypes.array.isRequired,
        credits: PropTypes.string
      }).isRequired,

      organizations: PropTypes.array.isRequired,

      dataset: PropTypes.shape({
        distributions: PropTypes.array.isRequired
      }).isRequired
    }).isRequired,

    datagouvPublication: PropTypes.shape({
      remoteId: PropTypes.isRequired
    }),

    t: PropTypes.func.isRequired
  }

  static async getInitialProps({ query }) {
    const [dataset, publications] = await Promise.all([
      _get(`${GEODATA_API_URL}/records/${query.did}`),
      _get(`${GEODATA_API_URL}/records/${query.did}/publications`)
    ])

    const datagouvPublication = publications.find(p => p.target === 'dgv')

    return {
      dataset,
      datagouvPublication
    }
  }

  state = {
    datagouvDatasetPromise: null
  }

  componentDidMount() {
    const { datagouvPublication } = this.props

    // Let’s not depend too much on data.gouv.fr’s availability, so we’re
    // fetching this after the page has loaded.
    if (datagouvPublication && datagouvPublication.remoteId) {
      this.setState(() => ({
        datagouvDatasetPromise: _get(`${DATAGOUV_API_URL}/datasets/${datagouvPublication.remoteId}/`)
      }))
    }
  }

  render() {
    const { dataset: {
      recordId,
      revisionDate,
      metadata,
      dataset,
      organizations
    }, datagouvPublication, t } = this.props
    const { datagouvDatasetPromise } = this.state

    const contacts = uniqWith(metadata.contacts.map(contact => ({
      ...contact,
      // We don’t use this field and it causes some contacts to be duplicated.
      relatedTo: undefined
    })), isEqual)

    const hasThumbnails = metadata.thumbnails && metadata.thumbnails.length > 0
    const hasLinks = metadata.links.length > 0

    return (
      <Page>
        <Meta
          title={metadata.title}
          description={metadata.description}
          images={hasThumbnails && metadata.thumbnails.map(
            thumbnail => `${GEODATA_API_URL}/records/${recordId}/thumbnails/${thumbnail.originalUrlHash}`
          )}
        />

        <Content clouds>
          <Container fluid>
            <div className='container'>
              <div className='left'>
                {datagouvPublication && (
                  <Box title={t('blocks.producer')}>
                    <Producer promise={datagouvDatasetPromise} />
                  </Box>
                )}

                <Box title={t('blocks.datagouv')}>
                  <Datagouv
                    license={metadata.license}
                    organizations={organizations}
                    distributions={dataset.distributions}
                    publication={datagouvPublication}
                  />
                </Box>

                {contacts.length > 0 && (
                  <Box title={t('blocks.contacts')}>
                    <Contacts contacts={contacts} />
                  </Box>
                )}

                {metadata.credit && (
                  <Box title={t('blocks.credit')}>
                    {metadata.credit}
                  </Box>
                )}
              </div>
              <div className='main'>
                <Box>
                  <Header metadata={metadata} />
                </Box>
                <Box title={t('blocks.downloads')}>
                  <Downloads distributions={dataset.distributions} />
                </Box>
              </div>
              {(hasThumbnails || metadata.spatialExtent || hasLinks) && (
                <div className='right'>
                  {hasThumbnails && (
                    <Box title={t('blocks.thumbnails')}>
                      <Thumbnails recordId={recordId} thumbnails={metadata.thumbnails} />
                    </Box>
                  )}
                  {metadata.spatialExtent && (
                    <Box title={t('blocks.spatialExtent')}>
                      <SpatialExtent
                        extent={metadata.spatialExtent}
                        scale={metadata.equivalentScaleDenominator}
                        resolution={metadata.spatialResolution}
                      />
                    </Box>
                  )}
                  {hasLinks && (
                    <Box title={t('blocks.links')}>
                      <Links links={metadata.links} />
                    </Box>
                  )}
                </div>
              )}
            </div>

            <div className='footer'>
              <Metadata id={metadata.id} revisionDate={revisionDate} />
            </div>
          </Container>
        </Content>

        <style jsx>{`
          .container {
            display: flex;
            flex-wrap: wrap;
            flex: 1;

            @media (max-width: 768px) {
              flex-direction: column;
            }
          }

          .left, .right {
            width: 370px;

            @media (max-width: 1680px) {
              width: 330px;
            }

            @media (max-width: 1480px) {
              width: 310px;
            }

            @media (max-width: 1280px) {
              width: 270px;
            }

            @media (max-width: 1080px) {
              width: 230px;
            }
          }

          .left {
            margin-right: 20px;

            @media (max-width: 1080px) {
              width: 38%;
            }

            @media (max-width: 768px) {
              width: 100%;
              margin: 0;
              order: 1;
            }
          }

          .right {
            margin-left: 20px;

            @media (max-width: 1080px) {
              flex: 1 0 100%;
              width: 100%;
              margin: 0;
              order: 2;
            }
          }

          .main {
            flex: 1;

            @media (max-width: 768px) {
              order: 0;
            }
          }

          .footer {
            margin-top: auto;
          }
        `}</style>
      </Page>
    )
  }
}

export default withI18n('dataset')(DatasetPage)
