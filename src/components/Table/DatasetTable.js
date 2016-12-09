import React, { Component } from 'react'
import { Table } from 'reactable'
import './Table.css'

const styles = {
  loading: {
    width: '40%',
  },
}

class DatasetTable extends Component {
    render() {
      const { features } = this.props
      const data = features.map(feature => {
        delete feature.properties.gml_id
        feature.properties.SURVAL = <a href={feature.properties.SURVAL}>lien</a>

        return feature.properties
      })

      return <Table
        style={!data.length ? styles.loading : {}}
        data={data}
        sortable={true}
        itemsPerPage={20}
        pageButtonLimit={20}
        noDataText="Chargement..." />
    }
}

export default DatasetTable
