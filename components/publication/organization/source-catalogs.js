import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {intersectionWith} from 'lodash'

import RemoveIcon from 'react-icons/lib/fa/trash-o'
import LoadingIcon from 'react-icons/lib/fa/refresh'
import AddIcon from 'react-icons/lib/fa/plus-circle'

import withFetch from '../../hoc/with-fetch'

import CatalogPreview from '../../catalog-preview'
import Button from '../../button'
import AddCatalogModal from './add-catalog-modal'

class SourceCatalogs extends React.Component {
  static propTypes = {
    organization: PropTypes.shape({
      sourceCatalogs: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,

    catalogs: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired
    })).isRequired,

    removeCatalog: PropTypes.func.isRequired,
    addCatalog: PropTypes.func.isRequired
  }

  state = {
    removing: {},
    showAddModal: false,
    adding: false
  }

  UNSAFE_componentWillReceiveProps(props) {
    const {organization} = this.props

    if (organization.sourceCatalogs !== props.organization.sourceCatalogs) {
      this.setState({
        adding: false,
        removing: {}
      })
    }
  }

  removeCatalog = catalog => () => {
    const {organization, removeCatalog} = this.props

    this.setState(state => ({
      removing: {
        ...state.removing,
        [catalog._id]: true
      }
    }))

    removeCatalog(organization, catalog)
  }

  addCatalog = catalog => {
    const {organization, addCatalog} = this.props

    this.setState({
      adding: true
    })

    addCatalog(organization, catalog)
  }

  onOpenModal = () => {
    this.setState({
      showAddModal: true
    })
  }

  onCloseModal = () => {
    this.setState({
      showAddModal: false
    })
  }

  render() {
    const {organization, catalogs} = this.props
    const {removing, showAddModal, adding} = this.state

    const sourceCatalogs = intersectionWith(
      catalogs,
      organization.sourceCatalogs,
      (catalog, id) => catalog._id === id
    )

    const anyRemoving = Object.values(removing).some(v => v)

    return (
      <div>
        <div className={sourceCatalogs.length > 0 && 'bordered'} >
          {sourceCatalogs.map(catalog => {
            const isRemoving = removing[catalog._id]

            return (
              <div key={catalog._id} className='catalog'>
                <CatalogPreview catalog={catalog} />
                <div className='remove'>
                  <Button color='red' disabled={adding || anyRemoving} onClick={this.removeCatalog(catalog)}>
                    {isRemoving ? (
                      <Fragment>
                        <LoadingIcon style={{verticalAlign: -2}} /> Suppression…
                      </Fragment>
                    ) : (
                      <Fragment>
                        <RemoveIcon style={{verticalAlign: -2}} /> Supprimer
                      </Fragment>
                    )}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <Button disabled={adding || anyRemoving} onClick={this.onOpenModal}>
          {adding ? (
            <Fragment>
              <LoadingIcon style={{verticalAlign: -2}} /> Ajout du catalogue…
            </Fragment>
          ) : (
            <Fragment>
              <AddIcon style={{verticalAlign: -2}} /> Ajouter un catalogue
            </Fragment>
          )}
        </Button>

        {showAddModal && (
          <AddCatalogModal
            catalogs={catalogs}
            blacklist={organization.sourceCatalogs}
            addCatalog={this.addCatalog}
            onClose={this.onCloseModal}
          />
        )}

        <style jsx>{`
          @import 'colors';

          .bordered {
            border-bottom: 1px solid $lightgrey;
            padding-bottom: 1em;
            margin-bottom: 1em;
          }

          .catalog {
            margin-bottom: 1.2em;

            &:last-child {
              margin-bottom: 0;
            }
          }

          .remove {
            margin-top: 7px;
          }
        `}</style>
      </div>
    )
  }
}

export default withFetch(
  ([organization, catalogs]) => ({
    organization,
    catalogs
  })
)(SourceCatalogs)
