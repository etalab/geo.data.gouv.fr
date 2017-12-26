import {flowRight} from 'lodash'

import attachI18n from '../components/hoc/attach-i18n'
import attachSession from '../components/hoc/attach-session'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'
import Container from '../components/container'

const LegalPage = () => (
  <Page>
    <Meta title='Mentions légales' />

    <Content>
      <Container>
        <h1>Mentions légales</h1>
        <h3>Editeur</h3>
        <p>
          Direction interministérielle du numérique et du système d’information et de communication de l’État (DINSIC)<br />
          39, quai André Citroën<br />
          75015 Paris 15<br />
          dinsic-sec.sgmap [à] modernisation.gouv.fr
        </p>

        <p>Directeur de la publication : M. Henri Verdier, DINSIC</p>

        <h3>Hébergeur</h3>
        <p>
          OVH<br />
          SAS au capital de 10 059 500 €<br />
          RCS Lille Métropole 424 761 419 00045<br />
          Code APE 6311Z<br />
          Siège social : 2 rue Kellermann - 59100 Roubaix - France.
        </p>
      </Container>
    </Content>

    <style jsx>{`
      h1 {
        font-size: 1.8rem;
        font-weight: 500;
        margin-bottom: 1em;
      }
    `}</style>
  </Page>
)

export default flowRight(
  attachI18n(),
  attachSession
)(LegalPage)
