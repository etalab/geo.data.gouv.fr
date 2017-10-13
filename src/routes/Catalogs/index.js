// import React from 'react'
// import Loadable from 'react-loadable'
import universal from 'react-universal-component'

// import Loader from 'common/components/Loader'

export default universal(import('./components/CatalogsRouter'))

// export default Loadable({
//   loader: () => import(/* webpackChunkName: 'catalogs' */ './components/CatalogsRouter'),
//   loading: () => <div>mdr</div>
// })
