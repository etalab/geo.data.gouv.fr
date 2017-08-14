import React from 'react'
import Loadable from 'react-loadable'

import Loader from 'common/components/Loader'

const LoadableCenteredMap = Loadable({
  loader: () => import(/* webpackChunkName: 'components/map' */ './CenteredMap'),
  loading: () => <Loader loading />
})

export default LoadableCenteredMap
