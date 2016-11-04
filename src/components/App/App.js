import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { theme } from '../../tools'

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
    backgroundColor: theme.white,
  },
  body: {
    flex: 1,
  }
}

const App = ({children}) => {
  return (
    <div className="Content" style={styles.content}>
      <Header />
      <div style={styles.body}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default App
