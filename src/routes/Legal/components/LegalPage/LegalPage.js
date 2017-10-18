import React from 'react'
import { Helmet } from 'react-helmet'

import styles from './LegalPage.scss'

const LegalPage = () => (
  <div>
    <Helmet title='Mentions légales' />
    <div className={styles.container}>
      <h2>Mentions légales</h2>
      <h4>Editeur</h4>
      <p>Direction interministérielle du numérique et du système d'information et de communication de l'État (DINSIC)<br />
      39, quai André Citroën<br />
      75015 Paris 15<br />
      dinsic-sec.sgmap [à] modernisation.gouv.fr</p>

      <p>Directeur de la publication : M. Henri Verdier, DINSIC</p>

      <h4>Hébergeur</h4>
      <p>OVH<br />
        SAS au capital de 10 059 500 €<br />
        RCS Lille Métropole 424 761 419 00045<br />
        Code APE 6311Z<br />
        Siège social : 2 rue Kellermann - 59100 Roubaix - France.</p>
    </div>
  </div>
)

export default LegalPage
