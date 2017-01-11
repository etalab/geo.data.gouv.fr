import React, { Component } from 'react'
import { Table } from 'reactable'

import style from './DatasetTable.css'

class DatasetTable extends Component {
    render() {
      const { features } = this.props
      const data = features.map(feature => {
        delete feature.properties.gml_id

        return feature.properties
      })

      return (
        <Table
          className={style.table}
          data={data}
          sortable={true}
          itemsPerPage={20}
          pageButtonLimit={20}
          noDataText="Chargement..." />
      )
    }
}

export default DatasetTable
