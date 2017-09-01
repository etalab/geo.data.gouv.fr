import React from 'react'

import HomePage from '../components/HomePage'

const catalogsMock = [
  {
    '_id': '5387761fb01aa2342e124c96',
    'name': 'GrandLyon Smart Data',
    'service': {
      'location': 'https://download.data.grandlyon.com/catalogue/srv/fr/csw',
      'sync': {
        'status': 'successful',
        'finishedAt': '2017-01-23T01:03:24.373Z'
      }
    },
    'metrics': {
      'datasets': {
        'partitions': {
          'download': {
            'not-determined': 31,
            'yes': 409
          },
          'openness': {
            'not-determined': 17,
            'yes': 423
          },
          'dataType': {
            'none': 2,
            'grid': 218,
            'vector': 220
          }
        },
        'totalCount': 440
      },
      'records': {
        'totalCount': 846
      }
    }
  },
  {
    '_id': '54d5de332eb5568ca8350f3f',
    'name': 'Région Bretagne',
    'service': {
      'location': 'http://applications.region-bretagne.fr/geonetwork/srv/fre/csw',
      'sync': {
        'status': 'successful',
        'finishedAt': '2017-01-23T01:07:06.331Z'
      }
    },
    'metrics': {
      'datasets': {
        'partitions': {
          'download': {
            'not-determined': 11,
            'yes': 79
          },
          'openness': {
            'not-determined': 10,
            'yes': 80
          },
          'dataType': {
            'grid': 1,
            'vector': 89
          }
        },
        'totalCount': 90
      },
      'records': {
        'totalCount': 94
      }
    }
  },
  {
    '_id': '54f5a39a62781800bf6db9e6',
    'name': 'Adour-Garonne (EauFrance)',
    'service': {
      'location': 'http://catalogue.adour-garonne.eaufrance.fr/catalog/srv/fre/csw-sie-seul',
      'sync': {
        'status': 'successful',
        'finishedAt': '2017-01-23T01:05:21.864Z'
      }
    },
    'metrics': {
      'datasets': {
        'partitions': {
          'download': {
            'not-determined': 9,
            'yes': 64
          },
          'openness': {
            'not-determined': 13,
            'yes': 60
          },
          'dataType': {
            'none': 21,
            'vector': 52
          }
        },
        'totalCount': 73
      },
      'records': {
        'partitions': {
          'metadataType': {
            'Dublin Core': 29,
            'ISO 19139': 75
          },
          'recordType': {
            'service': 2,
            'other': 29,
            'dataset': 73
          }
        },
        'totalCount': 104
      }
    }
  }
]

export default () => {
  console.log('in container')
  return (
  <HomePage catalogs={catalogsMock} t={a => a} />
)
}
