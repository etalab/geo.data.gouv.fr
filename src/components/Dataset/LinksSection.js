import React from 'react'

const LinksSection = ({links, style}) => {
  const styles = {
    downloads: {
      display: 'flex',
      flexDirection: 'column',
    },
    links: {
      display: 'flex',
      flexDirection: 'column',
    },
  }
  return (
    <div style={style.section}>
      <h3 style={style.title}>Liens</h3>
      <div style={styles.links}>
        {links.map( (link, idx) => <a key={idx} href={link.href}>{link.name}</a>)}
      </div>
    </div>
      )
}

export default LinksSection
