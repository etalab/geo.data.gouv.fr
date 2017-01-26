import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'

import EventBriteWidget from '../Event/EventBriteWidget'
import SearchInput from '../SearchInput/SearchInput'
import CatalogPreview from '../CatalogPreview/CatalogPreview'

import { masthead, datasetLinks, catalogLinks, datagouv, paper, catalogs } from './Home.css'

const catalogsMock = [
  {
    '_id':'5387761fb01aa2342e124c96',
    'name':'GrandLyon Smart Data',
    'service':{
      'location':'https://download.data.grandlyon.com/catalogue/srv/fr/csw',
      'sync':{
        'status':'successful',
        'finishedAt':'2017-01-23T01:03:24.373Z'
      }
    },
    'metrics':{
      'datasets':{
        'partitions':{
          'download':{
            'not-determined':31,
            'yes':409
          },
          'openness':{
            'not-determined':17,
            'yes':423
          },
          'dataType':{
            'none':2,
            'grid':218,
            'vector':220
          }
        },
        'totalCount':440
      },
      'records':{
        'totalCount':846
      }
    }
  },
  {
    '_id':'54d5de332eb5568ca8350f3f',
    'name':'Région Bretagne',
    'service':{
      'location':'http://applications.region-bretagne.fr/geonetwork/srv/fre/csw',
      'sync':{
        'status':'successful',
        'finishedAt':'2017-01-23T01:07:06.331Z'
      }
    },
    'metrics':{
      'datasets':{
        'partitions':{
          'download':{
            'not-determined':11,
            'yes':79
          },
          'openness':{
            'not-determined':10,
            'yes':80
          },
          'dataType':{
            'grid':1,
            'vector':89
          }
        },
        'totalCount':90
      },
      'records':{
        'totalCount':94
      }
    }
  },
  {
    '_id':'54f5a39a62781800bf6db9e6',
    'name':'Adour-Garonne (EauFrance)',
    'service':{
      'location':'http://catalogue.adour-garonne.eaufrance.fr/catalog/srv/fre/csw-sie-seul',
      'sync':{
        'status':'successful',
        'finishedAt':'2017-01-23T01:05:21.864Z',
      },
    },
    'metrics':{
      'datasets':{
        'partitions':{
          'download':{
            'not-determined':9,
            'yes':64
          },
          'openness':{
            'not-determined':13,
            'yes':60
          },
          'dataType':{
            'none':21,
            'vector':52
          }
        },
        'totalCount':73
      },
      'records':{
        'partitions':{
          'metadataType':{
            'Dublin Core':29,
            'ISO 19139':75
          },
          'recordType':{
            'service':2,
            'other':29,
            'dataset':73
          }
        },
        'totalCount':104
      }
    }
  }
]

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {errors: []}
  }

  componentDidMount() {
    document.title = 'Accueil'
  }

  userSearch(path, textInput) {
    browserHistory.push(`${path}?q=${textInput}`)
  }

  render() {
    return (
      <div>
        <div className={masthead}>
          <h1>
            Trouvez facilement les données géographiques dont vous avez besoin
          </h1>
          <SearchInput placeholder={'Rechercher un jeu de donnée'} onSearch={(textInput) => this.userSearch('datasets', textInput)} searchButton={true} />
          <Link className={datasetLinks} to="datasets">Voir tous les jeux de données</Link>
        </div>

        <div className={datagouv}>
          <div className={paper}>
            <h2>Les catalogues moissonnés</h2>
            <div className={catalogs}>
              { catalogsMock.map((catalog, idx) => <CatalogPreview key={idx} catalog={catalog} />) }
            </div>
            <Link className={catalogLinks} to="catalogs">Voir tous les catalogues</Link>

            <h2 id="evenements">Événements à venir</h2>
            <EventBriteWidget src="https://www.eventbrite.fr/countdown-widget?eid=31410303062"/>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
