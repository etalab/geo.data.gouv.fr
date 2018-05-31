import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {sortBy, deburr} from 'lodash'

import LoadingIcon from 'react-icons/lib/fa/refresh'

import withFetch from '../hoc/with-fetch'

import Box from '../box'
import Link from '../link'
import Button from '../button'

class Datasets extends React.Component {
  static propTypes = {
    published: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      remoteUrl: PropTypes.string.isRequired
    })).isRequired,

    notPublished: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })).isRequired,

    publishedByOthers: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      remoteUrl: PropTypes.string.isRequired
    })).isRequired,

    publishDatasets: PropTypes.func.isRequired
  }

  state = {
    toPublish: [],
    publishing: false
  }

  componentWillReceiveProps(props) {
    const {notPublished} = this.props

    if (notPublished !== props.notPublished) {
      this.setState({
        publishing: false,
        toPublish: []
      })
    }
  }

  toggleSelect = dataset => () => {
    this.setState(state => {
      const without = state.toPublish.filter(d => d !== dataset._id)

      if (without.length !== state.toPublish.length) {
        return {
          toPublish: without
        }
      }

      return {
        toPublish: [
          ...state.toPublish,
          dataset._id
        ]
      }
    })
  }

  toggleSelectAll = () => {
    const {notPublished} = this.props

    this.setState(state => {
      if (state.toPublish.length === notPublished.length) {
        return {
          toPublish: []
        }
      }

      return {
        toPublish: notPublished.map(dataset => dataset._id)
      }
    })
  }

  publishDatasets = () => {
    const {publishDatasets} = this.props
    const {toPublish} = this.state

    this.setState({
      publishing: true
    })

    publishDatasets(toPublish)
  }

  render() {
    const {published, notPublished, publishedByOthers} = this.props

    const {publishing, toPublish} = this.state

    const allSelected = toPublish.length === notPublished.length

    const sortedPublished = sortBy(published, ({title}) => deburr(title))
    const sortedNotPublished = sortBy(notPublished, ({title}) => deburr(title))
    const sortedPublishedByOthers = sortBy(publishedByOthers, ({title}) => deburr(title))

    return (
      <div>
        <Box
          color='blue'
          padded={false}
          title={
            <div className='title'>
              <div>
                Données en attente de publication
              </div>
              <div>{sortedNotPublished.length}</div>
            </div>
          }
        >
          {sortedNotPublished.length > 0 ? (
            <Fragment>
              {sortedNotPublished.map(dataset => (
                <div key={dataset._id} className='row' onClick={publishing ? null : this.toggleSelect(dataset)}>
                  <div>
                    <Link href={`/dataset?did=${dataset._id}`} as={`/datasets/${dataset._id}`}>
                      <a>
                        {dataset.title}
                      </a>
                    </Link>
                  </div>
                  <div>
                    <input type='checkbox' checked={toPublish.includes(dataset._id)} disabled={publishing} />
                  </div>
                </div>
              ))}
              <div className='row'>
                <div>
                  <Button disabled={!toPublish.length || publishing} onClick={this.publishDatasets}>
                    {publishing ? (
                      <Fragment>
                        <LoadingIcon style={{verticalAlign: -2}} /> Publication…
                      </Fragment>
                    ) : 'Publier les données sélectionnées'}
                  </Button>
                </div>
                <div>
                  <Button color='white' onClick={this.toggleSelectAll} disabled={publishing}>
                    {allSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
                  </Button>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className='row'>
              <i>Aucun jeu de données en attente de publication.</i>
            </div>
          )}
        </Box>

        <Box
          color='green'
          padded={false}
          title={
            <div className='title blue'>
              <div>
                Données publiées
              </div>
              <div>{sortedPublished.length}</div>
            </div>
          }
        >
          {sortedPublished.length > 0 ? sortedPublished.map(dataset => (
            <div key={dataset._id} className='row'>
              <div>
                <Link href={`/dataset?did=${dataset._id}`} as={`/datasets/${dataset._id}`}>
                  <a>
                    {dataset.title}
                  </a>
                </Link>
              </div>
              <div>
                <a href={dataset.remoteUrl}>
                  Fiche data.gouv.fr
                </a>
              </div>
            </div>
          )) : (
            <div className='row'>
              <i>Aucun jeu de données publié.</i>
            </div>
          )}
        </Box>

        <Box
          padded={false}
          title={
            <div className='title'>
              <div>
                Données publiées par une autre organisation
              </div>
              <div>{sortedPublishedByOthers.length}</div>
            </div>
          }
        >
          {sortedPublishedByOthers.length > 0 ? sortedPublishedByOthers.map(dataset => (
            <div key={dataset._id} className='row'>
              <div>
                <Link href={`/dataset?did=${dataset._id}`} as={`/datasets/${dataset._id}`}>
                  <a>
                    {dataset.title}
                  </a>
                </Link>
              </div>
              <div>
                <a href={dataset.remoteUrl}>
                  Fiche data.gouv.fr
                </a>
              </div>
            </div>
          )) : (
            <div className='row'>
              <i>Aucun jeu de données publié par une autre organization.</i>
            </div>
          )}
        </Box>

        <style jsx>{`
          @import 'colors';

          .title {
            display: flex;
            align-items: center;

            div:last-child {
              margin-left: auto;
              padding: 0 0.5em 0 1em;
              font-weight: 600;
            }

            small {
              display: block;
              margin-top: 0.2em;
              font-size: 0.9em;
              color: $grey;
            }

            &.blue small {
              color: lighten($blue, 35%);
            }
          }

          .row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.8em 1em;
            border-bottom: 1px solid $whitesmoke;

            &:hover {
              background-color: $whitesmoke;
            }

            &:last-child {
              border-bottom: 0 none;
            }
          }

          i {
            color: $grey;
          }
        `}</style>
      </div>
    )
  }
}

export default withFetch(
  ([published, notPublished, publishedByOthers]) => ({
    published,
    notPublished,
    publishedByOthers
  })
)(Datasets)
