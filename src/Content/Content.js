import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Content = ({location, children}) => {
  const styles = {
    content: {
      flexDirection: 'column',
      display: 'flex',
      position: 'relative',
      minHeight: '100vh',
    },
    body: {
      flex: 1,
    }
  }

  return (
    <div className="Content" style={styles.content}>
      <Header location={location}/>
      <div style={styles.body}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Content
