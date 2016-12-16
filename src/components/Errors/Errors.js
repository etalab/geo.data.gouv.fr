import React from 'react'

const styles = {
    errors: {
      width: '90%',
      textAlign: 'center',
    }
}

const Errors = ({ errors }) => {
  const title = errors.length > 1 ? <h3>Des erreurs sont survenues :</h3> : <h3>Une erreur est survenue :</h3>
  return (
    <div style={styles.errors}>
      {title}
      {errors.map((error, idx) => <div key={idx}>{error}</div>)}
    </div>
  )
}

export default Errors
