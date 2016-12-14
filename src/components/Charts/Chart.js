import React from 'react'

const Chart = ({chart, description}) => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }

  return (
    <div style={styles.container}>
      <h3>{description}</h3>
      {chart}
    </div>
    )
}

export default Chart
