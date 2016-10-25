import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Content = ({location, children}) => {
  const styles = {
    loader: {
      position: 'absolute',
      top: '42%',
      left: '42%',
    },
    content: {
      flexDirection: 'column',
      display: 'flex',
      position: 'relative',
      minHeight: '100vh',
      backgroundColor: '#e2f4ff',
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
