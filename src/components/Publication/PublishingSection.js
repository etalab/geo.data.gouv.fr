import React from 'react'
import Loader from '../Loader/Loader'
import { container } from './PublishingSection.css'

const PublishingSection = ({ title, component, toWait }) => {
  return (
    <div className={container}>
      <h3>{title}</h3>
      <Loader value={toWait} component={component} />
    </div>
  )
}

export default PublishingSection
