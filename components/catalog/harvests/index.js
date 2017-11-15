import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { translate } from 'react-i18next'

import Table from './table'
import Histogram from './histogram'

class Harvests extends React.Component {
  static propTypes = {
    catalog: PropTypes.shape({
      _id: PropTypes.string.isRequired
    }).isRequired,
    harvests: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,

    t: PropTypes.func.isRequired
  }

  getGraphData = () => {
    const { harvests } = this.props

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

  render() {
    const { catalog, harvests, t } = this.props

    return (
      <section>
        <div className='table'>
          <Table catalog={catalog} harvests={harvests} />
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

          div {
            flex: 1 1;
          }

          h4 {
            text-align: center;
          }

          .table {
            margin-right: 2em;

            @media (max-width: 960px) {
              margin-right: 0;
            }
          }

          .graph {
            display: flex;
            flex-direction: column;

            div {
              flex: 1 1;
            }
          }
        `}</style>
      </section>
    )
  }
}

export default translate('catalogs')(Harvests)
