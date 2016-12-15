import React from 'react'
import Organization from './Organization'

const styles = {
  cards: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '20px',
  },
}

const Organizations = ({ organizations }) => {
  return (
        <div style={styles.cards}>
          {organizations.map((organization, idx) => <Organization key={idx} organization={organization} />)}
        </div>
  )
}

export default Organizations
