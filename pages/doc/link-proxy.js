import React from 'react'
import PropTypes from 'prop-types'
import {flowRight} from 'lodash'

import attachI18n from '../../components/hoc/attach-i18n'
import attachSession from '../../components/hoc/attach-session'

import Page from '../../components/page'
import Meta from '../../components/meta'
import Content from '../../components/content'
import Container from '../../components/container'

const LinkProxyPage = ({tReady}) => (
  <Page ready={tReady}>
    {() => (
      <React.Fragment>
        <Meta
          title='Analyse des données et ressources associées'
          description='Documentation sur l’analyse des ressources associées à vos données.'
        />

        <Content>
          <Container>
            <h1>Analyse des données et ressources associées</h1>

            <p>
              Afin que les ressources associées (documents, distributions, etc.) à vos jeux de données soient toujours à jour et accessibles, elles sont régulièrement analysées par la plateforme <b>geo.data.gouv.fr</b>.
            </p>

            <h2>Fonctionnement</h2>
            <p>
              Périodiquement, les liens associés à vos jeux de données sont analysés. Les données et documents associés sont téléchargés et historisés par notre plateforme afin de ne pas dépendre de votre architecture.
              Cela nous permet, par exemple, de détecter qu’une donnée a été modifiée, et de proposer en téléchargement une version toujours à jour. Cela permet également de proposer des téléchargements dans différents formats.
            </p>

            <h2>Fréquence d’analyse</h2>
            <p>
              Afin de ne pas avoir à télécharger trop fréquemment sur votre infrastructure, nous prenons en compte plusieurs systèmes de cache :
            </p>

            <ul>
              <li>
                Les en-têtes HTTP <code>Etag</code> et <code>Last-Modified</code> sont respectés : à chaque requête, nous passons les dernières valeurs connues de ces en-têtes via les en-têtes respectifs <code>If-None-Match</code> et <code>If-Last-Modified-Since</code>.<br />
                {''}
                Si votre serveur HTTP supporte ces en-têtes, rien ne sera téléchargé si les données n’ont pas changé.
              </li>

              <li>
                Afin de déterminer la fréquence de téléchargement (ou de modification des ressources), vous pouvez spécifier un en-tête <code>Cache-Control</code>.<br />
                {''}
                Par exemple, si nous trouvons un en-tête <code>Cache-Control: public, max-age=2592000</code> sur une ressource, nous l’analyserons de nouveau qu’un mois plus tard (2592000 secondes correspondant à un mois).
              </li>
            </ul>

            <h2>Contact</h2>
            <p>
              Si vous observez un problème avec la fréquence ou l’analyse de vos ressources, n’hésitez pas à <a href='mailto:geo@data.gouv.fr'>nous contacter</a>.
            </p>
          </Container>
        </Content>

        <style jsx>{`
          @import 'colors';

          h1 {
            font-size: 1.8rem;
            font-weight: 500;
            margin-bottom: 1em;
          }

          h2 {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 1em;
          }

          p + ul {
            margin-top: 0;
          }

          li {
            margin-bottom: 0.5em;
          }

          code {
            background-color: $lightgrey;
            padding: 0 3px;
            white-space: nowrap;
          }
        `}</style>
      </React.Fragment>
    )}
  </Page>
)

LinkProxyPage.propTypes = {
  tReady: PropTypes.bool.isRequired
}

export default flowRight(
  attachI18n(),
  attachSession
)(LinkProxyPage)
