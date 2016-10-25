import React from 'react'

const KeywordsSection = ({keywords}) => {
  const styles = {
    keywords: {
      display: 'flex',
      flexDirection: 'column',
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
    },
  }
  return (
    <div style={styles.keywords}>
      <h3>keyword</h3>
      <div style={styles.list}>
        {keywords.map( (keyword, idx) => <div key={idx}>{keyword}</div>)}
      </div>
    </div>
      )
}

export default KeywordsSection
