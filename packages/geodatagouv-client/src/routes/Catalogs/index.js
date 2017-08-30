import Loadable from 'react-loadable'

import Loader from 'common/components/Loader'

export default Loadable({
  loader: () => import(/* webpackChunkName: 'catalogs' */ './components/CatalogsRouter'),
  loading: Loader
})
