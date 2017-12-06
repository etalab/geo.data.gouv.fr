import React from 'react'
import PropTypes from 'prop-types'

import AddIcon from 'react-icons/lib/fa/plus-circle'

import { sortByScore, findCandidates } from '../../../lib/catalog'

import Modal from '../../modal'
import CatalogPreview from '../../catalog-preview'
import Button from '../../button'

class AddCatalogModal extends React.Component {
  static propTypes = {
    catalogs: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired
    })),
    blacklist: PropTypes.arrayOf(PropTypes.string).isRequired,

    addCatalog: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
  }

  addCatalog = catalog => () => {
    const { addCatalog, onClose } = this.props

    onClose()
    addCatalog(catalog)
  }

  render() {
    const { catalogs, blacklist, onClose } = this.props
    const addable = sortByScore(findCandidates(catalogs, blacklist))

    return (
      <Modal fluid onClose={onClose} title='Ajouter un catalogue'>
        <div className='catalogs'>
          {addable.map(catalog => (
            <div className='catalog' key={catalog._id}>
              <CatalogPreview catalog={catalog} />
              <div className='button'>
                <Button onClick={this.addCatalog(catalog)}>
                  <AddIcon style={{ verticalAlign: -2 }} /> Ajouter ce catalogue
                </Button>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .catalogs {
            display: grid;
            grid-template-columns: repeat(auto-fill, 350px);
            grid-gap: 1.2em;
            align-items: center;

            @media (max-width: 551px) {
              display: block;

              div {
                margin-bottom: 1em;
              }
            }
          }

          .button {
            margin-top: 7px;
          }
        `}</style>
      </Modal>
    )
  }
}

export default AddCatalogModal
