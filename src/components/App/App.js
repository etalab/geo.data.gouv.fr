import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { content, body } from './App.css'

const App = ({children}) => {
  return (
    <div className={content}>
      <Header />
      <div className={body}>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default App
