import React from 'react'
import { StickyContainer } from 'react-sticky'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import { content, body } from './App.scss'

const App = ({children}) => {
  return (
    <StickyContainer className={content}>
      <Header />
      <div className={body}>
        {children}
      </div>
      <Footer />
    </StickyContainer>
  )
}

export default App
