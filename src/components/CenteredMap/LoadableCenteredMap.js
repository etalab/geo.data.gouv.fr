import React from 'react'
import LoadableVisibility from 'react-loadable-visibility/react-loadable'

import Loader from 'common/components/Loader'

const LoadableCenteredMap = LoadableVisibility({
  loader: () => import(/* webpackChunkName: 'components/map' */ './CenteredMap'),
  loading: () => <Loader loading />
})

export default LoadableCenteredMap
