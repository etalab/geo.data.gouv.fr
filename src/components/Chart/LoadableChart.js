import React from 'react'
import LoadableVisibility from 'react-loadable-visibility/react-loadable'

import Loader from 'common/components/Loader'

const LoadableChart = LoadableVisibility({
  loader: () => import(/* webpackChunkName: 'components/chart' */ './Chart'),
  loading: () => <Loader loading />
})

export default LoadableChart
