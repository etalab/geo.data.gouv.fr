import React from 'react'
import MediaQuery from 'react-responsive'

const DoughnutChartList = ({data}) => {
  const styles = {
    list: {
      row: {
        display: 'flex',
      },
      column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }
    },
    label: {
      margin: '0.2em',
    },
  }

  const list = data.map((item, idx) =>
    <div key={idx} style={styles.label} className={`ui small ${item.colorName} label`}>
      {item.label}
    </div>)

  return (
    <div>
      <MediaQuery style={styles.list.column} minWidth={551}>{list}</MediaQuery>
      <MediaQuery style={styles.list.row} maxWidth={550}>{list}</MediaQuery>
    </div>
  )
}

export default DoughnutChartList
