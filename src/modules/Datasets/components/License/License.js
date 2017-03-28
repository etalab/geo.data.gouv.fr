import React from 'react'

import LicenseRule from './LicenseRule'

import { ACCEPTED_LICENSES } from '../../../../helpers/dataGouvChecks'

import { container, resume, test, details  } from './License.css'

const License = ({ license }) => {
  if (!license) return <div>Aucune licence.</div>
  const lic = ACCEPTED_LICENSES[license]
  if (!lic) return <div>`La licence ${license} n'est pas reconnu.`</div>

  return (
    <div className={container}>
      <div className={resume}>
        <div className={test}>
          {lic.logo ? <img src={lic.logo} alt="license logo" /> : null}
          <a href={lic.url}>{lic.name}</a>
        </div>
        <div>{lic.description}</div>
      </div>
      <div className={details}>
        {Object.keys(lic.rules).map((rule, idx) => lic.rules[rule].length ?
          <LicenseRule key={idx} title={rule} rules={lic.rules[rule]} />
          : null)
        }
      </div>
    </div>
  )
}

export default License
