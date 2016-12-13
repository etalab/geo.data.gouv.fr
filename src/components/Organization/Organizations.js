import React from 'react'
import OrganizationCard from './OrganizationCard'

const styles = {
  cards: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
}

const Organizations = ({ organizations }) => {
  return (
        <div style={styles.cards}>
          {organizations.map((organization, idx) => <OrganizationCard key={idx} organization={organization} />)}
        </div>
  )
}

export default Organizations
