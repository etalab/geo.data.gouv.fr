import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {translate} from 'react-i18next'

import withFetch from '../../hoc/with-fetch'

import Button from '../../button'

import Table from './table'
import Histogram from './histogram'

class Harvests extends React.Component {
  static propTypes = {
    catalog: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      service: PropTypes.shape({
        sync: PropTypes.shape({
          pending: PropTypes.bool.isRequired
        }).isRequired
      }).isRequired
    }).isRequired,
    harvests: PropTypes.array.isRequired,

    runHarvest: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  }

  state = {
    pending: false
  }

  getGraphData = () => {
    const {harvests} = this.props

    const ordered = [...harvests].reverse()
    const data = []

    ordered.forEach(harvest => {
      if (harvest.status === 'successful') {
        const date = moment(harvest.finished).format('L')
        data[date] = harvest.itemsFound
      }
    })

    return data
  }

  runHarvest = async () => {
    const {runHarvest} = this.props

    await runHarvest()

    this.setState(() => ({
      pending: true
    }))
  }

  render() {
    const {catalog, harvests, t} = this.props
    const {pending} = this.state

    const isPending = pending || catalog.service.sync.pending

    return (
      <section>
        <div className='table'>
          <Table catalog={catalog} harvests={harvests} pending={isPending} />
          <div className='button'>
            <Button block disabled={isPending} onClick={this.runHarvest}>
              {t('details.harvests.run')}
            </Button>
          </div>
        </div>
        <div className='graph'>
          <h4>{t('details.harvests.chart.title')}</h4>
          <div>
            <Histogram data={this.getGraphData()} />
          </div>
        </div>

        <style jsx>{`
          section {
            display: flex;

            @media (max-width: 960px) {
              flex-direction: column;
            }
          }

          .button {
            margin: 0.3em 0.6em;
          }

          h4 {
            text-align: center;
          }

          .table {
            margin-right: 3em;
            flex: 1 1;

            @media (max-width: 960px) {
              margin-right: 0;
              margin-bottom: 1em;
            }
          }

          .graph {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            flex: 1 1;

            div {
              flex: 1 1;
            }
          }
        `}</style>
      </section>
    )
  }
}

export default withFetch(data => ({
  harvests: data
}))(translate('catalogs')(Harvests))
