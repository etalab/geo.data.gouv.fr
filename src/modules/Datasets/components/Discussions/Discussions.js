import React, { Component } from 'react'
import moment from 'moment'

import Discussion from './Discussion'
import DiscussionForm from './DiscussionForm'

import Button from '../../../../components/Buttons/Button'

import { getDiscussions, getUser } from '../../../../fetch/fetch'
import { waitForDataAndSetState, cancelAllPromises } from '../../../../helpers/components'

import { container } from './Discussions.css'

// const fakeDiscussions = {
//   'data':[
//     {
//       'class':'Discussion',
//       'closed':null,
//       'closed_by':null,
//       'created':'2017-01-08T18:40:16.481000',
//       'discussion':[
//         {
//           'content':'Bonjour,\nCe jeu de données serait plus complet avec un attribut supplémentaire donnant le diametre des conduites.\nCe serait super pour utiliser ces données dans des logiciels de modélisation hydraulique\nMerci par avance',
//           'posted_by':{
//             'avatar':'https://www.data.gouv.fr/s/avatars/73/fad1e5d3994738bf3185d1793b7ec8-100.png',
//             'class':'User',
//             'first_name':'François',
//             'id':'538346b6a3a72906c7ec5c27',
//             'last_name':'Lacombe',
//             'page':'https://www.data.gouv.fr/fr/users/francois-lacombe/',
//             'slug':'francois-lacombe',
//             'uri':'https://www.data.gouv.fr/api/1/users/francois-lacombe/'
//           },
//           'posted_on':'2017-01-08T18:40:16.481000'
//         },
//         {
//           'content':'Bonjour,\n\nCes informations étaient présentes avant l\'état d\'urgence. ces informations ont été enlevées par le service de l\'Eau dans le cadre de l\'Etat d\'urgence parce qu\'elles peuvent présentées un risquencdt',
//           'posted_by':{
//             'avatar':'https://www.data.gouv.fr/s/avatars/2015-03-16/eac5fe49f2bc489b973d48a83432b6f9/P1050260-100.png',
//             'class':'User',
//             'first_name':'Séverine',
//             'id':'54da1d04c751df567b467389',
//             'last_name':'FERRANT',
//             'page':'https://www.data.gouv.fr/fr/users/severine-ferrant-2/',
//             'slug':'severine-ferrant-2',
//             'uri':'https://www.data.gouv.fr/api/1/users/severine-ferrant-2/'
//           },
//           'posted_on':'2017-01-30T13:55:45.631000'
//         }
//       ],
//       'id':'5872798088ee383b090bfefe',
//       'subject':{
//         'class':'Dataset',
//         'id':'5596550888ee382cf44a22eb'
//       },
//       'title':'Diametre des conduites',
//       'url':'https://www.data.gouv.fr/api/1/discussions/5872798088ee383b090bfefe/',
//       'user':{
//         'avatar':'https://www.data.gouv.fr/s/avatars/73/fad1e5d3994738bf3185d1793b7ec8-100.png',
//         'class':'User',
//         'first_name':'François',
//         'id':'538346b6a3a72906c7ec5c27',
//         'last_name':'Lacombe',
//         'page':'https://www.data.gouv.fr/fr/users/francois-lacombe/',
//         'slug':'francois-lacombe',
//         'uri':'https://www.data.gouv.fr/api/1/users/francois-lacombe/'
//       }
//     },
//   ],
//   'facets':null,
//   'next_page':null,
//   'page':1,
//   'page_size':20,
//   'previous_page':null,
//   'total':2
// }

const fakeDiscussion = {
  'class':'Discussion',
  'closed':null,
  'closed_by':null,
  'created':'2017-01-08T18:40:16.481000',
  'discussion':[
    {
      'content':'',
      'posted_by':{
        'avatar':'https://www.data.gouv.fr/s/avatars/eb/83c84da50343078fb902f4e9ae584e-100.png',
        'class':'User',
        'first_name': 'Passerelle',
        'id':'538346b6a3a72906c7ec5c27',
        'last_name':'Inspire',
        'page':'https://www.data.gouv.fr/fr/users/passerelle-inspire/',
        'slug':'passerelle-inspire',
        'uri':'https://www.data.gouv.fr/api/1/users/passerelle-inspire/'
      },
      'posted_on':'2017-01-08T18:40:16.481000'
    },
  ],
  'id':'5872798088ee383b090bfefe',
  'subject':{
    'class':'Dataset',
    'id':'5596550888ee382cf44a22eb'
  },
  'title': '',
  'url':'https://www.data.gouv.fr/api/1/discussions/5872798088ee383b090bfefe/',
  'user':{
    'avatar':'https://www.data.gouv.fr/s/avatars/eb/83c84da50343078fb902f4e9ae584e-100.png',
    'class':'User',
    'first_name':'François',
    'id':'538346b6a3a72906c7ec5c27',
    'last_name':'Lacombe',
    'page':'https://www.data.gouv.fr/fr/users/passerelle-inspire/',
    'slug':'passerelle-inspire',
    'uri':'https://www.data.gouv.fr/api/1/users/passerelle-inspire/'
  }
}

class Discussions extends Component {
  constructor(props) {
    super(props)
    this.state = {discussionForm: false, formError: false, errors: []}
    // this.state = {discussions: fakeDiscussions}
  }

  componentWillMount() {
    return Promise.all([
      this.updateDiscussions(),
      this.updateUser(),
    ])
  }

  updateUser() {
    return waitForDataAndSetState(getUser(), this, 'user')
  }

  updateDiscussions() {
    const { remoteId } = this.props

    if (!remoteId) return
    return waitForDataAndSetState(getDiscussions(remoteId), this, 'discussions')
  }

  componentWillUnmount() {
    return cancelAllPromises(this)
  }

  showDiscussionForm() {
    this.setState({discussionForm: true})
  }

  createDiscussion(title, comment) {
    const { user } = this.state
    const { remoteId } = this.props

    if (!title || !comment) return this.setState({ formError: true })

    fakeDiscussion.title = title
    fakeDiscussion.discussion[0].content = comment

    const test = this.state.discussions

    const newDiscussion = {
      'class': 'Discussion',
      'closed': null,
      'closed_by': null,
      'created': moment().format(),
      'discussion': {
        'content': comment,
        'posted_by': {
          'class': 'User',
          'id': user.id,
          'avatar': user.avatar,
          'first_name': user.first_name,
          'last_name': user.last_name,
          'page': user.page,
          'slug': user.slug,
          'uri': user.uri
        },
        'posted_on': moment().format()
      },
      'id': null,
      'subject': {
        'class': 'Dataset',
        'id': remoteId
      },
      'title': title,
      'url': null,
      'user': {
        'class': 'User',
        'id': user.id,
        'avatar': user.avatar,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'page': user.page,
        'slug': user.slug,
        'uri': user.uri
      }
    }

    test.data.push(fakeDiscussion)

    this.setState({ discussions: test, discussionForm: false, formError: false })
  }

  render() {
    const { discussions, discussionForm, user, reply, formError } = this.state
    const { datasetId, remoteId } = this.props
    const redirect = `${process.env.PUBLIC_URL}/datasets/${datasetId}`
    const logInUrl =`https://inspire.data.gouv.fr/dgv/login?redirect=${encodeURIComponent(redirect)}`
    console.log(datasetId, remoteId)
    console.log(discussions)
    const newDiscussion = user ?
      <Button text={'Démarrer une nouvelle discussion'} action={() => this.showDiscussionForm()}/> :
      <a href={logInUrl}><Button text={'Démarrer une nouvelle discussion'}/></a>

    return (
      <div className={container}>
        {discussions ?
          discussions.data.map((discussion, idx) => <Discussion key={idx} remoteId={remoteId} discussion={discussion} reply={() => this.reply()} />)
          : null
        }
        {discussionForm ?
          <DiscussionForm user={user} error={formError} createDiscussion={(title, comment) => this.createDiscussion(title, comment)} /> :
          newDiscussion
        }
      </div>
    )
  }
}



export default Discussions
