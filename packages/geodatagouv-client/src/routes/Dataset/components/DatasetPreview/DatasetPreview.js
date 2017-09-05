import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'
import { Table } from 'reactable'

import Loader from 'common/components/Loader'
import CenteredMap from 'common/components/CenteredMap'

import styles from './DatasetPreview.scss'

class DatasetPreview extends React.PureComponent {
  static propTypes = {
    geoJson: PropTypes.shape({
      data: PropTypes.object,

      pending: PropTypes.bool.isRequired,

      error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
      ]).isRequired
    }),

    closePreview: PropTypes.func.isRequired,

    t: PropTypes.func.isRequired
  }

  state = {
    mode: 'map'
  }

  setMode = mode => () => {
    this.setState({ mode })
  }

  getTableData = geoJson => geoJson.features.map(feature => {
    const properties = { ...feature.properties }
    delete properties.gml_id
    return properties
  })

  render() {
    const { geoJson, closePreview, t } = this.props
    const { mode } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.buttons}>
          <button
            onClick={this.setMode('map')}
            className={mode === 'map' && styles.active}
          >
            {t('components.DatasetPreview.map')}
          </button>
          <button
            onClick={this.setMode('table')}
            className={mode === 'table' && styles.active}
          >
            {t('components.DatasetPreview.table')}
          </button>
          <button className={styles.closeButton} onClick={closePreview}>X</button>
        </div>

        <Loader isLoading={geoJson.pending} error={geoJson.error} className={styles.loader}>
          <div className={styles.wrapper}>
            {mode === 'map' ? (
              <CenteredMap
                vectors={geoJson.data}
                className={styles.map}
                lat={47}
                lon={1}
                zoom={5.5}
              />
            ) : (
              <Table
                data={geoJson.data && this.getTableData(geoJson.data)}
                className={styles.table}
                itemsPerPage={20}
                pageButtonLimit={20}
                sortable
              />
            )}
          </div>
        </Loader>
      </div>
    )
  }
}

export default translate('Dataset')(DatasetPreview)
