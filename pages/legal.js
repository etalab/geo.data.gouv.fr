import React from 'react'

import withI18n from '../components/hoc/with-i18n'

import Page from '../components/page'
import Meta from '../components/meta'
import Content from '../components/content'
import Container from '../components/container'

const LegalPage = () => (
  <Page>
    <Meta title='Mentions légales' />

    <Content>
      <Container fluid>
        <h2>Mentions légales</h2>
        <h4>Editeur</h4>
        <p>
          Direction interministérielle du numérique et du système d'information et de communication de l'État (DINSIC)<br />
          39, quai André Citroën<br />
          75015 Paris 15<br />
          dinsic-sec.sgmap [à] modernisation.gouv.fr
        </p>

        <p>Directeur de la publication : M. Henri Verdier, DINSIC</p>

        <h4>Hébergeur</h4>
        <p>
          OVH<br />
          SAS au capital de 10 059 500 €<br />
          RCS Lille Métropole 424 761 419 00045<br />
          Code APE 6311Z<br />
          Siège social : 2 rue Kellermann - 59100 Roubaix - France.
        </p>
      </Container>
    </Content>
  </Page>
)

export default withI18n()(LegalPage)
