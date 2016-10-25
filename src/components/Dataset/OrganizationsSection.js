import React from 'react'

const OrganizationsSection = ({organizations}) => {
  const styles = {
    organizations: {
      display: 'flex',
      flexDirection: 'column',
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
    },
  }
  return (
    <div style={styles.organizations}>
      <h3>Organizations</h3>
      <div style={styles.list}>
        {organizations.map( (organization, idx) => <div key={idx}>{organization}</div>)}
      </div>
    </div>
      )
}

export default OrganizationsSection
