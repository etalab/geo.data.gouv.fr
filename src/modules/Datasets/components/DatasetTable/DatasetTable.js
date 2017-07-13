import React, { Component } from 'react'
import { Table } from 'reactable'

import style from './DatasetTable.scss'

class DatasetTable extends Component {
    render() {
      const { geojson } = this.props
      let noDataText = 'Chargement...'
      let data = []

      if (geojson) {
        if (!geojson.features || !geojson.features.length) {
          noDataText = 'Les données sont vides'
        } else {
          data = geojson.features.map(feature => {
            delete feature.properties.gml_id

            return feature.properties
          })
        }
      }

      return (
        <Table
          className={style.table}
          data={data}
          sortable={true}
          itemsPerPage={20}
          pageButtonLimit={20}
          noDataText={noDataText} />
      )
    }
}

export default DatasetTable
