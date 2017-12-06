import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { intersectionWith } from 'lodash'

import RemoveIcon from 'react-icons/lib/fa/trash-o'
import LoadingIcon from 'react-icons/lib/fa/refresh'

import withFetch from '../hoc/with-fetch'

import CatalogPreview from '../catalog-preview'
import Button from '../button'

class SourceCatalogs extends React.Component {
  static propTypes = {
    organization: PropTypes.shape({
      sourceCatalogs: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,

    catalogs: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired
    })).isRequired,

    removeCatalog: PropTypes.func.isRequired
  }

  state = {
    removing: {}
  }

  removeCatalog = catalog => () => {
    const { organization, removeCatalog } = this.props

    this.setState(state => ({
      removing: {
        ...state.removing,
        [catalog._id]: true
      }
    }))

    removeCatalog(organization, catalog)
  }

  render() {
    const { organization, catalogs } = this.props
    const { removing } = this.state

    const sourceCatalogs = intersectionWith(
      catalogs,
      organization.sourceCatalogs,
      (catalog, id) => catalog._id === id
    )

    return (
      <div>
        {sourceCatalogs.map(catalog => {
          const isRemoving = removing[catalog._id]

          return (
            <div key={catalog._id} className='catalog'>
              <CatalogPreview catalog={catalog} />
              <div className='remove'>
                <Button color='red' disabled={isRemoving} onClick={this.removeCatalog(catalog)}>
                  {isRemoving ? (
                    <Fragment>
                      <LoadingIcon style={{ verticalAlign: -2 }} /> Suppression…
                    </Fragment>
                  ) : (
                    <Fragment>
                      <RemoveIcon style={{ verticalAlign: -1 }} /> Supprimer
                    </Fragment>
                  )}
                </Button>
              </div>
            </div>
          )
        })}

        <style jsx>{`
          .catalog {
            margin-bottom: 1.2em;

            &:last-child {
              margin-bottom: 0;
            }
          }

          .remove {
            margin-top: 5px;
          }
        `}</style>
      </div>
    )
  }
}

export default withFetch(
  ([ organization, catalogs ]) => ({
    organization,
    catalogs
  })
)(SourceCatalogs)
