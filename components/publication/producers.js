import React from 'react'
import PropTypes from 'prop-types'

import withFetch from '../hoc/with-fetch'

import Box from '../box'
import Button from '../button'

class Producers extends React.Component {
  static propTypes = {
    organization: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,

    producers: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      associatedTo: PropTypes.string
    })).isRequired,

    organizations: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired
    })).isRequired,

    associateProducer: PropTypes.func.isRequired,
    dissociateProducer: PropTypes.func.isRequired
  }

  associateProducer = producer => () => {
    const { associateProducer } = this.props

    associateProducer(producer)
  }

  dissociateProducer = producer => () => {
    const { dissociateProducer } = this.props

    dissociateProducer(producer)
  }

  render() {
    const { organization, producers, organizations } = this.props

    const linked = []
    const linkedToOthers = []
    const unlinked = []

    producers.forEach(producer => {
      if (!producer.associatedTo) {
        unlinked.push(producer)
      } else if (producer.associatedTo === organization.id) {
        linked.push(producer)
      } else {
        linkedToOthers.push({
          producer,
          organization: organizations.find(org => org._id === producer.associatedTo)
        })
      }
    })

    return (
      <div>
        <Box
          color='green'
          padded={false}
          title={
            <div className='title'>
              <div>
                Producteurs rattachés à votre organisation
              </div>
              <div>{linked.length}</div>
            </div>
          }
        >
          {linked.map(producer => (
            <div className='row' key={producer._id}>
              <div>{producer._id}</div>
              <Button color='white' onClick={this.dissociateProducer(producer)}>
                Dissocier
              </Button>
            </div>
          ))}
        </Box>

        <Box
          color='blue'
          padded={false}
          title={
            <div className='title blue'>
              <div>
                Producteurs non-rattachés
                <small>
                  Ajoutez les producteurs dont vous souhaitez que les données ouvertes soient publiées dans votre organisation.
                </small>
              </div>
              <div>{unlinked.length}</div>
            </div>
          }
        >
          {unlinked.map(producer => (
            <div className='row' key={producer._id}>
              <div>{producer._id}</div>
              <Button color='white' onClick={this.associateProducer(producer)}>
                Associer
              </Button>
            </div>
          ))}
        </Box>

        <Box
          padded={false}
          title={
            <div className='title'>
              <div>
                Producteurs rattachés à d’autres organisations
                <small>
                  Les producteurs de cette liste ne peuvent pas être rattachés à votre compte organisation parce qu’ils sont déjà rattachés à un autre compte. N’hésitez pas à contacter l’organisation de rattachement si vous estimez que votre propre compte est plus pertinent.
                  <br />
                  En cas de difficulté, contactez <a href='mailto:geo@data.gouv.fr'>notre équipe</a>.
                </small>
              </div>
              <div>{linkedToOthers.length}</div>
            </div>
          }
        >
          {linkedToOthers.map(({ producer, organization }) => (
            <div className='row' key={producer._id}>
              <div>{producer._id}</div>
              <div>
                Rattaché à <a href={`https://www.data.gouv.fr/fr/organizations/${organization._id}/`}>
                  {organization.name || 'une autre organisation'}
                </a>
              </div>
            </div>
          ))}
        </Box>

        <style jsx>{`
          @import 'colors';

          .title {
            display: flex;
            align-items: center;

            div:last-child {
              margin-left: auto;
              padding: 0 0.5em 0 1em;
              font-weight: bold;
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
            padding: 0.5em 1em;
            border-bottom: 1px solid $whitesmoke;

            &:hover {
              background-color: $whitesmoke;
            }

            &:last-child {
              border-bottom: 0 none;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default withFetch(
  ([ producers, organizations ]) => ({
    producers,
    organizations
  })
)(Producers)
