import React from 'react'
import {flowRight} from 'lodash'

import attachI18n from '../components/hoc/attach-i18n'
import attachSession from '../components/hoc/attach-session'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'
import Container from '../components/container'

const DocumentationPage = () => (
  <Page>
    <Meta title='Documentation' />

    <Content>
      <Container>
        <h1>Publier sur data.gouv.fr</h1>

        <div>
          <h2>Sommaire</h2>
          <ul>
            <li><a href='#prerequisites'>Pré-requis applicables aux données</a></li>
            <li><a href='#step-by-step'>Utilisation pas à pas</a></li>
            <li><a href='#account'>Compte et organisation sur data.gouv.fr</a></li>
            <li><a href='#harvesting'>Référencement et moissonnage du flux CSW</a></li>
            <li><a href='#organizations'>Gestion de vos organisations</a></li>
            <li><a href='#add-catalogs'>Ajouter des catalogues source à l’organisation</a></li>
            <li><a href='#associate-producers'>Associer des producteurs au catalogue</a></li>
            <li><a href='#publish'>Publier sur data.gouv.fr</a></li>
          </ul>
        </div>

        <h3 id='prerequisites'>Pré-requis applicables aux données</h3>
        <p>
          Afin que vos données puissent être intégrées à data.gouv.fr via la passerelle, il faut qu’elles disposent de métadonnées et que celles-ci remplissent tous les critères suivants :
        </p>
        <ul>
          <li>avoir le mot-clé <b>données ouvertes</b> ;</li>
          <li>avoir une licence ouverte et indiquer qu’il n’y a aucune limitation au sens INSPIRE ;</li>
          <li>être présentes dans un catalogue librement accessible via CSW ;</li>
          <li>contenir au moins un lien de téléchargement opérationnel.</li>
        </ul>
        <p>
          Remarque : le premier critère n’est pas toujours requis. En effet, si les métadonnées pointent vers une licence reconnue comme ouverte, geo.data.gouv.fr passera outre ce critère.
        </p>
        <p>Les liens de téléchargement reconnus sont :</p>
        <ul>
          <li>lien vers un service WFS ;</li>
          <li>lien vers des fichiers de données vecteur aux formats GeoJSON, Shapefile, MapInfo MIF/MID, MapInfo TAB et GML ;</li>
          <li>lien vers des fichiers de données raster aux formats ECW, JPEG2000 et GeoTIFF.</li>
        </ul>
        <p>Les liens vers des fichiers PDF ne sont pas reconnus comme des liens vers des données.</p>

        <h3 id='step-by-step'>Utilisation pas à pas</h3>
        <p>Pour publier des métadonnées via geo.data.gouv.fr vous devez suivre les étapes suivantes :</p>
        <ul className='numbers'>
          <li>Vérifiez que vous disposez d’un compte sur data.gouv.fr et qu’il est associé à une organisation référencée ;</li>
          <li>Référencez votre flux CSW et vérifiez que le moissonnage est opérationnel ;</li>
          <li>Associez des producteurs référencés dans les métadonnées de votre flux CSW à votre organisation ;</li>
          <li>Publier les métadonnées pertinentes sur data.gouv.fr</li>
        </ul>
        <p>Ces étapes sont détaillées dans les chapitres suivants.</p>

        <h3 id='account'>Compte et organisation sur data.gouv.fr</h3>
        <p>Pour publier des données via geo.data.gouv.fr, vous devez disposer d’un compte compte individuel sur data.gouv.fr et de l’associer à une organisation.</p>
        <ul className='numbers'>
          <li>
            <p>Créer un compte sur data.gouv.fr</p>
            <p>Pour créer un compte ou se connecter : <a href='https://www.data.gouv.fr/login'>https://www.data.gouv.fr/login</a>. Il est recommandé de créer un compte directement sans l’interface d’un réseau social.</p>
            <img src='/static/documentation/datagouv_authentification.png' alt='Se connecter ou créer un compte sur data.gouv.fr' />
          </li>
          <li>
            <p>Créer / rejoindre une organisation sur data.gouv.fr</p>
            <p>
              Pour cela, il faut passer par l’administration de son profil : <a href='https://www.data.gouv.fr/fr/admin/organization/new/'>https://www.data.gouv.fr/fr/admin/organization/new/</a>. Si elle existe déjà, faites une demande pour la rejoindre.
            </p>
            <img src='/static/documentation/datagouv_create_org.png' alt='Créer son organisation sur data.gouv.fr' />
          </li>
        </ul>

        <h3 id='harvesting'>Référencement et moissonnage du flux CSW</h3>
        <ul className='numbers'>
          <li>
            <p>Demander à ce que votre flux CSW soit référencé</p>
            <p>Pour référencer le flux CSW de votre catalogue, écrivez à contact@geo.data.gouv.fr en indiquant votre compte data.gouv.fr, votre / vos organisation(s) et bien sûr le(s) flux concerné(s).</p>
          </li>
          <li>
            <p>Lancer le moissonnage de son catalogue</p>
            <p>Une fois votre flux CSW référencé par l’équipe de data.gouv.fr, il faut lancer le moissonnage. Pour cela :</p>
            <ul>
              <li><a href='https://inspire.data.gouv.fr/catalogs/'>se rendre sur liste des catalogues</a></li>
              <li>cliquez sur votre catalogue ;</li>
              <li>
                <p>puis dans la section <b>Moissonnage du catalogue</b> cliquez sur <b>Moissonner ce catalogue</b>.</p>
                <img src='/static/documentation/catalog_harvesting.png' alt='Moissonnage du catalogue' />
              </li>
            </ul>
          </li>
          <li>
            <p>Vérifier le moissonnage</p>
            <p>Une fois la synchronisation terminée (actualiser la page au bout de quelques minutes selon le nombre de métadonnées à moissonner), il est possible d’effectuer une recherche.</p>
            <p>Plusieurs filtres facilitent la consultation des métadonnées moissonnées :</p>
            <ul>
              <li><b>Disponibilité = Oui</b> : limite l’affichage aux métadonnées dont les données sont accessibles (cf. <a href='https://github.com/etalab/geo.data.gouv.fr/wiki/Publier-sur-data.gouv.fr#pr%C3%A9-requis-applicables-aux-donn%C3%A9es'>prérequis</a>)</li>
              <li><b>Type de résultat = Jeu de données ou Jeu de données (non géographiques)</b> : en choisissant ’Jeu de données’, seules les métadonnées publiées à l’origine en ISO 19139 sont affichées ; en choisissant ’Jeu de données (non géographiques)’, seules les métadonnées publiées à l’origine en Dublin Core sont affichées</li>
              <li><b>Donnée ouverte = Oui</b> : limite l’affichage aux données ouvertes dont la licence est reconnue par data.gouv.fr. Exemples de licences non reconnues par data.gouv.fr : la licence engagée et la licence associée du Grand-Lyon</li>
              <li>
                <p><b>Publié sur data.gouv.fr = Oui</b> : identifie les métadonnées moissonnées par geo.data.gouv.fr et déjà publiées sur data.gouv.fr</p>
                <img src='/static/documentation/search_datasets.png' alt='Recherche jeux de données' />
                <p>Si une donnée semble ne pas être disponible, revérifier les <a href='https://github.com/etalab/geo.data.gouv.fr/wiki/Publier-sur-data.gouv.fr#pr%C3%A9-requis-applicables-aux-donn%C3%A9es'>prérequis</a> puis <a href='contact@geo.data.gouv.fr'>contacter l’équipe data.gouv.fr</a>.</p>
              </li>
            </ul>
          </li>
        </ul>

        <h3 id='organizations'>Gestion de vos organisations</h3>
        <ul className='numbers'>
          <li>
            <p>Aller sur <a href='https://geo.data.gouv.fr/'>https://geo.data.gouv.fr/</a> et cliquer sur <b>Publier des données</b></p>
            <img src='/static/documentation/home_page.png' alt='Page d’accueil de geo.data.gouv.fr' />
          </li>
          <li>
            <p>Choisir l’organisation à configurer</p>
            <img src='/static/documentation/organizations.png' alt='Choisir parmi ses organisations' />
          </li>
        </ul>

        <h3 id='add-catalogs'>Ajouter des catalogues source à l’organisation</h3>
        <ul className='numbers'>
          <li>
            <p>Accéder à la <a href='https://github.com/etalab/geo.data.gouv.fr/wiki/Publier-sur-data.gouv.fr#gestion_organisations'>page de votre organisation</a></p>
            <ul>
              <li>
                <p>cliquer sur le bouton <b>Ajouter des catalogues</b> puis, dans la liste, ajouter le ou les catalogues correspondant aux flux que vous avez référencé précédemment.</p>
                <img src='/static/documentation/catalogs.png' alt='Choisir parmi les catalogues sources référencés' />
              </li>
            </ul>
          </li>
        </ul>

        <h3 id='associate-producers'>Associer des producteurs au catalogue</h3>
        <p>Il s’agit de faire correspondre les contacts renseignés dans la métadonnée et le producteur identifié de la donnée. Par exemple, l’administrateur d’une IDG pourra indiquer à quels ayant-droits correspondent quelles données :</p>
        <img className='small' src='/static/documentation/associated_producers.png' alt='Aperçu des producteurs associés' />
        <ul>
          <li>
            <p>Accéder à la <a href='https://github.com/etalab/geo.data.gouv.fr/wiki/Publier-sur-data.gouv.fr#gestion_organisations'>page de votre organisation</a></p>
            <ul>
              <li>cliquez sur <b>Associer des producteurs</b></li>
              <li>ajouter les producteurs pour lesquels vous assumerez la publication des métadonnées.</li>
            </ul>
            <img src='/static/documentation/associate_producers.png' alt='Choisir parmi les producteurs à associer' />
            <p>Lors de cette dernière étape, vous ne devez pas sélectionner des producteurs dont vous n’avez pas la responsabilité. En effet, une fois que vous aurez associé un producteur à votre organisation aucune autre organisation ne pourra l’associer à son propre compte. Vous ne devez donc pas associer à votre organisation des producteurs dont la politique de publication doit être assurer indépendamment de la vôtre.</p>
            <p>Typiquement, n’associez pas l’IGN, le BRGM, l’INSEE ou d’autres producteurs de données de ce type si vous ne faites pas partie de ces organismes. Par contre, il peut être très pertinent qu’un EPCI prenne en charge la publication des données pour le compte de ses communes.</p>
          </li>
        </ul>

        <h3 id='publish'>Publier sur data.gouv.fr</h3>
        <ul className='numbers'>
          <li>
            <p><a href='https://github.com/etalab/geo.data.gouv.fr/wiki/Publier-sur-data.gouv.fr#gestion_organisations'>Accéder à la page de votre organisation</a></p>
            <img className='small' src='/static/documentation/datasets.png' alt='Jeux de données d’une organisation' />
            <ul>
              <li>cliquez sur <b>Publier des données</b></li>
            </ul>
            <p>Le premier cadre au haut de la page dresse un état des lieux des données publiables au sens de data.gouv.fr: - les données déjà publiées et accessibles sur data.gouv.fr ; - les données en attente de publication : les données vérifiant les prérequis, issues de producteurs associés à votre organisme et qui n’ont pas encore été publiées (elles sont en attente d’une action de votre part).</p>
            <p>Les données qui ne vérifient pas les <a href='https://github.com/etalab/geo.data.gouv.fr/wiki/Publier-sur-data.gouv.fr#pr%C3%A9-requis-applicables-aux-donn%C3%A9es'>prérequis</a> et qui ne sont pas issues de producteurs associés à votre organisme n’apparaissent pas dans cette page.</p>
            <img src='/static/documentation/awaiting_publication.png' alt='Données en attente de publication' />
          </li>
          <li>
            <p>Publier des données</p>
            <ul>
              <li>sélectionner les données que vous souhaitez publié en cochant la case ;</li>
              <li>ou sélectionner toutes les données en attente en cliquant sur le bouton <b>Tout sélectionner</b> ;</li>
              <li>une fois la sélection effectuée, cliquer sur <b>Publier les données sélectionnées</b> ;</li>
            </ul>
          </li>
        </ul>
      </Container>
    </Content>

    <style jsx>{`
      h1 {
        font-size: 1.8rem;
        font-weight: 500;
        margin-bottom: 1em;
      }

      ul.numbers {
        list-style-type: decimal;
      }

      a {
        display: block;
      }

      img {
        margin: 1em 0;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
        max-width: 700px;
      }

      img.small {
        width: 400px;
      }

      @media (max-width: 767px) {
        img, img.small {
          width: 100%;
        }
      }

    `}</style>
  </Page>
)

export default flowRight(
  attachI18n(),
  attachSession
)(DocumentationPage)
