import React from 'react'

const Chart = ({chart, title, description}) => {
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

      <h2>{title}</h2>
      {chart}
      <h4>{description}</h4>

    </div>
    )
}

export default Chart
